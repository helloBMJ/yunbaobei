<template>
  <el-container>
    <el-header
      ><div class="title">提示</div>
      <div class="title-ctn">
        <p>请正确填写输入框信息</p>
      </div>
    </el-header>
    <el-main>
      <el-form label-width="100px" :model="form" style="width:500px">
        <el-form-item label="公司分类">
          <el-select v-model="form.category" placeholder="请选择公司类型">
            <el-option
              v-for="item in category_list"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="门店经纪人">
          <el-select
            v-model="form.store_manager_user_id"
            placeholder="请选择经纪人"
          >
            <el-option
              v-for="item in store_manager_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作等级">
          <el-select v-model="form.cooperation_level" placeholder="请选择等级">
            <el-option
              v-for="item in cooperation_level_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择城市">
          <v-distpicker
            province=""
            city=""
            area=""
            @selected="onSelected"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="公司logo">
          <el-upload
            :headers="myHeader"
            action="api/common/file/upload/admin?category=6"
            :on-success="handleSuccessLogo"
            list-type="picture-card"
            :on-preview="handlePictureCardPreviewLogo"
            :on-remove="handleRemoveLogo"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="logoVisible">
            <img width="100%" :src="logoImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-upload
            :headers="myHeader"
            action="api/common/file/upload/admin?category=6"
            :on-success="handleSuccessLicense"
            list-type="picture-card"
            :on-preview="handlePictureCardPreviewLicense"
            :on-remove="handleRemoveLicense"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="LicenseVisible">
            <img width="100%" :src="LicenseImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="公司主图">
          <el-upload
            :headers="myHeader"
            action="api/common/file/upload/admin?category=6"
            :on-success="handleSuccessCompany"
            list-type="picture-card"
            :on-preview="handlePictureCardPreviewCompany"
            :on-remove="handleRemoveCompany"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="CompanyVisible">
            <img width="100%" :src="CompanyImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <div class="btn-box">
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">保存楼盘信息</el-button>
            <el-button @click="goBack">返回楼盘列表</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  data() {
    return {
      form: {
        category: "",
        cooperation_level: "",
        store_manager_user_id: "",
        province_id: "",
        city_id: "",
        district_id: "",
        address: "",
        name: "",
        logo: "",
        business_license_img: "",
        company_img: ""
      },
      cooperation_level_list: [
        { id: "1", name: "砖石级", proportion: "80%" },
        { id: "2", name: "铂金级", proportion: "60%" },
        { id: "3", name: "黄金级", proportion: "50%" }
      ],
      store_manager_list: [
        { id: "1", name: "经纪人1" },
        { id: "2", name: "经纪人2" },
        { id: "3", name: "经纪人3" },
        { id: "4", name: "经纪人4" }
      ],
      category_list: [],
      // 上传的内容
      // logo
      logoImageUrl: "",
      logoVisible: false,
      // 营业执照 图
      LicenseVisible: false,
      LicenseImageUrl: "",
      // 公司主图
      CompanyVisible: false,
      CompanyImageUrl: "",
      city_list: []
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
    this.getCity();
    this.getCompany();
  },
  methods: {
    getCity() {
      this.$http.getCity().then(res => {
        this.city_list = res.data;
      });
    },
    // 城市选择
    onSelected(data) {
      console.log(data);
      this.form.province_id = data.province.code;
      this.form.city_id = data.city.code;
      this.form.district_id = data.area.code;
      var city_obj = this.city_list.find(item => {
        return item.code === this.form.city_id;
      });
      var province_obj = this.city_list.find(item => {
        return item.code === this.form.province_id;
      });
      var district_obj = this.city_list.find(item => {
        return item.code === this.form.district_id;
      });
      this.form.province_id = province_obj.id;
      this.form.city_id = city_obj.id;
      this.form.district_id = district_obj.id;
    },
    getCompany() {
      this.$http.dictionaryFind("COMPANY_CATEGORY").then(res => {
        this.category_list = res.data.data;
      });
    },
    // 上传文件
    // 上传logo
    handleRemoveLogo(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreviewLogo(file) {
      this.logoImageUrl = file.response.url;
      this.logoVisible = true;
    },
    handleSuccessLogo(response, file, fileList) {
      this.form.logo = response.url;
      console.log(this.form.logo);
    },
    // 上传执照
    handleRemoveLicense(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreviewLicense(file) {
      this.LicenseImageUrl = file.response.url;
      this.LicenseVisible = true;
    },
    handleSuccessLicense(response, file, fileList) {
      this.form.business_license_img = response.url;
      console.log(this.form.business_license_img);
    },
    // 公司主图
    handleRemoveCompany(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreviewCompany(file) {
      this.CompanyImageUrl = file.response.url;
      this.CompanyVisible = true;
    },
    handleSuccessCompany(response, file, fileList) {
      this.form.business_license_img = response.url;
      console.log(this.form.business_license_img);
    },
    onSubmit() {
      this.$http.createCompany(this.form).then(res => {
        if (res.status === 201) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.$router.push("/company_list");
        } else {
          this.$message({
            message: "提交失败",
            type: "error"
          });
        }
      });
    },
    // 返回公司列表
    goBack() {
      this.$router.push("/company_list");
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
  margin-top: 100px;
  .title {
    margin: 10px 0;
    padding-left: 5px;
    text-align: left;
    color: #2589ff;
    background: #2589ff14;
  }
}
</style>
