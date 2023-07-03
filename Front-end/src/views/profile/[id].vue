<template>
  <MainLayout>
    <div
      class="pt-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 pr-2 w-[calc(100%-160px)] max-w-[1800px] 2xl:mx-auto"
    >
      <div class="flex w-[calc(100vw-230px)]">
        <img
          src="../../assets/455e656696c1479f1ed0.jpg"
          class="w-[120px] h-[120px] object-cover rounded-full"
          alt=""
        />
        <div class="ml-5 w-full">
          <div class="text-[30px] font-bold truncate">ngocan0905</div>
          <div class="text-[18px] truncate">Ngọc Ân</div>
          <button
            v-if="true"
            @click="generalStore.isEditProfileOpen = true"
            class="flex items-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
          >
            <PencilSquareIcon class="w-5 h-5 mt-0.5 mr-1 text-gray-600" />
            <div class="">Edit profile</div>
          </button>
          <button
            v-else
            class="flex items-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white bg-[#f02c56]"
          >
            Follow
          </button>
        </div>
      </div>
      <div class="flex items-center pt-4">
        <div class="mr-4">
          <span class="font-bold">10K</span
          ><span class="text-gray-500 font-light text-[15px] pl-1.5"
            >Following</span
          >
        </div>
        <div class="mr-4">
          <span class="font-bold">10K</span
          ><span class="text-gray-500 font-light text-[15px] pl-1.5"
            >Likes</span
          >
        </div>
      </div>
      <div
        class="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]"
      >
        This is the bio section
      </div>
      <div class="w-full flex items-center pt-4 border-b">
        <div
          class="w-60 text-center py-2 text-[17px] font-semibold border-b-2 hover:border-b-black"
        >
          Videos
        </div>
        <div
          class="w-60 flex justify-center py-2 text-[17px] font-semibold border-b-2 hover:border-b-black"
        >
          <LockClosedIcon class="w-6 h-6 mb-0.5" />
          Favorite
        </div>
        <div
          class="w-60 flex justify-center py-2 text-[17px] font-semibold border-b-2 hover:border-b-black"
        >
          <LockClosedIcon class="w-6 h-6 mb-0.5" />
          Liked
        </div>
      </div>
      <div
        class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3"
      >
        <PostUser />
      </div>
    </div>
  </MainLayout>
</template>
<script setup>
import { LockClosedIcon, PencilSquareIcon } from "@heroicons/vue/24/solid";
import MainLayout from "../../layouts/MainLayout.vue";
import PostUser from "../../components/PostUser.vue";
import { generalStore } from "../../stores";
</script>
