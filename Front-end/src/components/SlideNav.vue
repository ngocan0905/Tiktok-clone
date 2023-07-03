<template>
  <div
    class="h-full pt-[70px] bg-white z-20 border-r lg:border-r-0 text-gray-700"
  >
    <div class="lg:w-full w-[55px] mx-auto text-lg font-bold">
      <router-link :to="{ name: 'homepage' }"
        ><div class="flex items-center py-3">
          <HomeIcon class="w-7 h-7" />
          <span class="mx-2 hidden lg:block capitalize">dành cho bạn</span>
        </div>
      </router-link>
      <router-link :to="{ name: 'homepage' }"
        ><div class="flex items-center py-3">
          <UsersIcon class="w-7 h-7" />
          <span class="mx-2 hidden lg:block capitalize">đang Follow</span>
        </div>
      </router-link>
      <router-link :to="{ name: 'homepage' }"
        ><div class="flex items-center py-3">
          <MapIcon class="w-7 h-7" />
          <span class="mx-2 hidden lg:block capitalize">khám phá</span>
        </div>
      </router-link>
      <router-link :to="{ name: 'homepage' }"
        ><div class="flex items-center py-3">
          <VideoCameraIcon class="w-7 h-7" />
          <span class="mx-2 hidden lg:block capitalize">LIVE</span>
        </div>
      </router-link>
      <div class="border-b lg:ml-2 mt-2"></div>
      <div
        class="lg:block hidden text-sm text-gray-600 font-semibold pt-4 pb-2 px-2"
      >
        Các tài khoản đang follow
      </div>
      <MenuItemFollow />
      <button
        class="text-red-400 text-sm font-semibold pt-1.5 pl-2 hidden lg:block"
      >
        Xem thêm
      </button>
      <div class="border-b lg:ml-2 mt-2"></div>
      <div class="lg:block hidden text-[11px] text-gray-400 pt-4">
        <div class="px-2">Giới thiệu Bảng tin Liên hệ</div>
        <div class="px-2">Sự nghiệp ByteDance</div>
        <div class="px-2">TikTok for Good Quảng cáo</div>
        <div class="px-2">Developers Minh bạch</div>
        <div class="px-2">TikTok Rewards TikTok Embeds</div>
        <div class="px-2">Quyền riêng tư Cổng thông tin Tác giả</div>
        <div class="px-2">Hướng dẫn Cộng đồng</div>
        <div class="px-2">Thêm</div>
        <div class="px-2">© 2023 TikTok</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  HomeIcon,
  UsersIcon,
  MapIcon,
  VideoCameraIcon,
} from "@heroicons/vue/24/outline";
import MenuItemFollow from "./MenuItemFollow.vue";
</script>
