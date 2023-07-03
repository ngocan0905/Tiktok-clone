<template>
  <div class="flex border-b py-6">
    <div class="cursor-pointer">
      <img
        src="../assets/455e656696c1479f1ed0.jpg"
        class="rounded-full max-h-[60px] w-10 h-10 object-cover"
        width="60"
        alt=""
      />
    </div>
    <div class="pl-3 w-full px-4">
      <div class="flex items-center justify-between pb-0.5">
        <button>
          <span class="font-bold hover:underline cursor-pointer">
            Ngọc Ân
          </span>
          <span
            class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer"
          >
            ngocan0905
          </span>
        </button>
        <button
          class="px-[21px] py-0.5 border border-[#f02c56] rounded-md text-[#f02c56] hover:bg-[#ffeef2] font-semibold"
        >
          Follow
        </button>
      </div>
      <div
        class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]"
      >
        This is a caption
      </div>
      <div class="text-[14px] text-gray-500 pb-0.5">#fun #j4f #cool</div>
      <div class="text-[14px] pb-0.5 flex items-center font-semibold">
        <MusicalNoteIcon class="w-4 h-4" />
        <div class="px-1">original sound - Sunshine</div>
        <HeartIcon class="w-5 h-5" />
      </div>
      <div class="mt-2.5 flex">
        <div
          class="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer"
        >
          <video
            ref="video"
            loop
            muted
            class="rounded-xl object-cover mx-auto h-full"
            src="../assets/game.mp4"
          ></video>
          <img
            src="../assets/logo/white_logo.png"
            class="absolute h-8 w-auto object-cover bottom-1 right-1"
            alt=""
          />
        </div>
        <div class="relative mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2">
                <HeartIcon class="h-6 w-6" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">19</span>
            </div>
            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2">
                <EllipsisHorizontalCircleIcon class="h-6 w-6" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">5</span>
            </div>
            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2">
                <ShareIcon class="h-6 w-6" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ShareIcon,
  MusicalNoteIcon,
  HeartIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";

let video = ref(null);
onMounted(() => {
  video.value.play();
});
</script>
