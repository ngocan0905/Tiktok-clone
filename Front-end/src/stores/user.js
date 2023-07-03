import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    bio: "",
    image: "",
  }),
  actions: {
    async getTokens() {
      await axiosClient.get("/sanctum/csrf-cookie");
    },
    async login(email, password) {
      await axiosClient.post("/login", {
        email: email,
        password: password,
      });
    },
    async register(name, email, password, confirmPassword) {
      await axiosClient.post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
    },
    async getUser() {
      let res = await axiosClient.get("/api/logged-in-user");
      this.$state.id = res.data[0].id;
      this.$state.name = res.data[0].name;
      this.$state.bio = res.data[0].bio;
      this.$state.image = res.data[0].image;
    },
    async logOut() {
      await axiosClient.post("/logout");
      this.resetUser();
    },
    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.bio = "";
      this.$state.image = "";
    },
  },
});
