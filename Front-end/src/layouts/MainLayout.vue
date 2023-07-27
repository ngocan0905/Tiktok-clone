<template>
  <div>
    <TopNav />
    <div class="mx-0 lg:mx-2 flex w-full">
      <SlideNav />
      <div class="w-full flex justify-center">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup>
import SlideNav from "../components/SlideNav.vue";
import TopNav from "../components/TopNav.vue";
</script>
