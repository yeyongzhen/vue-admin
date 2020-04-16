import axios from "axios";
import Auth from "@/utils/auth.js";
import { Message } from "element-ui";

const BASEURL = process.env.BASE_URL;

// 创建 axios 实例
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000, // 超时时间 10秒
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    let token = Auth.getToken("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    let { data } = response;
    if (data.code !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  error => {
    let { response } = error;

    console.log(response);

    if (response) {
      switch (response.status) {
        case 401:
          window.sessionStorage.removeItem("token"); // 清除 token
          jumpTo("/login"); // 跳转到登录页
          break;
        case 404:
          Message.error("请求失败，请求的资源不存在");
          jumpTo("/404");
          break;
        case 500:
          Message.error("服务器内部错误");
          setTimeout(() => {
            location.reload();
          }, 1200);
          break;
      }

      return Promise.reject(error);
    } else {
      // 断网处理
      if (!window.navigator.onLine) {
        // 断网时，跳转到对应页面
        console.log("断网啦......");
      }

      return Promise.reject(error);
    }
  }
);

const jumpTo = path => {
  window.location.href = window.location.pathname + path;
};

export default service;
