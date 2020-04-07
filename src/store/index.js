import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 驱动应用的数据源
  state: {
    isCollapse: false
  },
  // 可认为是 store 的计算属性
  getters: {},
  // 必须是 同步函数
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      console.log("collapse", state.isCollapse);
    }
  },
  // 响应 view 上的用户输入导致的状态变化，可处理 异步操作
  actions: {},
  modules: {}
});
