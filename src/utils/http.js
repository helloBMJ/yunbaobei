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
        // 提交失败
        // if (response.data.code == -1) {
        //   Message.error("登录已过期！");
        //   localStorage.removeItem("TOKEN");
        //   window.location.href = "/login";
        // router.push({
        //     path:"/login",
        //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        // })
        //   return response;
        // }
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
        console.log(error.response.data);
        if (error.response.status === 422) {
          var err = error.response.data;
          Message.error(err.message);
        }
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
  // 获取登录后个人信息
  getAdmin() {
    return this.$http.get("api/admin/my/query");
  }
  // 修改管理员密码
  updataAdmin(data) {
    return this.$http.post("api/admin/my/update/password", data);
  }
  // 获取验证码
  getLoginCode() {
    return this.$http.get("api/auth/admin/login/captcha");
  }
  // 获取楼盘列表数据
  getHousesList(page) {
    return this.$http.get(`api/admin/build/search?page=${page}`);
  }
  // 楼盘列表搜索
  searchList(input) {
    return this.$http.get(`api/admin/build/search?name=${input}`);
  }
  // 搜索公司列表数据
  searchCompany(input) {
    return this.$http.get(`api/admin/company/search?name=${input}`);
  }
  // 上传楼盘数据
  createBuild(data = {}) {
    return this.$http.post("api/admin/build/simple/create", data);
  }
  // 修改楼盘信息
  updateBuild(data = {}) {
    return this.$http.post(`api/admin/build/simple/update`, data);
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
  // 获取物业展示信息
  getQueryAttrList(id) {
    return this.$http.get(`api/admin/build/attr/query/${id}`);
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
  // 公司列表获取
  getCompanyList(page) {
    return this.$http.get(`api/admin/company/search?page=${page}`);
  }
  // 添加公司
  createCompany(data = {}) {
    return this.$http.post(`api/admin/company/create`, data);
  }
  // 删除公司
  deleteCompany(id) {
    return this.$http.get(`api/admin/company/delete/${id}`);
  }
  // 修改公司信息
  updataCompany(data = {}) {
    return this.$http.post(`api/admin/company/update`, data);
  }
  // 公司展示列表
  queryCompany(id) {
    return this.$http.get(`api/admin/company/query/${id}`);
  }
  // 获取项目列表
  getProjectList(page) {
    return this.$http.get(`api/admin/project/search?page=${page}`);
  }
  // 搜索项目信息
  searchProject(input) {
    return this.$http.get(`api/admin/project/search?name=${input}`);
  }
  // 删除项目信息
  deleteProject(id) {
    return this.$http.get(`api/admin/project/delete/${id}`);
  }
  // 添加项目信息
  createProject(data) {
    return this.$http.post("api/admin/project/create", data);
  }
  // 查询项目信息
  queryProject(id) {
    return this.$http.get(`api/admin/project/query/${id}`);
  }
  // 更新项目列表
  updataProject(data) {
    return this.$http.post("api/admin/project/update", data);
  }
  // 项目公司绑定
  porjectCompany(data) {
    return this.$http.post("api/admin/project/company/create", data);
  }
  // 项目经纪人绑定
  projectBroker(data) {
    return this.$http.post("api/admin/project/broker/create", data);
  }
  // 项目经理绑定
  projectManager(data) {
    return this.$http.post("api/admin/project/manager/create", data);
  }
  // 查询用户列表
  searchUserList() {
    return this.$http.get("api/admin/user/search");
  }
  // 查询用户信息
  searchUser(user_name) {
    return this.$http.get(`api/admin/admin_user/search?user_name=${user_name}`);
  }
  // 获取用户列表
  getUserList(page) {
    return this.$http.get(`api/admin/admin_user/search?page=${page}`);
  }
  // 删除用户列表
  deleteUser(id) {
    return this.$http.get(`api/admin/admin_user/delete/${id}`);
  }
  // 添加用户
  createUser(data) {
    return this.$http.post("api/admin/admin_user/create", data);
  }
  // 更新用户
  updataUser(data) {
    return this.$http.post("api/admin/admin_user/update", data);
  }
  // 修改密码
  modifyPassword(data) {
    return this.$http.post("api/admin/admin_user/password/update", data);
  }
  // 字典查找类型
  dictionaryFind(type) {
    return this.$http.get(`api/common/dictionary/search?name=${type}`);
  }
  // 获取城市列表
  getCity() {
    return this.$http.get("api/common/city/search");
  }
}

export default new UserCenter();
