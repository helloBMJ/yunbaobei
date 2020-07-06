<template>
  <el-main>
    <el-form label-width="100px" :model="form" label-position="left">
      <el-form-item label="标题">
        <el-input v-model="form.title" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.news_category_id" placeholder="">
          <el-option
            v-for="item in news_category_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.content_category" placeholder="">
          <el-option
            v-for="item in content_category_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缩略图">
        <div class="div row">
          <img width="148px;" style="margin-right:20px" :src="form.img" />
          <el-upload
            :headers="myHeader"
            action="api/common/file/upload/admin?category=6"
            :on-success="handleSuccessnews"
            list-type="picture-card"
            :on-preview="handlePictureCardPreviewnews"
            :on-remove="handleRemovenews"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="newsVisible">
            <img width="100%" :src="newsImageUrl" alt="" />
          </el-dialog>
        </div>
      </el-form-item>
      <el-form-item
        label="内容"
        class="ueditor"
        v-if="form.content_category === 1"
      >
        <UE :value="ueditor.value" :config="ueditor.config" ref="ue"></UE>
      </el-form-item>
      <div class="tolink" v-if="form.content_category === 2">
        <el-form-item label="网址">
          <el-input v-model="form.out_link_address"></el-input>
        </el-form-item>
        <el-form-item label="简述">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="作者">
        <el-input v-model="form.author" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item label="初始阅读量">
        <el-input v-model="form.read_total" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" style="width:100px"></el-input>
      </el-form-item>
      <div class="btn-box">
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="goBack">返回管理列表</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-main>
</template>

<script>
import UE from "@/components/ueditor";
export default {
  components: { UE },
  data() {
    return {
      is_link: false,
      form: {
        content: "",
        title: "",
        content_category: 1,
        img: "",
        news_category_id: 1,
        author: "",
        read_total: "",
        sort: "",
        out_link_address: ""
      },
      news_category_list: [{ id: 1, name: "楼盘动态" }],
      content_category_list: [
        {
          id: 1,
          name: "系统文章"
        },
        {
          id: 2,
          name: "跳转链接"
        }
      ],
      ueditor: {
        value: "",
        config: {
          initialFrameWidth: "100%"
        }
      },
      ue: "ue",
      newsVisible: false,
      newsImageUrl: "",
      info_id: ""
    };
  },
  computed: {
    // 获取请求头
    myHeader() {
      return {
        Authorization: "Bearer " + window.localStorage.getItem("TOKEN")
      };
    }
  },
  mounted() {
    this.info_id = this.$route.query.id;
    this.getData();
  },
  methods: {
    // this.content = this.$refs.ue.getUEContent();
    // 获取默认展示
    getData() {
      this.$http.queryInfo(this.info_id).then(res => {
        if (res.status === 200) {
          this.form = res.data;
        }
      });
    },
    // 缩略图
    handleRemovenews(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreviewnews(file) {
      this.newsVisible = file.response.url;
      this.newsImageUrl = true;
    },
    handleSuccessnews(response, file, fileList) {
      this.form.img = response.url;
      console.log(this.form.img);
    },
    goBack() {
      this.$router.push("/management_page");
    },
    onSubmit() {
      this.$http.updataInfo(this.form).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$router.push("/management_page");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.ueditor {
  margin: 20px 0;
}
</style>
