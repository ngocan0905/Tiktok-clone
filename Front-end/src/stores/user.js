import { defineStore } from "pinia";
import axiosClient from "../api/axiosClient";
import { useGeneralStore } from "./general";
const USER_STORAGE_KEY = "user_data";

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
    saveUserToLocalStorage() {
      const userData = {
        id: this.$state.id,
        name: this.$state.name,
        bio: this.$state.bio,
        image: this.$state.image,
      };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    },
    restoreUserFromLocalStorage() {
      const userData = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
      if (userData) {
        this.$state.id = userData.id;
        this.$state.name = userData.name;
        this.$state.bio = userData.bio;
        this.$state.image = userData.image;
      }
    },
    async login(email, password) {
      await axiosClient.post("/login", {
        email: email,
        password: password,
      });
      this.saveUserToLocalStorage();
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
    async updateUserImage(data) {
      return await axiosClient.post("/api/update-user-image", data);
    },
    async updateUser(name, bio) {
      return await axiosClient.patch("/api/update-user", {
        name: name,
        bio: bio,
      });
    },
    async createPost(data) {
      return await axiosClient.post("/api/posts", data);
    },
    async likePost(post, isPostPage) {
      let res = await axiosClient.post("/api/likes", {
        post_id: post.id,
      });

      let singlePost = null;
      if (isPostPage) {
        singlePost = post;
      } else {
        singlePost = useGeneralStore().posts.find((p) => p.id === post.id);
      }

      singlePost.likes.push(res.data.like);
    },
    async unlikePost(post, isPostPage) {
      let deleteLike = null;
      let singlePost = null;

      if (isPostPage) {
        singlePost = post;
      } else {
        singlePost = useGeneralStore().posts.find((p) => p.id === post.id);
      }

      singlePost.likes.forEach((like) => {
        if (like.user_id === this.id) {
          deleteLike = like;
        }
      });

      let res = await axiosClient.delete("/api/likes/" + deleteLike.id);

      for (let i = 0; i < singlePost.likes.length; i++) {
        const like = singlePost.likes[i];
        if (like.id === res.data.like.id) {
          singlePost.likes.splice(i, 1);
        }
      }
    },
    async addComment(post, comment) {
      let res = axiosClient.post("/api/comments", {
        post_id: post.id,
        comment: comment,
      });
      if (res.status === 200) {
        await this.updateComments(post);
      }
    },
    async deleteComment(post, commentId) {
      let res = await axiosClient.delete(`/api/comments/${commentId}`, {
        post_id: post.id,
      });
      if (res.status === 200) {
        useGeneralStore().selectedPost.comments =
          useGeneralStore().selectedPost.comments.filter(
            (comment) => comment.id !== commentId
          );
      }
    },
    async updateComments(post) {
      let res = axiosClient.get(`/api/profiles/${post.user.id}`);
      for (let i = 0; i < res.data.posts?.length; i++) {
        const updatePost = res.data.posts[i];
        if (post.id == updatePost.id) {
          useGeneralStore().selectedPost.comments = updatePost.comments;
        }
      }
    },

    async logOut() {
      await axiosClient.post("/logout");
      localStorage.removeItem(USER_STORAGE_KEY);
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
