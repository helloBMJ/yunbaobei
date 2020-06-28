<template>
  <div class="">
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
    return { isLogin: false, isShow: true, user: "" };
  },
  components: {
    slideNavs,
    headerMenu
  },
  mounted() {},
  methods: {
    // isTrue(e) {
    //   setTimeout(() => {
    //     this.isLogin = e;
    //     this.isShow = !e;
    //   }, 300);
    // }
  }
};
</script>

<style></style>
