<template>
  <div class="w-full relative flex justify-center">
    <div
      :class="errorType ? 'visible' : 'invisible'"
      class="absolute top-6 z-50 mx-auto bg-black bg-opacity-70 text-white px-14 py-3 rounded-sm"
    >
      {{ error }}
    </div>
  </div>
</template>
<script setup>
import { ref, toRefs, watch } from "vue";

const props = defineProps(["errorType"]);
const { errorType } = toRefs(props);
let error = ref("");
watch(
  () => errorType.value,
  () => {
    if (errorType.value == "caption") {
      error.value = "Maximum 150 character.";
    } else if (errorType.value == "bio") {
      error.value = "Maximum 80 character.";
    } else {
      error.value = "";
    }
  }
);
</script>
