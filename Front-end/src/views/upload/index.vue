<template>
  <UploadError :errorType="errorType" />

  <div
    v-if="isUploading"
    class="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-50"
  >
    <CheckCircleIcon class="animate-spin ml-1 h-24 w-24 text-[#ffffff]" />
  </div>
  <UploadLayout>
    <div
      class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-lg py-6 md:px-1 px-4"
    >
      <div>
        <div class="text-[23px] font-semibold">Upload video</div>
        <div class="text-gray-400 mt-1">Post a video to your account</div>
      </div>
      <div class="mt-8 md:flex gap-6">
        <label
          v-if="!fileDisplay"
          for="fileInput"
          @drop.prevent="onDrop"
          @dragover.prevent=""
          class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <CloudArrowUpIcon class="w-10 h-10 text-[#b3b3b1]" />
          <div class="mt-4 text-[17px]">Select video to upload</div>
          <div class="mt-1.5 text-gray-500 text-[13px]">
            Or drag and drop a file
          </div>
          <div class="mt-12 text-gray-400 text-sm">MP4</div>
          <div class="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</div>
          <div class="mt-2 text-gray-400 text-[13px]">Less than 2 GB</div>
          <div
            class="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#f02c56] rounded-sm"
          >
            Select file
          </div>
          <input
            type="file"
            ref="file"
            id="fileInput"
            hidden
            @input="onChange"
            accept=".mp4"
          />
        </label>
        <div
          v-else
          class="relative md:mx-0 mx-auto mt-4 mb-16 md:mb-12 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 cursor-pointer"
        >
          <div class="bg-black h-full w-full"></div>
          <img
            src="../../assets/mobile-case.png"
            class="absolute z-20 pointer-events-none"
            alt=""
          />
          <img
            src="../../assets/logo/white_logo.png"
            class="absolute z-20 h-8 w-auto bottom-8 right-4"
            alt=""
          />
          <video
            :src="fileDisplay"
            autoplay
            loop
            muted
            class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
          ></video>
          <div
            class="absolute -bottom-12 flex items-center justify-between z-50 rounded border w-full p-2 border-gray-300"
          >
            <div class="flex items-center truncate">
              <CheckCircleIcon class="w-4 h-4 text-gray-600" />
              <div class="text-[11px] pl-1 truncate text-ellipsis">
                video name
              </div>
            </div>
            <button
              @click="clearVideo()"
              class="text-[11px] ml-2 font-semibold"
            >
              Change
            </button>
          </div>
        </div>
        <div class="mt-4 mb-6">
          <div class="flex bg-[#F8F8F8] py-4 px-6">
            <div>
              <WrenchScrewdriverIcon class="w-5 h-5 text-gray-600 mr-4" />
            </div>
            <div class="">
              <div class="font-semibold text-[15px] mb-1.5">
                Divide videos and edit
              </div>
              <div class="font-semibold text-[13px] text-gray-400">
                You can quickly divide videos intro multiple parts, remove
                redundant parts and turn landscape videos intro portraint videos
              </div>
            </div>
            <div
              class="flex justify-end max-w=[130px] w-full h-full text-center my-auto"
            >
              <button
                class="px-8 py-1.5 text-white text-[15px] bg-[#f02c56] rounded-sm"
              >
                Edit
              </button>
            </div>
          </div>
          <div class="mt-5">
            <div class="flex items-center justify-between">
              <div class="mb-1 text-[15px]">Caption</div>
              <div class="text-gray-400 text-[12px]">
                {{ caption.length }}/150
              </div>
            </div>
            <input
              v-model="caption"
              maxlength="150"
              type="text"
              class="w-full border rounded-md focus:outline-none"
              name=""
              id=""
            />
          </div>
          <div class="flex gap-3">
            <button
              class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
              @click="discard()"
            >
              Discard
            </button>
            <button
              @click="createPost()"
              class="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#f02c56] rounded-sm"
            >
              Post
            </button>
          </div>
          <div v-if="errors" class="mt-4">
            <div class="text-red-600" v-if="errors && errors.video">
              {{ errors.video[0] }}
            </div>
            <div class="text-red-600" v-if="errors && errors.text">
              {{ errors.text[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UploadLayout>
</template>
<script setup>
import {
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  CloudArrowUpIcon,
} from "@heroicons/vue/24/solid";
import UploadError from "../../components/UploadError.vue";
import UploadLayout from "../../layouts/UploadLayout.vue";
import { userStore } from "../../stores/index";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

let file = ref(null);
let fileDisplay = ref(null);
let errorType = ref(null);
let caption = ref("");
let fileData = ref(null);
let errors = ref(null);
let isUploading = ref(false);
const router = useRouter();
watch(
  () => caption.value,
  (caption) => {
    if (caption.length >= 150) {
      errorType.value = "caption";
      return;
    }
    errorType.value = null;
  }
);
const onDrop = (e) => {
  errorType.value = "";
  file.value = e.dataTransfer.files[0];
  fileData.value = e.dataTransfer.files[0];

  let extention = file.value.name.substring(
    file.value.name.lastIndexOf(".") + 1
  );

  if (extention !== "mp4") {
    errorType.value = "file";
    return;
  }

  fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0]);
};
const onChange = () => {
  fileDisplay.value = URL.createObjectURL(file.value.files[0]);
  fileData.value = file.value.files[0];
};
const discard = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
  caption.value = "";
};

const createPost = async () => {
  errors.value = null;
  let data = new FormData();

  data.append("video", fileData.value || "");
  data.append("text", caption.value || "");

  if (fileData.value && caption.value) {
    isUploading.value = true;
  }
  try {
    let res = await userStore.createPost(data);
    if (res.status === 200) {
      setTimeout(() => {
        router.push("/profile/" + userStore.id);
        isUploading.value = false;
      }, 1000);
    }
  } catch (error) {
    errors.value = error.response.data.errors;
    console.log(errors.value);
    isUploading.value = false;
  }
};
const clearVideo = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
};
</script>
