import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/homepage.vue"),
    name: "homepage",
    meta: {
      title: "Home Page",
    },
  },
  {
    path: "/upload",
    component: () => import("../views/upload/index.vue"),
    name: "upload",
    meta: {
      title: "Upload",
    },
  },
  {
    path: "/profile/:id",
    component: () => import("../views/profile/[id].vue"),
    name: "profile",
    meta: {
      title: ``,
    },
  },
  {
    path: "/post/:id",
    component: () => import("../views/post/[id].vue"),
    name: "post",
    meta: {
      title: "",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Tiktok`;
  next();
});
export default router;
