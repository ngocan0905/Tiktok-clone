<template>
  <router-view> </router-view>
  <auth-overlay v-if="generalStore.isLoginOpen" />
  <edit-profile-overlay v-if="generalStore.isEditProfileOpen" />
</template>
<script setup>
import AuthOverlay from "./components/AuthOverlay.vue";
import EditProfileOverlay from "./components/EditProfileOverlay.vue";
import { generalStore } from "./stores";
</script>
<style scoped></style>
