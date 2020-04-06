import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

// 导入全局样式
import "./assets/css/global.css";
// 自定义全局组件
import "./icons/index.js";

// import service from "@/utils/request";

// axios.defaults.baseURL = 'http://api.szylin.lo/api/'
// axios.interceptors.request.use(config => {
//   const token = window.sessionStorage.getItem("token");
//   config.headers.Authorization = token;
//   return config;
// });
// Vue.prototype.$http = service;

Vue.config.productionTip = false;

// runtime 模式（运行时）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
