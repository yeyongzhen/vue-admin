import { loginByAccount } from "@/api/login";
import Auth from "@/utils/auth.js";

const state = {
  token: Auth.getToken(),
  userInfo: Auth.getUserInfo() ? JSON.parse(Auth.getUserInfo()) : ""
};

const getters = {};

const mutations = {
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USER_INFO(state, value) {
    state.userInfo = value;
  }
};

const actions = {
  handleLogin(context, payload) {
    return new Promise((resolve, reject) => {
      loginByAccount(payload)
        .then(response => {
          console.log("Login Data => ", response.data.data);

          let { userInfo, token } = response.data.data;
          context.commit("SET_TOKEN", token);
          context.commit("SET_USER_INFO", userInfo);
          Auth.setToken(token.access_token);
          Auth.setUserInfo(userInfo);

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  handleLogout({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_USER_INFO", "");
      Auth.removeToken();
      Auth.removeUserInfo();

      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
