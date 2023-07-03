<template>
  <div>
    <div class="bg-[#f8f8f8] h-screen">
      <TopNav />

      <div class="flex justify-between mx-auto px-2 max-w-[1140px]">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup>
import SlideNav from "../components/SlideNav.vue";
import TopNav from "../components/TopNav.vue";
</script>
