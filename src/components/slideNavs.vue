<template>
  <!-- 侧边栏导航 -->
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        background-color="#434a50"
        text-color="#fff"
        unique-opened
        router
      >
        <el-submenu v-for="item of menu" :index="item.id" :key="item.id">
          <template slot="title">
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group class="over-hide">
            <el-menu-item
              v-for="sub of item.sub"
              :index="sub.name"
              :key="sub.title"
              @click="clickMenu(sub)"
            >
              {{ sub.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import menu from "@/config/menu-config.js";
export default {
  name: "slideNavs",
  data() {
    return {
      menu: menu,
      openedTab: []
    };
  },
  methods: {
    clickMenu(e) {
      this.openedTab = this.$store.state.openedTab;
      // tabNum 为当前点击的列表项在openedTab中的index，若不存在则为-1
      let tabNum = this.openedTab.indexOf(e.componentName);
      if (tabNum === -1) {
        // 该标签当前没有打开
        // 将componentName加入到已打开标签页state.openedTab数组中
        this.$store.commit("addTab", {
          componentName: e.componentName
        });
      } else {
        // 该标签是已经打开过的，需要激活此标签页
        this.$store.commit("changeTab", e.componentName);
      }
    }
  }
};
</script>

<style lang="scss"></style>
