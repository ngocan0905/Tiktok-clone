<template>
  <div
    class="fixed bg-white z-30 w-full flex items-center border-b h-[60px] justify-between px-6"
  >
    <router-link :to="{ name: 'homepage' }" class="cursor-pointer">
      <img src="../assets/logo/logo.png" alt="" class="h-[40px] object-cover" />
    </router-link>
    <div
      class="bg-gray-200 flex max-w-[380px] w-full p-1 rounded-full items-center"
    >
      <input
        type="text"
        placeholder="Search video, account, ..."
        class="bg-transparent w-full focus:outline-none text-base placeholder-[#838383] my-2 pl-3"
      />
      <div
        class="px-3 py-1 text-gray-600 text-xl flex items-center border-l border-gray-400"
      >
        <MagnifyingGlassIcon class="h-6 w-6" />
      </div>
    </div>
    <div
      class="flex items-center justify-end gap-3 min-w-[275px] max-w-[420px] w-full"
    >
      <button
        @click="isLoggedIn()"
        class="flex items-center capitalize border rounded-sm px-3 py-1.5 hover:bg-gray-100"
      >
        <PlusIcon class="w-4 h-4 mx-2"></PlusIcon>
        Upload
      </button>
      <div v-if="!userStore.id" class="flex items-center">
        <button
          @click="generalStore.isLoginOpen = true"
          class="font-medium text-md bg-red-500 text-white px-3 py-1.5"
        >
          Login
        </button>
        <div class="w-8 h-8">
          <EllipsisVerticalIcon class="text-gray-700"></EllipsisVerticalIcon>
        </div>
      </div>
      <div v-else class="flex items-center">
        <div>
          <PaperAirplaneIcon
            class="cursor-pointer w-8 h-8 text-gray-600 rotate-[-30deg] ml-1 mr-4"
          ></PaperAirplaneIcon>
        </div>
        <div>
          <ChatBubbleBottomCenterTextIcon
            class="cursor-pointer w-8 h-8 text-gray-600 mr-5"
          ></ChatBubbleBottomCenterTextIcon>
        </div>
        <div class="relative">
          <button class="" @click="showMenu = !showMenu">
            <img
              :src="userStore.image"
              class="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <div
              v-if="showMenu"
              id="PopupMenu"
              class="absolute z-30 w-[200px] top-10 right-8 bg-gray-50 shadow-lg border-b border-l rounded-md"
            >
              <router-link
                :to="`/profile/${userStore.id}`"
                class="flex items-center p-2"
              >
                <UserCircleIcon class="w-8 h-8"></UserCircleIcon
                ><span class="capitalize mx-2">Profile</span>
              </router-link>
              <div @click="logOut()" class="flex items-center p-2">
                <ArrowUpOnSquareIcon
                  class="w-8 h-8 rotate-90"
                ></ArrowUpOnSquareIcon>
                <span class="capitalize mx-2">Log Out</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PlusIcon,
  ChatBubbleBottomCenterTextIcon,
  UserCircleIcon,
  ArrowUpOnSquareIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import { userStore, generalStore } from "../stores";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
let showMenu = ref(false);
// onMounted(() => {
//   document.addEventListener("mouseup", function (e) {
//     let popupMenu = document.getElementById("PopupMenu");
//     if (!popupMenu.contains(e.target)) {
//       showMenu.value = false;
//     }
//   });
// });
const isLoggedIn = () => {
  if (userStore.id) {
    router.push("/upload");
  } else {
    generalStore.isLoginOpen = true;
  }
};
const logOut = () => {
  try {
    userStore.logOut();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
