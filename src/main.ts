import { createApp } from "vue";
import { primeVuePlugin } from "./plugins/prime-vue";
import { router } from "./routes";

import App from "./App.vue";

import "./styles.scss";

createApp(App).use(primeVuePlugin).use(router).mount("#app");
