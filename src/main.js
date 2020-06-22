// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import http from "@/utils/http";
// 请求数据
Vue.prototype.$http = http;

Vue.use(ElementUI);

// //使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   const role = localStorage.getItem("TOKEN");
//   // const role = store.state.userinfo;
//   if (!role && to.path !== "/login") {
//     // window.location.href = "/member/userlogin"
//     next("/login");
//   } else {
//     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//     if (navigator.userAgent.indexOf("MSIE") > -1 && to.path === "/editor") {
//       Vue.prototype.$alert(
//         "vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看",
//         "浏览器不兼容通知",
//         {
//           confirmButtonText: "确定"
//         }
//       );
//     } else {
//       next();
//     }
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
