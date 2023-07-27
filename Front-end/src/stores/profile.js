import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: "",
    name: "",
    bio: "",
    image: "",
    post: null,
    posts: null,
    allLikes: "",
  }),
  actions: {
    async getProfile(id) {
      this.resetUser();
      let res = await axiosClient.get(`/api/profiles/${id}`);
      console.log(res.data);
      this.$state.id = res.data.user[0].id;
      this.$state.name = res.data.user[0].name;
      this.$state.bio = res.data.user[0].bio;
      this.$state.image = res.data.user[0].image;

      this.$state.posts = res.data.posts;
    },
    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.bio = "";
      this.$state.image = "";
      this.$state.posts = "";
    },
  },
});
