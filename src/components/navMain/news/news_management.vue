<template>
  <el-container>
    <el-header>
      <div class="btn-box">
        <router-link
          v-for="item in router_list"
          :key="item.id"
          tag="el-button"
          size="mini"
          :to="item.path"
          >{{ item.name }}</router-link
        >
      </div>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      router_list: [
        { id: 1, path: "/management_page", name: "管理列表" },
        { id: 2, path: "/add_news", name: "增加资讯" },
        { id: 3, path: "/class_list", name: "分类管理" },
        { id: 4, path: "/add_list", name: "增加分类" }
      ]
    };
  }
};
</script>

<style></style>
