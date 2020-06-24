import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 在VUE中路由遇到Error: Avoided redundant navigation to current location:报错路由重复，
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
import login from "@/page/login";
import not from "@/page/403";
// 路由懒加载
const home = () => import("@/page/home");

// 客户管理

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "登录",
      component: login
    },
    {
      path: "/403",
      component: not
    },
    {
      path: "/home",
      name: "主页",
      component: home
    },

    {
      path: "/visit_customer",
      component: resolve =>
        require([
          "@/components/navMain/mainComponents/visit_customer"
        ], resolve),
      meta: { title: "带看客户" },
      name: "带看客户"
    },
    {
      path: "/customer_order",
      component: resolve =>
        require([
          "@/components/navMain/mainComponents/customer_order"
        ], resolve),
      meta: { title: "客户订单" },
      name: "客户订单"
    },
    {
      path: "/property_list",
      component: resolve =>
        require(["@/components/navMain/mainComponents/property_list"], resolve),
      meta: { title: "楼盘列表" },
      name: "楼盘列表"
    },
    {
      path: "/addbuild",
      component: resolve =>
        require(["@/components/navMain/mainComponents/addbuild"], resolve),
      meta: { title: "发布楼盘" },
      name: "发布楼盘"
    },
    {
      path: "/setup_build",
      component: resolve =>
        require(["@/components/navMain/mainComponents/setup_build"], resolve),
      meta: { title: "编辑楼盘" },
      name: "编辑楼盘"
    },
    {
      path: "/setup_type",
      component: resolve =>
        require(["@/components/navMain/mainComponents/setup_type"], resolve),
      meta: { title: "编辑户型" },
      name: "编辑户型"
      // children: [
      //   {
      //     path: "type_list",
      //     component: resolve =>
      //       require(["@/components/navMain/mainComponents/type_list"], resolve),
      //     meta: { title: "户型列表" },
      //     name: "户型列表"
      //   },
      //   {
      //     path: "addType",
      //     component: resolve =>
      //       require(["@/components/navMain/mainComponents/addType"], resolve),
      //     meta: { title: "户型添加" },
      //     name: "户型添加"
      //   }
      // ]
    },

    {
      path: "/updata_type",
      component: resolve =>
        require(["@/components/navMain/mainComponents/updata_type"], resolve),
      meta: { title: "户型添加" },
      name: "户型添加"
    },
    {
      path: "/plan_photo",
      component: resolve =>
        require(["@/components/navMain/mainComponents/plan_photo"], resolve),
      meta: { title: "规划图相册管理" },
      name: "规划图相册管理"
    },
    {
      path: "/setup_photo",
      component: resolve =>
        require(["@/components/navMain/mainComponents/setup_photo"], resolve),
      meta: { title: "编辑相册" },
      name: "编辑相册"
    },
    // 客户
    {
      path: "/report_customer",
      component: resolve =>
        require(["@/components/navMain/projectInfo/report_customer"], resolve),
      meta: { title: "报备客户" },
      name: "报备客户"
    },
    {
      path: "/basic_information",
      component: resolve =>
        require([
          "@/components/navMain/projectInfo/basic_information"
        ], resolve),
      meta: { title: "基本信息" },
      name: "基本信息"
    },
    {
      path: "/commission_reward",
      component: resolve =>
        require([
          "@/components/navMain/projectInfo/commission_reward"
        ], resolve),
      meta: { title: "佣金奖励" },
      name: "佣金奖励"
    },
    {
      path: "/commission_rules",
      component: resolve =>
        require(["@/components/navMain/projectInfo/commission_rules"], resolve),
      meta: { title: "佣金规则" },
      name: "佣金规则"
    },
    {
      path: "/tel_information",
      component: resolve =>
        require(["@/components/navMain/projectInfo/tel_information"], resolve),
      meta: { title: "电话咨询" },
      name: "电话咨询"
    },
    // 客户
    {
      path: "/man_management",
      component: resolve =>
        require(["@/components/navMain/customer/man_management"], resolve),
      meta: { title: "用户管理" },
      name: "用户管理"
    },
    {
      path: "/commission_end",
      component: resolve =>
        require(["@/components/navMain/customer/commission_end"], resolve),
      meta: { title: "佣金结算" },
      name: "佣金结算"
    },
    {
      path: "/public_man",
      component: resolve =>
        require(["@/components/navMain/customer/public_man"], resolve),
      meta: { title: "公共客户池" },
      name: "公共客户池"
    },
    {
      path: "/follow_record",
      component: resolve =>
        require(["@/components/navMain/customer/follow_record"], resolve),
      meta: { title: "跟进记录" },
      name: "跟进记录"
    },
    // 设置
    {
      path: "/web_overview",
      component: resolve =>
        require(["@/components/navMain/setup/web_overview"], resolve),
      meta: { title: "网站概况" },
      name: "网站概况"
    },
    {
      path: "/site_setup",
      component: resolve =>
        require(["@/components/navMain/setup/site_setup"], resolve),
      meta: { title: "站点设置" },
      name: "站点设置"
    },
    {
      path: "/mes_setup",
      component: resolve =>
        require(["@/components/navMain/setup/mes_setup"], resolve),
      meta: { title: "消息设置" },
      name: "消息设置"
    },
    {
      path: "/password_setup",
      component: resolve =>
        require(["@/components/navMain/setup/password_setup"], resolve),
      meta: { title: "密码设置" },
      name: "密码设置"
    },
    {
      path: "/city_setup",
      component: resolve =>
        require(["@/components/navMain/setup/city_setup"], resolve),
      meta: { title: "城市管理" },
      name: "城市管理"
    },
    {
      path: "/global_parameters",
      component: resolve =>
        require(["@/components/navMain/setup/global_parameters"], resolve),
      meta: { title: "全局参数" },
      name: "全局参数"
    },
    {
      path: "/advertising",
      component: resolve =>
        require(["@/components/navMain/setup/advertising"], resolve),
      meta: { title: "广告管理" },
      name: "广告管理"
    },
    {
      path: "/cache_clearing",
      component: resolve =>
        require(["@/components/navMain/setup/cache_clearing"], resolve),
      meta: { title: "缓存清理" },
      name: "缓存清理"
    },
    {
      path: "/operation_log",
      component: resolve =>
        require(["@/components/navMain/setup/operation_log"], resolve),
      meta: { title: "操作日志" },
      name: "操作日志"
    },
    // 公司

    {
      path: "/company_list",
      component: resolve =>
        require(["@/components/navMain/company/company_list"], resolve),
      meta: { title: "公司列表" },
      name: "公司列表"
    },
    {
      path: "/updata_company",
      component: resolve =>
        require(["@/components/navMain/company/updata_company"], resolve),
      meta: { title: "修改公司信息" },
      name: "修改公司信息"
    },
    {
      path: "/upload_company",
      component: resolve =>
        require(["@/components/navMain/company/upload_company"], resolve),
      meta: { title: "添加公司" },
      name: "添加公司"
    },
    {
      path: "/project_list",
      component: resolve =>
        require(["@/components/navMain/company/project_list"], resolve),
      meta: { title: "项目列表" },
      name: "项目列表"
    },
    {
      path: "/upload_project",
      component: resolve =>
        require(["@/components/navMain/company/upload_project"], resolve),
      meta: { title: "添加项目" },
      name: "添加项目"
    },
    {
      path: "/updata_project",
      component: resolve =>
        require(["@/components/navMain/company/updata_project"], resolve),
      meta: { title: "修改项目" },
      name: "修改项目"
    }
  ]
});
