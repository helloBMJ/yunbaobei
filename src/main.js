// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import http from "@/utils/http";
import city from "@/utils/city";
// 请求数据
Vue.prototype.$http = http;
Vue.prototype.$city = city;
Vue.use(ElementUI);
// 监视是否登录，没有登录返回到登录界面
router.beforeEach((to, from, next) => {
  //判断userinfo值是否为空，为空或者当前路径是/判断为未登录，返回到登录界面
  const token = localStorage.getItem("TOKEN");
  if (token || to.path === "/login") {
    next();
  } else {
    next({
      path: "/web_overview"
    });
  }
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
