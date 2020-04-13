import Cookies from "js-cookie";

const Auth = {
  // 获取 token
  getToken: function() {
    return Cookies.get("token");
  },

  // 设置 token
  setToken: function(token) {
    Cookies.set("token", token);
  },

  // 移除 token
  removeToken: function() {
    Cookies.remove("token");
  },

  // 获取用户信息
  getUserInfo: function() {
    return Cookies.get("userInfo");
  },

  // 设置用户信息
  setUserInfo: function(userInfo) {
    Cookies.set("userInfo", userInfo);
  },

  removeUserInfo: function() {
    Cookies.remove("userInfo");
  }
};

export default Auth;
