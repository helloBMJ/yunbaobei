// /**
//  * 封装get方法
//  * @param url
//  * @param params
//  * @returns {Promise}
//  */
// import axios from "axios";

// export function fetch(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url, {
//         params: params
//       })
//       .then(response => {
//         if (response.data.code === 200) {
//           //返回成功处理  这里传的啥 后续调用的时候 res就是啥
//           resolve(response.data.data); //我们后台所有数据都是放在返回的data里所以这里统一处理了
//         } else {
//           //错误处理
//           console.log(response.data.msg);
//         }
//       })
//       .catch(err => {
//         reject(err);
//         let message = "请求失败！请检查网络";
//         //错误返回
//         if (err.response) message = err.response.data.message;
//         console.log(message);
//       });
//   });
// }

// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function post(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, data).then(
//       response => {
//         if (response.data.code === 200) {
//           resolve(response.data.data);
//         } else {
//           console.log(response.data.msg);
//         }
//       },
//       err => {
//         reject(err);
//         let message = "请求失败！请检查网络";
//         if (err.response) message = err.response.data.message;
//         console.log(message);
//       }
//     );
//   });
// }

// /**
//  * 封装patch请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function patch(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.patch(url, data).then(
//       response => {
//         if (response.data.code === 200) {
//           resolve(response.data.data);
//         } else {
//           console.log(response.data.msg);
//         }
//       },
//       err => {
//         reject(err);
//         let message = "请求失败！请检查网络";
//         if (err.response) message = err.response.data.message;
//         console.log(message);
//       }
//     );
//   });
// }

// /**
//  * 封装put请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function put(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.put(url, data).then(
//       response => {
//         if (response.data.code === 200) {
//           resolve(response.data.data);
//         } else {
//           console.log(response.data.msg);
//         }
//       },
//       err => {
//         reject(err);
//         let message = "请求失败！请检查网络";
//         if (err.response) message = err.response.data.message;
//         console.log(message);
//       }
//     );
//   });
// }

// export function del(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.delete(url, data).then(
//       response => {
//         if (response.data.code === 200) {
//           resolve(response.data.data);
//         } else {
//           console.log(response.data.msg);
//         }
//       },
//       err => {
//         reject(err);
//         let message = "请求失败！请检查网络";
//         if (err.response) message = err.response.data.message;
//         console.log(message);
//       }
//     );
//   });
// }
// /**
//  * 登录
//  */

import axios from "axios";
import router from "../router";
import { Message } from "element-ui";
import { data } from "autoprefixer";

class UserCenter {
  constructor() {
    this.$http = axios.create({
      baseURL: "",
      timeout: 10000
    });

    // 请求拦截
    this.$http.interceptors.request.use(
      function(config) {
        if (localStorage.getItem("TOKEN")) {
          config.headers["Authorization"] =
            "Bearer " + localStorage.getItem("TOKEN");
          // config.headers["Content-Type"] = "application/json";
        } else {
          config.headers["Content-Type"] = "application/json";
        }
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    this.$http.interceptors.response.use(
      response => {
        // if (response.data.code == undefined) {
        //   Message.error("服务器内部错误");
        //   return;
        // }
        // 如果权限不足
        // if (response.status == 403) {
        //   router.push({
        //     path: "/403",
        //     querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
        //   });
        //   return response;
        // }
        if (response.data.code == -1) {
          Message.error("登录已过期！");
          localStorage.removeItem("TOKEN");
          window.location.href = "/login";
          // router.push({
          //     path:"/login",
          //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
          // })
          return response;
        }
        // if (response.data.code == 2) {
        //   eventBus.$emit("bindPhone", response.data);
        //   return response;
        // }
        // if (response.data.code == -10 || response.data.code == -5) {
        //   Message.warning(response.data.msg);
        //   setTimeout(() => {
        //     eventBus.$emit("closeTag");
        //     // router.push({
        //     //   path: "/member_upgrade"
        //     // });
        //   }, 1500);
        //   return response;
        // }
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  /**
   * 登录
   */
  login(data = {}) {
    return this.$http.post("api/auth/admin/login/user_name", data);
  }
  // 获取验证码
  getLoginCode() {
    return this.$http.get("api/auth/admin/login/captcha");
  }
  // 获取楼盘列表数据
  getHousesList() {
    return this.$http.get(`api/admin/build/search`);
  }
  // 楼盘列表搜索
  searchList(input) {
    return this.$http.get(`api/admin/build/search?name=${input}`);
  }
  // 上传楼盘数据
  createBuild(data = {}) {
    return this.$http.post("api/admin/build/create", data);
  }
  // 修改楼盘信息
  updateBuild(data = {}) {
    return this.$http.post(`api/admin/build/update`, data);
  }
  // 删除楼盘列表数据
  deleteBuild(id) {
    return this.$http.get(`api/admin/build/delete/${id}`);
  }
  // 上传户型列表
  createHouse(data = {}) {
    return this.$http.post("api/admin/build/house_type/create", data);
  }
  // 获取楼盘户型列表
  getBuildList(id) {
    return this.$http.get(`api/admin/build/house_type/all/${id}`);
  }
  // 获取楼盘展示
  getQueryBuildList(id) {
    return this.$http.get(`api/admin/build/query/${id}`);
  }
  // 删除户型列表数据
  deleteHouse(id) {
    return this.$http.get(`api/admin/build/house_type/delete/${id}`);
  }
  // 获取展示列表
  getQueryTypeList(id) {
    return this.$http.get(`api/admin/build/house_type/query/${id}`);
  }
  // 获取相册列表展示类型图片
  getphototypeList(type) {
    return this.$http.get(`api/common/dictionary/search?name=${type}`);
  }
  // 修改户型列表数据
  updataType(data = {}) {
    return this.$http.post("api/admin/build/house_type/update", data);
  }
  // 获取相册列表分类图片
  getImgList(id) {
    return this.$http.get(`api/admin/build/img/all/${id}`);
  }
  // 删除相册图片
  deleteImg(id) {
    return this.$http.get(`api/admin/build/img/delete/${id}`);
  }
  // 规划图相册管理上传图片
  createBuildImg(data = {}) {
    return this.$http.post("api/admin/build/img/create", data);
  }
  // 获取城市列表
  getCity() {
    return this.$http.get("api/common/city/search");
  }
}

export default new UserCenter();
