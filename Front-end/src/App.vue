<template>
  <router-view> </router-view>
  <auth-overlay v-if="isLoginOpen" />
  <edit-profile-overlay v-if="isEditProfileOpen" />
</template>
<script setup>
import { storeToRefs } from "pinia";
import AuthOverlay from "./components/AuthOverlay.vue";
import EditProfileOverlay from "./components/EditProfileOverlay.vue";
import { generalStore, userStore } from "./stores";
import { onMounted, watch } from "vue";

const { isLoginOpen, isEditProfileOpen } = storeToRefs(generalStore);
onMounted(async () => {
  generalStore.bodySwitch(false);
  isLoginOpen.value = false;
  isEditProfileOpen.value = false;
  try {
    await generalStore.hasSessionExpired();
    await generalStore.getRandomUsers("suggested");
    await generalStore.getRandomUsers("following");
    if (userStore.id) {
      userStore.getUser();
    }
  } catch (error) {
    console.log(error);
  }
});

watch(
  () => isLoginOpen.value,
  (value) => generalStore.bodySwitch(value)
);
watch(
  () => isEditProfileOpen.value,
  (value) => generalStore.bodySwitch(value)
);
</script>
<style scoped></style>
