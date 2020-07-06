<template>
  <el-container
    ><el-header
      ><div class="title">提示</div>
      <div class="title-ctn">
        <p>请正确填写输入框信息</p>
      </div>
      <div class="btn-box" style="margin:10px">
        <el-button type="primary" @click="dialogCompany = true"
          >选择项目公司</el-button
        >
        <el-button type="primary" @click="dialogBroker = true"
          >选择项目经纪人</el-button
        >
        <el-button type="primary" @click="dialogManager = true"
          >选择项目经理</el-button
        >
      </div>
      <el-dialog title="选择公司" :visible.sync="dialogCompany">
        <el-form :model="formCompany">
          <el-form-item label="选择公司" label-width="100px">
            <el-select
              v-model="formCompany.company_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入公司名称"
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCompany = false">取 消</el-button>
          <el-button type="primary" @click="bindingCompany">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择经纪人" :visible.sync="dialogBroker">
        <el-form :model="fromBroker">
          <el-form-item label="用户名" label-width="100px">
            <el-select
              v-model="fromBroker.user_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入用户名"
              :remote-method="getbrokerData"
              :loading="broker_loading"
            >
              <el-option
                v-for="item in broker_options"
                :key="item.user_id"
                :label="item.user_name"
                :value="item.user_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogBroker = false">取 消</el-button>
          <el-button type="primary" @click="bindingBroker">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择经理" :visible.sync="dialogManager">
        <el-form :model="fromManager">
          <el-form-item label="用户名" label-width="100px">
            <el-select
              v-model="fromManager.user_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入用户名"
              :remote-method="getbrokerData"
              :loading="broker_loading"
            >
              <el-option
                v-for="item in broker_options"
                :key="item.user_id"
                :label="item.user_name"
                :value="item.user_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogManager = false">取 消</el-button>
          <el-button type="primary" @click="bindingManager">确 定</el-button>
        </div>
      </el-dialog>
    </el-header>
    <el-main>
      <el-form label-width="200px" :model="form" style="width:800px">
        <el-form-item label="请选择公司">
          <el-select
            v-model="form.company_name"
            filterable
            remote
            reserve-keyword
            placeholder="请输入公司名称"
            :remote-method="getcompanyData"
            :loading="company_loading"
            @change="onCompany"
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
            v-model="form.build_name"
            filterable
            remote
            placeholder="请输入楼盘名称"
            :remote-method="getbuildData"
            :loading="build_loading"
            @change="onBuild"
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
        <el-form-item label="佣金分成">
          <el-input style="width:200px" v-model="form.brokerage_rule"></el-input
          ><i style="color:#f78989">注：元/套</i>
        </el-form-item>
        <el-form-item label="类型">
          <el-input
            maxlength="2"
            style="width:200px"
            v-model="form.label"
          ></el-input>
          <i style="color:#f78989">最大限制输入两字</i>
          <i style="color:#999;">例：精选、优惠等字样</i>
        </el-form-item>
        <el-form-item label="分佣规则">
          <el-input
            type="textarea"
            v-model="form.brokerage_description"
          ></el-input>
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
      broker_options: [],
      build_list: [],
      broker_list: [],
      company_list: [],
      build_loading: false,
      broker_loading: false,
      company_loading: false,
      project_id: "",
      form: {
        build_name: "",
        company_name: "",
        build_id: "",
        company_id: "",
        name: "",
        pinyin_name: "",
        brokerage_rule: "",
        label: "",
        brokerage_description: "",
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
      project_ownership: "",
      clearing_brokerage_category: "",
      display: "",
      cooperation_category: "",
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
      ],
      isOpen: null,
      isOff: null,
      formCompany: {
        project_id: "",
        company_id: ""
      },
      fromBroker: {
        project_id: "",
        user_id: ""
      },
      fromManager: {
        project_id: "",
        user_id: ""
      },
      user_list: [],
      dialogBroker: false,
      dialogManager: false,
      dialogCompany: false
    };
  },
  mounted() {
    this.project_id = this.$route.query.id;
    this.formCompany.project_id = this.project_id;
    this.fromBroker.project_id = this.project_id;
    this.fromManager.project_id = this.project_id;
    this.getQuery();
    this.getbuildData();
    this.getcompanyData();
    this.getbrokerData();
  },
  methods: {
    getQuery() {
      this.$http.queryProject(this.project_id).then(res => {
        if (res.status === 200) {
          this.form = res.data;
          this.form.project_ownership = this.form.project_ownership.toString();
          this.form.clearing_brokerage_category = this.form.clearing_brokerage_category.toString();
          this.form.cooperation_category = this.form.cooperation_category.toString();
          switch (this.form.display) {
            case 0:
              this.form.display = false;
              break;
            case 1:
              this.form.display = true;
              break;
            default:
              break;
          }
          switch (this.form.auto_reported_valid) {
            case 0:
              this.form.auto_reported_valid = false;
              break;
            case 1:
              this.form.auto_reported_valid = true;
              break;
            default:
              break;
          }
        }
      });
    },
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
      this.$http.getCompanyList({ name, category: 2 }).then(res => {
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
    getbrokerData(query) {
      this.$http.searchUserList().then(res => {
        this.broker_list = res.data.data.map(item => {
          return { user_id: item.id, user_name: item.user_name };
        });
        if (query !== "") {
          this.broker_loading = true;
          setTimeout(() => {
            this.broker_loading = false;
            this.broker_options = this.broker_list.filter(item => {
              return item.user_name.indexOf(query) > -1;
            });
          }, 200);
        } else {
          this.company_options = [];
        }
      });
    },
    onBuild(a) {
      this.form.build_id = a;
    },
    onCompany(a) {
      this.form.company_id = a;
    },
    onSubmit() {
      this.$http.updataProject(this.form).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$router.push("/project_list");
        }
      });
    },
    goBack() {
      this.$router.push("/project_list");
    },
    // 绑定操作·
    bindingCompany() {
      this.$http.porjectCompany(this.formCompany).then(res => {
        if (res.status === 201) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
      this.dialogCompany = false;
    },
    bindingBroker() {
      this.$http.projectBroker(this.fromBroker).then(res => {
        if (res.status === 201) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
      this.dialogBroker = false;
    },
    bindingManager() {
      this.$http.projectManager(this.fromManager).then(res => {
        if (res.status === 201) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
      this.dialogManager = false;
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
