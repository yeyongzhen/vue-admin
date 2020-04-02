import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/css/global.css";

// import service from "@/utils/request";

// axios.defaults.baseURL = 'http://api.szylin.lo/api/'
// axios.interceptors.request.use(config => {
//   const token = window.sessionStorage.getItem("token");
//   config.headers.Authorization = token;
//   return config;
// });
// Vue.prototype.$http = service;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
