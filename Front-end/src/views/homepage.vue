<template>
  <MainLayout>
    <div
      class="pt-[80px] w-[calc(100%-90px)] max-w-[690px] h-full flex items-center"
    >
      <PostMain />
    </div>
  </MainLayout>
</template>
<script setup>
import PostMain from "../components/PostMain.vue";
import MainLayout from "../layouts/MainLayout.vue";
</script>
