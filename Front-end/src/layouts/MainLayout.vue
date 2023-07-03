<template>
  <div>
    <TopNav />
    <div class="mx-0 lg:mx-2 flex w-full">
      <SlideNav class="" />
      <slot />
    </div>
  </div>
</template>
<script setup>
import SlideNav from "../components/SlideNav.vue";
import TopNav from "../components/TopNav.vue";
</script>
