<template>
  <div
    @click="displayPost(post)"
    @mouseenter="isHover(true)"
    @mouseleave="isHover(false)"
    class="relative brightness-90 hover:brightness-[1.1] cursor-pointer"
  >
    <div
      v-if="!isLoaded"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black"
    >
      <ArrowPathIcon class="animate-spin w-14 h-14 text-[#ffffff]" />
    </div>
    <div>
      <video
        ref="video"
        autoplay
        muted
        loop
        class="aspect-[3/4] object-cover rounded-md"
        :src="post.video"
      ></video>
    </div>
    <div class="px-1">
      <div class="text-gray-700 text-[15px] pt-1 break-words">
        {{ post.text }}
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
import { generalStore } from "../stores";
defineProps(["post"]);
const route = useRoute();
const router = useRouter();
let video = ref(null);
let isLoaded = ref(false);

onMounted(() => {
  if (video.value) {
    video.value.addEventListener("loadeddata", (e) => {
      if (e.target) {
        setTimeout(() => {
          isLoaded.value = true;
        }, 200);
      }
    });
  }
});
onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});

const displayPost = (post) => {
  generalStore.setBackUrl("/profile/" + route.params.id);
  generalStore.selectedPost = null;
  setTimeout(() => {
    router.push(`/post/${post.id}`);
  }, 300);
};
const isHover = (bool) => {
  if (bool) {
    video.value.play();
  } else {
    video.value.pause();
  }
};
</script>
