<template>
  <div
    class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
  >
    <div
      v-if="generalStore.selectedPost"
      class="lg:[calc(100%-540px)] h-full relative"
    >
      <router-link
        :to="generalStore.isBackUrl"
        class="absolute z-20 m-5 rounded-full bg-gray p-1.5 hover:bg-gray-800"
      >
        <XMarkIcon class="w-7 h-7 text-[#ffffff]" />
      </router-link>
      <div v-if="generalStore.ids.length > 1">
        <button
          :disabled="!isLoaded"
          @click="loopThroughPostUp()"
          class="absolute opacity-50 hover:opacity-100 z-20 right-4 bottom-[51%] flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <ArrowUpIcon class="w-7 h-7 text-[#ffffff]" />
        </button>
        <button
          :disabled="!isLoaded"
          @click="loopThroughPostDown()"
          class="absolute opacity-50 hover:opacity-100 z-20 right-4 top-[50%] flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <ArrowDownIcon class="w-7 h-7 text-[#ffffff]" />
        </button>
      </div>
      <img
        src="../../assets/logo/white_logo.png"
        class="absolute w-auto h-8 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
        alt=""
      />
      <video
        :src="generalStore.selectedPost.video"
        v-if="generalStore.selectedPost.video"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
      ></video>
      <div
        v-if="!isLoaded"
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[490px]"
      >
        <ArrowPathIcon class="w-24 h-24 text-[#ffffff] animate-spin" />
      </div>
      <div class="bg-black bg-opacity-70 lg:min-w-[480px]">
        <video
          :src="generalStore.selectedPost.video"
          v-if="generalStore.selectedPost.video"
          ref="video"
          loop
          muted
          class="h-screen mx-auto"
        ></video>
      </div>
    </div>
    <div
      v-if="generalStore.selectedPost"
      id="InfoSection"
      class="lg:max-w-[550px] relative w-full h-full bg-white"
    >
      <div class="py-7"></div>
      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <router-link :to="`/profile/${generalStore.selectedPost.user.id}`">
            <img
              :src="generalStore.selectedPost.user.image"
              class="rounded-full lg:mx-0 mx-auto object-cover h-[40px]"
              width="40"
              alt=""
            />
          </router-link>

          <div class="ml-3 pt-0.5">
            <div class="text-[17px] font-semibold">
              {{
                generalStore.allLowerCaseNoCaps(
                  generalStore.selectedPost.user.name
                )
              }}
            </div>
            <div class="text-[13px] -mt-5 font-light">
              {{ generalStore.selectedPost.user.name }}
              <span class="relative -top-[2px] text-[30px] pr-0.5">.</span>
              <span class="font-medium">{{
                generalStore.selectedPost.created_at
              }}</span>
            </div>
          </div>
        </div>

        <TrashIcon
          v-if="userStore.id === generalStore.selectedPost.user.id"
          @click="deletePost()"
          class="w-6 h-6 cursor-pointer"
        />
      </div>
      <div class="px-8 mt-4 text-sm">{{ generalStore.selectedPost.text }}</div>
      <div class="px-8 mt-4 text-sm font-bold">
        <MusicalNoteIcon class="w-4 h-4" />
        Original sound -
        {{
          generalStore.allLowerCaseNoCaps(generalStore.selectedPost.user.name)
        }}
      </div>
      <div class="flex items-center px-8 mt-8">
        <div class="pb-4 text-center flex items-center">
          <button
            @click="isLiked ? unlikePost() : likePost()"
            class="rounded-full bg-gray-200 p-2 cursor-pointer"
          >
            <HeartIcon
              class="w-6 h-6"
              :class="isLiked ? 'text-[#f02c56]' : ''"
            />
          </button>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            {{ generalStore.selectedPost.likes.length }}
          </span>
        </div>
        <div class="pb-4 text-center flex items-center">
          <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
            <ChatBubbleOvalLeftEllipsisIcon class="w-6 h-6" />
          </div>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            {{ generalStore.selectedPost.comments.length }}
          </span>
        </div>
      </div>
      <div
        id="Comments"
        class="bg-[#f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div class="pt-2"></div>
        <div
          v-if="generalStore.selectedPost.comments.length < 1"
          class="text-center mt-6 text-xl text-gray-500"
        >
          No comments..
        </div>
        <div
          v-else
          class="flex items-center justify-between px-8 mt-4"
          v-for="comment in generalStore.selectedPost.comments"
          :key="comment"
        >
          <div class="flex items-center relative w-full">
            <router-link :to="`/profile/${comment.user.id}`">
              <img
                :src="comment.user.image"
                class="w-[40px] h-[40px] absolute top-0 rounded-full lg:mx-0 mx-auto object-cover"
                alt=""
              />
            </router-link>
            <div class="ml-14 pt-0.5 w-full">
              <div
                class="text-[18px] font-semibold flex items-center justify-between"
              >
                {{ comment.user.name }}
                <TrashIcon
                  v-if="userStore.id === comment.user.id"
                  @click="deleteComment(generalStore.selectedPost, comment.id)"
                  class="w-6 h-6 cursor-pointer"
                />
              </div>
              <div class="text-[15px] font-light">{{ comment.text }}</div>
            </div>
          </div>
        </div>
        <div class="mb-28"></div>
      </div>
      <div
        id="CreateComment"
        v-if="userStore.id"
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
import { generalStore, userStore, profileStore } from "../../stores";
import { onBeforeUnmount, onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
const route = useRoute();
const router = useRouter();

let video = ref(null);
let isLoaded = ref(false);
let comment = ref(null);
let inputFocused = ref(false);

onMounted(async () => {
  generalStore.selectedPost = null;
  try {
    await generalStore.getPostById(route.params.id);
  } catch (error) {
    if (error && error.response.status === 400) {
      router.push("/");
    }
  }
  video.value.addEventListener("loadeddata", (e) => {
    if (e.target) {
      setTimeout(() => {
        isLoaded.value = true;
      }, 200);
    }
  });
});
onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});
onBeforeRouteUpdate((to, from, next) => {
  // Reset the selectedPost when the route changes
  generalStore.selectedPost = null;
  next();
});
watch(
  () => isLoaded.value,
  () => {
    if (isLoaded.value) {
      setTimeout(() => video.value.play(), 200);
    }
  }
);
const loopThroughPostDown = () => {
  setTimeout(() => {
    let idArrayReversed = generalStore.ids.reverse();
    let isBreak = false;
    for (let i = 0; i < idArrayReversed.length; i++) {
      const id = idArrayReversed[i];
      if (id < route.params.id) {
        router.push(`/post/${id}`);
        isBreak = true;
        return;
      }
    }
    if (!isBreak) {
      router.push(`/post/${idArrayReversed[0]}`);
    }
  });
};
const loopThroughPostUp = () => {
  setTimeout(() => {
    let isBreak = false;

    for (let i = 0; i < generalStore.ids.length; i++) {
      const id = generalStore.ids[i];
      if (id > route.params.id) {
        router.push(`/post/${id}`);
        isBreak = true;
        return;
      }
    }
    if (!isBreak) {
      router.push(`/post/${generalStore.ids[0]}`);
    }
  }, 300);
};
const isLiked = computed(() => {
  let res = generalStore.selectedPost.likes.find(
    (like) => like.user_id === userStore.id
  );
  if (res) {
    return true;
  }
  return false;
});
const likePost = async () => {
  try {
    await userStore.likePost(generalStore.selectedPost, true);
  } catch (error) {
    console.log(error);
  }
};
const unlikePost = async () => {
  try {
    await userStore.unlikePost(generalStore.selectedPost, true);
  } catch (error) {
    console.log(error);
  }
};
const addComment = async () => {
  try {
    await userStore.addComment(generalStore.selectedPost, comment.value);
    comment.value = null;
    document.getElementById("Comments").scroll({ top: 0, behavior: "smooth" });
    await generalStore.getPostById(route.params.id);
  } catch (error) {
    console.log(error);
  }
};
const deleteComment = async (post, commentId) => {
  let res = confirm("Are you sure you want to delete this comment?");
  try {
    if (res) {
      await userStore.deleteComment(post, commentId);
    }
  } catch (error) {
    console.log(error);
  }
  await generalStore.getPostById(route.params.id);
};
</script>
