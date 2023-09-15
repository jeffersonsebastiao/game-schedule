import { createApp } from "vue";
import { primeVuePlugin } from "./plugins/prime-vue";

import App from "./App.vue";

import "./styles.scss";

createApp(App).use(primeVuePlugin).mount("#app");
