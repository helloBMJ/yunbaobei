<template>
  <div class="header div row">
    <div class="left">logo</div>

    <div class="right div row">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{
          item.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <p>腾房云报备</p>
      <!-- <el-button>通知中心</el-button>
      <el-select v-model="value" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button>绑定微信</el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      options: [],
      levelList: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (
        first &&
        first.name.trim().toLocaleLowerCase() !== "home".toLocaleLowerCase()
      ) {
        matched = [{ path: "/home", meta: { title: "云报备" } }].concat(
          matched
        );
      }
      this.levelList = matched;
    }
  }
};
</script>

<style lang="scss">
.header {
  .el-breadcrumb {
    color: #fff;
  }
  align-items: center;
  margin: 10px 0;
  width: 100%;
  background: #fff;
  justify-content: space-between;
  .left {
    width: 200px;
    margin: auto 0;
    font-size: 32px;
    color: #2366a8;
  }
  .right {
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 8px 30px;
    p {
      color: #9c9fa6;
      margin: auto 10px;
    }
    .el-button {
      border: none;
      border-radius: 0;
      color: #fff;
      background: #8abd10;
      padding: 5px;
      height: 34px;
      margin: auto 5px;
    }
    .el-select {
      width: 250px;
      border: none;
      border-radius: 0;
      .el-select {
        height: 30px;
      }
    }
  }
}
</style>
