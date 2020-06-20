<template>
  <!-- 
  ymm
  13299923366
  jinke888
 -->
  <div id="app">
    <!-- <login @click="isTrue" v-if="!this.isLogin"></login> -->
    <!-- v-if="this.isLogin === true" -->
    <el-container>
      <el-header class="header"><headerMenu></headerMenu></el-header>
      <el-container>
        <el-aside width="200px">
          <slideNavs></slideNavs>
        </el-aside>
        <keep-alive>
          <el-main style="height:800px ">
            <router-view />
          </el-main>
        </keep-alive>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import slideNavs from "@/components/slideNavs";
import headerMenu from "@/components/headerMenu";
import login from "@/page/login";
export default {
  data() {
    return {
      isLogin: false,
      isShow: true,
      user: ""
    };
  },
  name: "App",
  components: {
    slideNavs,
    headerMenu,
    login
  },
  mounted() {
    this.user = localStorage.getItem("ms_username");
  },
  methods: {
    isTrue(e) {
      setTimeout(() => {
        this.isLogin = e;
        this.isShow = !e;
      }, 300);
    }
  }
};
</script>

<style lang="scss">
.el-main {
  border-top: 1px solid #f0f0f0;
}
.div {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  &.row {
    flex-direction: row;
  }
}
* {
  padding: 0;
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
}
ul,
ol {
  list-style: none;
}
#app {
  height: 100%;
}
</style>
