import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openedTab: ["index"],
    activeTab: "",
    token: "",
    userinfo: {
      username: "",
      password: ""
    }
  },
  mutations: {
    addTab(state, { componentName }) {
      state.openedTab.push(componentName);
    },
    changeTab(state, componentName) {
      state.activeTab = componentName;
    },
    titleTab(state, titleTab) {
      state.titleTab = titleTab;
    },
    deductTab(state, componentName) {
      let index = state.openedTab.indexOf(componentName);
      state.openedTab.splice(index, 1);
    },

    // 登录
    setToken(state, payload) {
      state.token = payload;
    },
    removeUserInfo(state, payload) {
      state.token = "";
      state.userinfo = {};
    }
  }
});
