import { createRouter, createWebHistory } from "vue-router";
import SelectPerfilPage from "../pages/SelectPerfilPage.vue";
import ConsolePage from "../pages/ConsolePage.vue";
import MainLayout from "../layout/MainLayout.vue";
import TypePage from "../pages/TypePage.vue";
import MainPage from "../pages/MainPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: SelectPerfilPage,
    },
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "main",
          component: MainPage,
        },
        {
          path: "console",
          component: ConsolePage,
        },
        {
          path: "type",
          component: TypePage,
        },
      ],
    },
  ],
});
