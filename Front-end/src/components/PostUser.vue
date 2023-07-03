<template>
  <div
    @mouseenter="isHover(true)"
    @mouseleave="isHover(false)"
    class="relative brightness-90 hover:brightness-[1.1] cursor-pointer"
  >
    <div
      v-if="!isLoad"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black"
    >
      <ArrowPathIcon class="animate-spin w-24 h-24 text-[#ffffff]" />
    </div>
    <div>
      <video
        ref="video"
        autoplay
        muted
        loop
        class="aspect-[3/4] object-cover rounded-md"
        src="../assets/game.mp4"
      ></video>
    </div>
    <div class="px-1">
      <div class="text-gray-700 text-[15px] pt-1 break-words">
        This is some text
      </div>
      <div class="flex items-center -ml-1 text-gray=600 font-bold text-xs">
        <Bars3BottomRightIcon class="w-5 h-4 rotate-90" />
        3%
        <ExclamationCircleIcon class="w-4 h-4" />
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ArrowPathIcon,
  Bars3BottomRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/vue/24/outline";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
defineProps(["post"]);
const route = useRoute();
const router = useRouter();

let video = ref(null);
let isLoad = ref(false);

onMounted(() => {
  if (video.value) {
    video.value.addEventListener("loadeddata", (e) => {
      if (e.target) {
        setTimeout(() => {
          isLoad.value = true;
        }, 500);
      }
    });
  }
});
onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});
const isHover = (bool) => {
  if (bool) {
    video.value.play();
  } else {
    video.value.pause();
  }
};
</script>
