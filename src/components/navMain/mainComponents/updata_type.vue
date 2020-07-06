<template>
  <el-main>
    <el-form ref="form" :model="form">
      <div class="auto-width">
        <el-form-item label="户型分类">
          <el-select v-model="form.region" :placeholder="unit_name">
            <el-option
              v-for="(item, index) in type_classification_list"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="auto-width">
        <el-form-item label="户型标识">
          <el-input v-model="form.type_logo"></el-input>
          <p style="color:#999">
            标识不同户型短标题如：A户型、B户型，字数限定在8个字以内
          </p>
        </el-form-item>
      </div>
      <div class="auto-width">
        <el-form-item label="户型">
          <div class="div row">
            <el-input v-model="form.room"></el-input>室
            <el-input v-model="form.hall"></el-input>厅
            <el-input v-model="form.guard"></el-input>卫
          </div>
          <p style="color:#999">
            如果户型超过五室请在“房源描述”里进行说明
          </p>
        </el-form-item>
      </div>
      <div class="auto-width">
        <el-form-item label="面积">
          <el-input type="number" v-model="form.area"></el-input>
        </el-form-item>
      </div>
      <!-- <div class="auto-width">
        <el-form-item label="标识">
          <el-select v-model="form.mark_sale" placeholder="">
            <el-option
              v-for="(item, index) in mark_sale_list"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div> -->
      <div class="auto-width">
        <el-form-item label="户型特色">
          <el-input v-model="form.features"></el-input>
          <p style="color:#999">多个特色用，隔开</p>
        </el-form-item>
      </div>
      <!-- <div class="title_dis">房源描述最多选择三种类型</div> -->
      <!-- <el-form-item label="">
        <el-select v-model="form.desc1" placeholder="">
          <el-option
            v-for="(item, index) in room_list"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item> -->
      <div class="lou-type">
        <div class="lou-type-s">
          楼盘缩略图，<i style="font-size:12px">注：请上传新图片</i>
        </div>
        <div class="img-box">
          <img :src="form.img" alt="" />
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
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      form: {
        category: "",
        type_logo: "",
        region: "",
        room: "",
        hall: "",
        guard: "",
        area: "",
        mark_sale: "",
        features: "",
        desc1: "",
        desc2: "",
        desc3: "",
        img: ""
      },
      // 户型分类列表
      type_classification_list: [
        { label: "1室户型", value: "1" },
        { label: "2室户型", value: "2" },
        { label: "3室户型", value: "3" },
        { label: "4室户型", value: "4" },
        { label: "5室户型以上", value: "5" }
      ],
      unit_name: "",
      // 标识列表分类
      mark_sale_list: [
        {
          label: "在售",
          value: "1"
        },
        {
          label: "主推",
          value: "2"
        },
        {
          label: "售完",
          value: "3"
        }
      ],
      // 客厅列表
      room_list: [
        { label: "客厅", value: "1" },
        { label: "卫生间", value: "2" },
        { label: "厨房", value: "3" },
        { label: "卧室", value: "4" },
        { label: "玄关", value: "5" },
        { label: "书房", value: "6" }
      ],

      // 上传的内容
      dialogImageUrl: "",
      dialogVisible: false,
      build_id: null,
      id: null
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
    this.build_id = this.$route.query.build_id;
    this.id = this.$route.query.id;
    this.getlist();
  },
  methods: {
    onSubmit() {
      this.$http
        .updataType({
          id: this.id,
          build_id: this.build_id,
          category: this.form.category,
          name: this.form.type_logo,
          total_room: this.form.room,
          total_salloon: this.form.hall,
          total_washroom: this.form.guard,
          area: this.form.area,
          feature: this.form.features,
          img: this.form.img
        })
        .then(res => {
          console.log(this.form);
          if (res.status === 200) {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$router.push(`property_list`);
          } else {
            this.$message({
              message: "提交失败",
              type: "error"
            });
          }
        });
    },
    getlist() {
      this.$http.getQueryTypeList(this.id).then(res => {
        this.form.category = res.data.category;
        switch (this.form.category) {
          case 1:
            this.unit_name = "1室户型";
            break;
          case 2:
            this.unit_name = "2室户型";
            break;
          case 3:
            this.unit_name = "3室户型";
            break;
          case 4:
            this.unit_name = "4室户型";
            break;
          case 5:
            this.unit_name = "5室户型以上";
            break;
          default:
            break;
        }
        this.form.type_logo = res.data.name;
        this.form.room = res.data.total_room;
        this.form.hall = res.data.total_salloon;
        this.form.guard = res.data.total_washroom;
        this.form.area = res.data.area;
        this.form.features = res.data.feature;
        this.form.img = res.data.img;
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
      console.log(this.form.img);
    },
    goBack() {
      this.$router.push("/property_list");
    }
  }
};
</script>

<style lang="scss" scoped>
.title_dis {
  padding: 10px;
  font-size: 12px;
  background: #edfbf8;
  color: #999;
}
.lou-type {
  margin: 20px 0;
  .lou-type-s {
    margin: 5px 0;
    color: #606266;
    font-size: 14rpx;
  }
}
.img-box {
  width: 148px;
  height: 148px;
  margin: 10px 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-input {
  width: 200px;
}
</style>
