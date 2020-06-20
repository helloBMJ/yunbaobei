<template>
  <el-container>
    <el-header>
      <div class="title">操作提示</div>
      <div class="title-ctn">
        <p>可以直接在列表中修改相应数据</p>
      </div>
      <div class="btn-box">
        <el-button size="mini" @click="goBack">新盘列表</el-button>
        <el-button size="mini" @click="typeList(build_id)">户型列表</el-button>
        <el-button size="mini" @click="addType(build_id)">户型添加</el-button>
      </div>
    </el-header>
    <typeList v-if="isList" :build_id="this.build_id"></typeList>
    <addType v-else></addType>
  </el-container>
</template>

<script>
import typeList from "./type_list";
import addType from "./addType";
export default {
  data() {
    return {
      isList: true,
      // 传递楼盘的id
      build_id: null
    };
  },
  components: {
    typeList,
    addType
  },
  mounted() {
    this.build_id = this.$route.query.id;
  },
  methods: {
    goBack() {
      this.$router.push("/property_list");
    },
    addType(id) {
      this.isList = false;
    },
    typeList(id) {
      this.isList = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  margin: 10px 0;
}
.title {
  color: #333;
  font-weight: bold;
}
.title-ctn {
  padding: 10px;
  color: #fff;
  background: #edfbf8;
  p {
    color: #748a8f;
    margin: 4px 0;
  }
  i {
    color: red;
  }
}
.el-main {
  margin-top: 80px;
  .title {
    margin: 10px 0;
    padding-left: 5px;
    text-align: left;
    color: #2589ff;
    background: #2589ff14;
  }
}
</style>
