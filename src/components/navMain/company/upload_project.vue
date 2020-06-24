<template>
  <el-container
    ><el-header
      ><div class="title">提示</div>
      <div class="title-ctn">
        <p>请正确填写输入框信息</p>
      </div>
    </el-header>
    <el-main>
      <el-form label-width="200px" :model="form" style="width:800px">
        <el-form-item label="请选择公司">
          <el-select
            v-model="form.company_id"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getcompanyData"
            :loading="company_loading"
          >
            <el-option
              v-for="item in company_options"
              :key="item.company_id"
              :label="item.name"
              :value="item.company_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择楼盘">
          <el-select
            v-model="form.build_id"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getbuildData"
            :loading="build_loading"
          >
            <el-option
              v-for="item in build_options"
              :key="item.build_id"
              :label="item.name"
              :value="item.build_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目名称拼音">
          <el-input v-model="form.pinyin_name"></el-input>
          <p>请输入项目名称首字母</p>
        </el-form-item>
        <el-form-item label="分佣规则">
          <el-input type="textarea" v-model="form.brokerage_rule"></el-input>
        </el-form-item>
        <el-form-item label="项目归属">
          <el-radio-group v-model="form.project_ownership">
            <el-radio
              v-for="item in project_ownership_list"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结佣方式">
          <el-radio-group v-model="form.clearing_brokerage_category">
            <el-radio
              v-for="item in clearing_brokerage_category_list"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动报备有效">
          <el-switch
            v-model="form.auto_reported_valid"
            active-color="#13ce66"
            inactive-color="#748a8f"
            :active-value="isOpen"
            :inactive-value="isOff"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="报备保护天数">
          <el-input v-model="form.reported_protected_day"></el-input>
        </el-form-item>
        <el-form-item label="到访保护天数">
          <el-input v-model="form.visit_protected_day"></el-input>
        </el-form-item>
        <el-form-item label="线上客户保护天数">
          <el-input v-model="form.online_customer_protected_day"></el-input>
        </el-form-item>
        <el-form-item label="项目是否显示">
          <el-radio-group v-model="form.display">
            <el-radio
              v-for="item in display_list"
              :key="item.boolean"
              :label="item.boolean"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合作方式">
          <el-radio-group v-model="form.cooperation_category">
            <el-radio
              v-for="item in cooperation_category_list"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合作时间">
          <div class="block">
            <el-date-picker
              v-model="form.cooperation_start"
              type="date"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <i style="font-style:normal; color:#748a8f; margin:0 10px">至</i>
            <el-date-picker
              v-model="form.cooperation_end"
              type="date"
              placeholder="选择结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <div class="btn-box">
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">保存项目信息</el-button>
            <el-button @click="goBack">返回项目列表</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      build_options: [],
      company_options: [],
      build_list: [],
      company_list: [],
      build_loading: false,
      company_loading: false,
      isOpen: 1,
      isOff: 0,
      form: {
        build_id: "",
        company_id: "",
        name: "",
        pinyin_name: "",
        brokerage_rule: "",
        project_ownership: "",
        clearing_brokerage_category: "",
        auto_reported_valid: "",
        reported_protected_day: "",
        visit_protected_day: "",
        online_customer_protected_day: "",
        display: "",
        cooperation_category: "",
        cooperation_start: "",
        cooperation_end: ""
      },
      project_ownership_list: [
        { id: "1", name: "商户" },
        { id: "2", name: "客户端" }
      ],
      clearing_brokerage_category_list: [
        { id: "1", name: "前置" },
        { id: "2", name: "后置" },
        { id: "3", name: "前置+后置" }
      ],
      display_list: [
        { boolean: true, name: "是" },
        { boolean: false, name: "否" }
      ],
      cooperation_category_list: [
        { id: "1", name: "电商" },
        { id: "2", name: "分销" },
        { id: "3", name: "代收代付" },
        { id: "4", name: "包销" },
        { id: "5", name: "代理" }
      ]
    };
  },
  mounted() {
    this.getbuildData();
    this.getcompanyData();
  },
  methods: {
    getbuildData(query) {
      this.$http.getHousesList().then(res => {
        this.build_list = res.data.data.map(item => {
          return { name: item.name, build_id: item.id };
        });
        if (query !== "") {
          this.build_loading = true;
          setTimeout(() => {
            this.build_loading = false;
            this.build_options = this.build_list.filter(item => {
              return item.name.indexOf(query) > -1;
            });
          }, 200);
        } else {
          this.build_options = [];
        }
      });
    },
    getcompanyData(query) {
      this.$http.getCompanyList().then(res => {
        this.company_list = res.data.data.map(item => {
          return { name: item.name, company_id: item.id };
        });
        if (query !== "") {
          this.company_loading = true;
          setTimeout(() => {
            this.company_loading = false;
            this.company_options = this.company_list.filter(item => {
              return item.name.indexOf(query) > -1;
            });
          }, 200);
        } else {
          this.company_options = [];
        }
      });
    },
    onSubmit() {
      this.$http.createProject(this.form).then(res => {
        if (res.status === 201) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.$router.push("/project_list");
        } else {
          this.$message({
            message: "提交失败",
            type: "error"
          });
        }
      });
    },
    goBack() {
      this.$router.push("/project_list");
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
p {
  color: #748a8f;
  margin: 4px 0;
}
</style>
