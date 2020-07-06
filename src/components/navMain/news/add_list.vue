<template>
  <el-main>
    <el-form ref="form" :model="form">
      <el-form-item label="名称" label-width="100px">
        <el-input style="width:300px" v-model="form.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="所属分类" label-width="100px">
          <el-input style="width:300px" v-model="form.name"></el-input>
        </el-form-item> -->
      <el-form-item label="类型" label-width="100px">
        <el-radio-group v-model="form.link_category">
          <el-radio
            v-for="item in category_list"
            :key="item.id"
            :label="item.id"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" label-width="100px">
        <el-input style="width:300px" v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" label-width="100px">
        <el-input
          style="width:300px"
          placeholder="外链时有效"
          v-model="form.out_link_address"
        ></el-input>
      </el-form-item>

      <div class="btn-box">
        <el-form-item size="large">
          <el-button @click="goBack">返回分类管理</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        link_category: "",
        sort: "",
        out_link_address: ""
      },
      category_list: [
        { name: "内链", id: 1 },
        { name: "外链", id: 2 }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$http.createCategory(this.form).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.$router.push("/class_list");
        }
      });
    },
    // 返回公司列表
    goBack() {
      this.$router.push("/class_list");
    }
  }
};
</script>

<style scoped lang="scss">
.btn-box {
  margin-left: 10%;
}
</style>
