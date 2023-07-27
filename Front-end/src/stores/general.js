import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
import { useUserStore } from "./user";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPost: null,
    ids: null,
    isBackUrl: "/",
    posts: null,
    suggested: null,
    following: null,
  }),

  actions: {
    bodySwitch(value) {
      if (value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    },
    allLowerCaseNoCaps(str) {
      return str.split("").join("").toLowerCase();
    },

    setBackUrl(url) {
      this.isBackUrl = url;
    },
    async hasSessionExpired() {
      try {
        axiosClient.interceptors.response.use((response) => {
          return response;
        });
      } catch (error) {
        switch (error.response.status) {
          case 401: //Not logged in
          case 419: //Session expired
          case 503: //Down for maintenance
            // Bounce the user to the login screen with a redirect back
            useUserStore().resetUser();
            window.location.href = "/";
            break;
          case 500:
            alert("Oops, something went wrong! The team has been notified.");
            break;
          default:
            return Promise.reject(error);
        }
      }
    },

    async getRandomUsers(type) {
      let res = await axiosClient.get(`/api/get-random-users`);

      if (type === "suggested") {
        this.suggested = res.data.suggested;
      }

      if (type == "following") {
        this.following = res.data.following;
      }
    },
    updateSideMenuImage(array, user) {
      for (let i = 0; i < array.length; i++) {
        const res = array[i];
        if (res.id == user.id) {
          res.image = user.image;
        }
      }
    },
    async getAllUserAndPosts() {
      let res = await axiosClient.get("/api/home");
      this.posts = res.data;
    },
    async getPostById(id) {
      let res = await axiosClient.get(`/api/posts/${id}`);

      this.$state.selectedPost = res.data.post[0];
      this.$state.ids = res.data.ids;
    },
    setSelectedPost(post) {
      this.$state.selectedPost = post;
    },
  },
  // persist: true,
});
