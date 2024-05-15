import { createRouter, createWebHistory } from "vue-router";
import SelectPerfilPage from "../pages/SelectPerfilPage.vue";
import MainPage from "../pages/MainPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: SelectPerfilPage,
    },
    {
      path: "/console",
      component: MainPage,
    },
  ],
});
