import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Login";
import NotFound from "@/views/errors/NotFound";
import Layout from "@/views/layout";
import AccountIndex from "@/views/account";
import PermissionIndex from "@/views/permission";
import RoleIndex from "@/views/role";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "dashboard"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/dashboard/index.vue")
      }
    ]
  },
  {
    path: "/account",
    name: "Account",
    meta: {
      name: "账号管理",
      icon: "account"
    },
    component: Layout,
    children: [
      {
        path: "/accountIndex",
        name: "AccountIndex",
        meta: {
          name: "账号列表"
        },
        component: AccountIndex
      }
    ]
  },
  {
    path: "/access",
    name: "Access",
    meta: {
      name: "权限管理",
      icon: "access"
    },
    component: Layout,
    children: [
      {
        path: "/permissionIndex",
        name: "PermissionIndex",
        meta: {
          name: "权限列表"
        },
        component: PermissionIndex
      },
      {
        path: "/roleIndex",
        name: "RoleIndex",
        meta: {
          name: "角色列表"
        },
        component: RoleIndex
      }
    ]
  },
  {
    path: "/404",
    name: "NotFound",
    hidden: true,
    meta: {
      name: "404"
    },
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
