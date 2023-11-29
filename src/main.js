import { createApp } from "vue";
import VueRouter from "vue-router";
import router from "./router/router";
import store from "./store";
import "./config/rem";
import App from "./App.vue";

createApp(App).use(store).use(router).mount("#app");
