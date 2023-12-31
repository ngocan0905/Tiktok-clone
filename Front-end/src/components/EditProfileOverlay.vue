<template>
  <div
    id="EditProfileOverlay"
    class="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 h-full w-full bg-black bg-opacity-50 overflow-auto"
  >
    <div
      class="relative bg-white w-full max-w-[700px] sm:h-[580px] h-[655px] mx-3 p-4 rounded-lg mb-10"
      :class="!uploadImage ? 'h-[655px]' : 'h-[580px]'"
    >
      <div
        class="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300"
      >
        <div class="text-[22px] font-medium">Edit profile</div>
        <button @click="generalStore.isEditProfileOpen = false">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      <div
        class="h-[calc(500px-200px)]"
        :class="!uploadImage ? 'mt-16' : 'mt-[58px]'"
      >
        <div v-if="!uploadImage">
          <div
            id="ProfilePhotoSection"
            class="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
          >
            <div
              class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center"
            >
              Profile photo
            </div>
            <div class="flex items-center justify-center sm:-mt-6">
              <label for="image" class="relative cursor-pointer">
                <img
                  :src="userImage"
                  width="95"
                  class="rounded-full h-[95px] object-cover"
                  alt=""
                />
                <div
                  class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-100 inline-block w-[32px]"
                >
                  <PencilIcon class="w-4 h-5 -mt-1 ml-0.5" />
                </div>
              </label>
              <input
                id="image"
                @input="getUploadImage"
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                class="hidden"
              />
            </div>
          </div>
          <div
            id="UsernameSection"
            class="flex flex-col border-b sm:h-[118px] px-1.5 mt-1.5 w-full"
          >
            <div
              class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center"
            >
              Username
            </div>
            <div class="flex items-center justify-center sm:mt-6">
              <div class="sm:w-[60%] w-full max-w-md mb-1">
                <TextInput
                  placeholder="Username"
                  v-model:input="userName"
                  inputType="text"
                  max="30"
                />
                <div class="text-[11px] text-gray-500 mt-4">
                  Username can only contain letters, numbers, underscores and
                  periods. Change your username wil also changr your profile
                  link
                </div>
              </div>
            </div>
          </div>
          <div
            id="BioSection"
            class="flex flex-col sm:h-[120px] px-1.5 mt-2 w-full"
          >
            <div
              class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center"
            >
              Bio
            </div>
            <div class="flex items-center justify-center sm:mt-6">
              <div class="sm:w-[60%] w-full max-w-md">
                <textarea
                  cols="30"
                  rows="4"
                  v-model="userBio"
                  maxlength="80"
                  class="resize-none w-full bg-[#f1f1f2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                >
                </textarea>
                <div v-if="userBio" class="text-[11px] text-gray-500">
                  {{ userBio.length }}/80
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full h-[430px]">
          <Cropper
            class="h-[430px]"
            ref="cropper"
            :stencil-component="CircleStencil"
            :src="uploadImage"
          />
        </div>
      </div>
      <div
        id="ButtonSection"
        class="absolute p-5 bottom-0 left-0 border-t border-t-gray-300 w-full"
      >
        <div
          id="UpdateInfoButtons"
          v-if="!uploadImage"
          class="flex items-center justify-end"
        >
          <button
            @click="generalStore.isEditProfileOpen = false"
            class="flex items-center border px-3 py-[6px] rounded-md hover:bg-gray-100"
          >
            <span class="px-2 font-medium text-[15px]">Cancel</span>
          </button>
          <button
            :disabled="!isUpdated"
            :class="!isUpdated ? 'bg-gray-200' : 'bg-[#f02c56]'"
            class="flex items-center bg-[#f02c56] text-white border rounded-md ml-3 px-3 py-[6px]"
            @click="updateUserInfo()"
          >
            <span class="mx-4 font-medium text-[15px]">Save</span>
          </button>
        </div>
        <div id="CropperButtons" v-else class="flex items-center justify-end">
          <button
            @click="uploadImage = null"
            class="flex items-center border px-3 py-[6px] rounded-md hover:bg-gray-100"
          >
            <span class="px-2 font-medium text-[15px]">Cancel</span>
          </button>
          <button
            class="flex items-center bg-[#f02c56] text-white border rounded-md ml-3 px-3 py-[6px]"
            @click="cropAndUpdateImage()"
          >
            <span class="mx-4 font-medium text-[15px]">Apply</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { generalStore, profileStore, userStore } from "../stores";
import { PencilIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import TextInput from "./TextInput.vue";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const { name, bio, image } = storeToRefs(userStore);
const route = useRoute();
onMounted(() => {
  userName.value = name.value;
  userBio.value = bio.value;
  userImage.value = image.value;
});
let uploadImage = ref(null);
let file = ref(null);
let cropper = ref(null);
let userImage = ref(null);
let userName = ref(null);
let userBio = ref(null);
let isUpdated = ref(false);

const getUploadImage = (e) => {
  file.value = e.target.files[0];
  uploadImage.value = URL.createObjectURL(file.value);
};
watch(
  () => userName.value,
  () => {
    if (!userName.value || userName.value === name.value) {
      isUpdated.value = false;
    } else {
      isUpdated.value = true;
    }
  }
);

const cropAndUpdateImage = async () => {
  const { coordinates } = cropper.value.getResult();
  let data = new FormData();
  data.append("image", file.value || "");
  data.append("height", coordinates.height || "");
  data.append("width", coordinates.width || "");
  data.append("left", coordinates.left || "");
  data.append("top", coordinates.top || "");

  try {
    await userStore.updateUserImage(data);
    await userStore.getUser();
    await profileStore.getProfile(route.params.id);

    generalStore.updateSideMenuImage(generalStore.suggested, userStore);
    generalStore.updateSideMenuImage(generalStore.following, userStore);

    userImage.value = image.value;
    uploadImage.value = null;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async () => {
  try {
    await userStore.updateUser(userName.value, userBio.value);
    await userStore.getUser();
    await profileStore.getProfile(route.params.id);

    userName.value = name.value;
    userBio.value = bio.value;

    setTimeout(() => {
      generalStore.isEditProfileOpen = false;
    }, 100);
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => userName.value,
  () => {
    if (!userName.value || userName.value === name.value) {
      isUpdated.value = false;
    } else {
      isUpdated.value = true;
    }
  }
);

watch(
  () => userBio.value,
  () => {
    if (!userName.value || userBio.value.length < 1) {
      isUpdated.value = false;
    } else {
      isUpdated.value = true;
    }
  }
);
</script>
