<template>
  <div
    class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
  >
    <div class="lg:[calc(100%-540px)] h-full relative">
      <div
        class="absolute z-20 m-5 rounded-full bg-gray p-1.5 hover:bg-gray-800"
      >
        <XMarkIcon class="w-7 h-7 text-[#ffffff]" />
      </div>
      <div v-if="true">
        <button
          :disabled="!isLoaded"
          @click="loopThroughPostUp()"
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <ArrowUpIcon class="w-7 h-7 text-[#ffffff]" />
        </button>
        <button
          :disabled="!isLoaded"
          @click="loopThroughPostUp()"
          class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <ArrowDownIcon class="w-7 h-7 text-[#ffffff]" />
        </button>
      </div>
      <img
        src="../../assets/logo/white_logo.png"
        class="absolute w-auto h-8 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
        alt=""
      />
      <!-- <video
        loop
        autoplay
        src="../../assets/game.mp4"
        v-if="true"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
      ></video> -->
      <div
        v-if="!isLoaded"
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[490px]"
      >
        <ArrowPathIcon class="w-24 h-24 text-[#ffffff] animate-spin" />
      </div>
      <div class="bg-black bg-opacity-70 lg:min-w-[480px]">
        <video
          src="../../assets/game.mp4"
          v-if="true"
          ref="video"
          loop
          muted
          class="h-screen mx-auto"
        ></video>
      </div>
    </div>
    <div
      v-if="true"
      id="InfoSection"
      class="lg:max-w-[550px] relative w-full h-full bg-white"
    >
      <div class="py-7"></div>
      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <div>
            <img
              src="../../assets/455e656696c1479f1ed0.jpg"
              class="rounded-full lg:mx-0 mx-auto object-cover h-[40px]"
              width="40"
              alt=""
            />
          </div>

          <div class="ml-3 pt-0.5">
            <div class="text-[17px] font-semibold">ngocan0905</div>
            <div class="text-[13px] -mt-5 font-light">
              Ngọc Ân
              <span class="relative -top-[2px] text-[30px] pr-0.5">.</span>
              <span class="font-medium">Date here</span>
            </div>
          </div>
        </div>

        <TrashIcon
          v-if="true"
          @click="deletePost()"
          class="w-6 h-6 cursor-pointer"
        />
      </div>
      <div class="px-8 mt-4 text-sm">This is the post text</div>
      <div class="px-8 mt-4 text-sm font-bold">
        <MusicalNoteIcon class="w-4 h-4" />
        Original sound - ngocan0905
      </div>
      <div class="flex items-center px-8 mt-8">
        <div class="pb-4 text-center flex items-center">
          <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
            <HeartIcon class="w-6 h-6" />
          </div>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            50
          </span>
        </div>
        <div class="pb-4 text-center flex items-center">
          <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
            <ChatBubbleOvalLeftEllipsisIcon class="w-6 h-6" />
          </div>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            109
          </span>
        </div>
      </div>
      <div
        id="Comments"
        class="bg-[#f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div class="pt-2"></div>
        <div v-if="false" class="text-center mt-6 text-xl text-gray-500">
          No comments...
        </div>
        <div v-else class="flex items-center justify-between px-8 mt-4">
          <div class="flex items-center relative w-full">
            <div>
              <img
                src="../../assets/455e656696c1479f1ed0.jpg"
                class="w-[40px] h-[40px] absolute top-0 rounded-full lg:mx-0 mx-auto object-cover"
                alt=""
              />
            </div>
            <div class="ml-14 pt-0.5 w-full">
              <div
                class="text-[18px] font-semibold flex items-center justify-between"
              >
                Ngọc Ân
                <TrashIcon
                  v-if="true"
                  @click="deletePost()"
                  class="w-6 h-6 cursor-pointer"
                />
              </div>
              <div class="text-[15px] font-light">anh an qua dep trai</div>
            </div>
          </div>
        </div>
        <div class="mb-28"></div>
      </div>
      <div
        id="CreateComment"
        v-if="true"
        class="absolute flex items-center bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div
          class="bg-[#f1f1f2] flex text-center rounded-lg w-full lg:max-w-[420px]"
          :class="
            inputFocused
              ? 'border-2 border-gray-400'
              : 'border-2 border-[#f1f1f2]'
          "
        >
          <input
            type="text"
            v-model="comment"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            placeholder="Add comment..."
            class="w-full bg-[#f1f1f2] text-[14px] focus:outline-none lg:max-w-[420px] p-2 rounded-lg"
          />
        </div>
        <button
          :disabled="!comment"
          @click="addComment()"
          :class="comment ? 'text-[#f02c56] cursor-pointer' : 'text-gray-400'"
          class="font-semibold text-sm ml-5 pr-1"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import {
  ArrowPathIcon,
  HeartIcon,
  MusicalNoteIcon,
} from "@heroicons/vue/24/solid";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();

let video = ref(null);
let isLoaded = ref(false);
let comment = ref(null);
let inputFocused = ref(false);

onMounted(() => {
  video.value.addEventListener("loadeddata", (e) => {
    if (e.target) {
      setTimeout(() => {
        isLoaded.value = true;
      }, 500);
    }
  });
});
onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});

watch(
  () => isLoaded.value,
  () => {
    if (isLoaded.value) {
      setTimeout(() => video.value.play(), 500);
    }
  }
);
</script>
