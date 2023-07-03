<template>
  <div
    class="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2 cursor-pointer"
  >
    <img
      src="../assets/455e656696c1479f1ed0.jpg"
      alt=""
      class="mx-auto object-cover h-10 w-10 lg:mx-0 rounded-full"
    />
    <div class="hidden lg:pl-2.5 lg:block">
      <div class="flex items-center">
        <div class="font-bold text-[14px]">Ngọc Ân</div>
        <div class="ml-2 rounded-full bg-[#58d5ec] w-[14px] h-[14px] relative">
          <CheckIcon class="relative text-white" />
        </div>
      </div>
      <div class="font-light text-xs text-gray-600">ngocan0905</div>
    </div>
  </div>
</template>
<script setup>
import { CheckIcon } from "@heroicons/vue/24/outline";
</script>
