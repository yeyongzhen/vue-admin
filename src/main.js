import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
// 导入全局样式
import "./assets/css/global.css";
// 自定义全局组件
import "./icons/index.js";

import "./router/permit";

Vue.config.productionTip = false;

// runtime 模式（运行时）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
