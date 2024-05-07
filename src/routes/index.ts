import { createRouter, createWebHistory } from "vue-router";
import SelectPerfilPage from "../pages/SelectPerfilPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: SelectPerfilPage,
    },
  ],
});
