const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};

const getters = {
  isCollapse: state => state.isCollapse
};

const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  }
};

const actions = {
  collapseSidebar({ commit }) {
    commit("SET_COLLAPSE");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
