import router from "./index.js";
import whiteList from "./whiteList.js";
import Auth from "@/utils/auth.js";

// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (Auth.getToken()) {
    // TODO:动态路由处理
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
