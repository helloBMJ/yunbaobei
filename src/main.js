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
import "../static/ueditor/ueditor.config.js";
import "../static/ueditor/ueditor.all.min.js";
import "../static/ueditor/lang/zh-cn/zh-cn.js";
import "../static/ueditor/ueditor.parse.min.js";
import { WindowsBalloon } from "node-notifier";

// 请求数据
Vue.prototype.$http = http;
Vue.prototype.$city = city;
Vue.use(ElementUI);
// 监视是否登录，没有登录返回到登录界面
router.beforeEach((to, from, next) => {
  let token = window.localStorage.TOKEN;
  if (!token && to.path !== "/login") {
    window.location.href = "/login";
  } else {
    next();
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
