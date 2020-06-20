<template>
  <el-container>
    <el-header>
      <div class="title">操作提示</div>
      <div class="title-ctn">
        <!-- <p>
          上传图片：先点击 “批量上传”
          按钮选中要上传的单张或多张图片，等待上传图片显示后，点击右边的 “确认”
          按钮即可。
        </p>
        <p>修改图片：点击已上传的图片上的编辑文字可以对该图片进行编辑</p> -->
        <!-- <p>
          删除图片：点击 “批量处理”，在显示的按钮前打勾后点击 “删除” 按钮即可。
        </p> -->
        <p>所属户型为扩展内容，仅在类型为"样板间"时设置有效，可不填</p>
      </div>
    </el-header>
    <el-main>
      <div class="title">规划图相册管理</div>
      <el-form res="form" :model="form">
        <div class="lou-type">
          <div class="lou-type-s">楼盘缩略图</div>

          <div style="width:100%" class="row div">
            <div class="img-box" v-for="img in category_img" :key="img.id">
              <!-- <div class="title">效果图</div> -->
              <img :src="img.img" alt="" />
              <div class="delete" @click="handleDelete(img.id)">删除图片</div>
            </div>
          </div>
          <el-upload
            :headers="myHeader"
            action="api/common/file/upload/admin?category=4"
            :on-success="handleSuccess"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即上传</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        img: ""
      },
      // 上传的内容
      dialogImageUrl: "",
      dialogVisible: false,
      build_id: null,
      category_value: null,
      category_img: []
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
    this.build_id = this.$route.query.id;
    this.category_value = this.$route.query.category;
    this.showImg();
  },
  methods: {
    onSubmit() {
      this.$http
        .createBuildImg({
          build_id: this.build_id,
          category: this.category_value,
          img: this.form.img
        })
        .then(res => {
          if (res.status === 201) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            this.showImg();
            // this.$router.push("/property_list");
            return;
          } else {
            this.$message({
              message: "上传失败",
              type: "error"
            });
          }
        });
    },
    // 上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.response.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      this.form.img = response.url;
    },
    goBack() {
      this.$router.push("/property_list");
    },
    showImg() {
      this.$http.getImgList(this.build_id).then(res => {
        this.category_img = res.data;
      });
    },
    handleDelete(id) {
      this.$http.deleteImg(id).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.showImg();
        } else {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
  .lou-type {
    margin: 20px 0;
    .lou-type-s {
      margin: 5px 0;
      color: #606266;
    }
  }
}
.img-box {
  margin: 10px;
  width: 148px;
  height: 148px;
  position: relative;
  .delete {
    font-size: 14px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
