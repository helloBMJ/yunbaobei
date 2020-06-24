<template>
  <div class="lsit">
    <el-container>
      <el-header class="div row">
        <div class="div row">
          <div class="title">用户列表</div>
          <div class="title_number">
            <div>
              当前页面共(
              <i>{{ this.tableData.length }}</i>
              )条数据
            </div>
          </div>
          <!-- <div class="add-build">
            <el-button type="primary" @click="addData">添加信息</el-button>
          </div> -->
        </div>
        <div class="div row">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              用户名称<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">用户名称</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-input v-model="input" placeholder="搜索相关用户"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search"
            >搜索</el-button
          >
        </div>
      </el-header>
      <el-main>
        <div class="btn-box" style="margin:10px">
          <el-button type="primary" @click="dialogCreate = true"
            >添加用户</el-button
          >
        </div>
        <el-table
          :data="tableData"
          border
          style="width:100%"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >
          <el-table-column prop="id" label="id" width="200"></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="created_at"
            label="上传时间"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="operating"
            label="操作"
            width="500"
            fixed="right"
          >
            <!-- 二级操作菜单 -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button size="mini" type="success" @click="upUser(scope.row)"
                >修改用户信息</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="updataPassword(scope.row)"
                >修改密码</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <!-- 分页 -->
        <div class="pagination-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.params.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="this.params.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.params.total"
          >
          </el-pagination>
        </div>
      </el-footer>
      <el-dialog title="添加用户" :visible.sync="dialogCreate">
        <el-form
          :rules="rules"
          ref="form_create"
          status-icon
          :model="form_create"
        >
          <el-form-item label="用户名" label-width="200px" prop="user_name">
            <el-input v-model="form_create.user_name"></el-input>
          </el-form-item>
          <el-form-item label="请输入手机号码" label-width="200px" prop="phone">
            <el-input v-model="form_create.phone"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" label-width="200px" prop="password">
            <el-input type="password" v-model="form_create.password"></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            label-width="200px"
            prop="password_confirmation"
          >
            <el-input
              type="password"
              v-model="form_create.password_confirmation"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCreate = false">取 消</el-button>
          <el-button type="primary" @click="createUser">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改用户" :visible.sync="dialogUpdata">
        <el-form
          :rules="rules2"
          ref="form_updata"
          status-icon
          :model="form_updata"
        >
          <el-form-item label="修改用户名" label-width="200px" prop="user_name">
            <el-input v-model="form_updata.user_name"></el-input>
          </el-form-item>
          <el-form-item label="修改手机号码" label-width="200px" prop="phone">
            <el-input v-model="form_updata.phone"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" label-width="200px" prop="password">
            <el-input type="password" v-model="form_updata.password"></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            label-width="200px"
            prop="password_confirmation"
          >
            <el-input
              type="password"
              v-model="form_updata.password_confirmation"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdata = false">取 消</el-button>
          <el-button type="primary" @click="updataUser">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改密码" :visible.sync="dialogPassword">
        <el-form
          :rules="rules3"
          ref="form_password"
          status-icon
          :model="form_password"
        >
          <el-form-item
            label="请输入原密码"
            label-width="200px"
            prop="old_password"
          >
            <el-input v-model="form_password.old_password"></el-input>
          </el-form-item>
          <el-form-item
            label="请输入新密码"
            label-width="200px"
            prop="new_password"
          >
            <el-input v-model="form_password.new_password"></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            label-width="200px"
            prop="new_password_confirmation"
          >
            <el-input
              v-model="form_password.new_password_confirmation"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPassword = false">取 消</el-button>
          <el-button type="primary" @click="isModify">确 定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form_create.password_confirmation !== "") {
          this.$refs.form_create.validateField("password_confirmation");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form_create.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form_updata.password_confirmation !== "") {
          this.$refs.form_updata.validateField("password_confirmation");
        }
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form_updata.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass5 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form_password.new_password_confirmation !== "") {
          this.$refs.form_password.validateField("new_password_confirmation");
        }
        callback();
      }
    };
    var validatePass6 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form_password.new_password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(value);
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      // 搜索框数据
      input: "",
      dialogCreate: false,
      dialogUpdata: false,
      dialogPassword: false,
      form_create: {
        user_name: "",
        phone: "",
        password: "",
        password_confirmation: ""
      },
      form_updata: {
        id: "",
        user_name: "",
        password: "",
        password_confirmation: ""
      },
      form_password: {
        id: "",
        old_password: "",
        new_password: "",
        new_password_confirmation: ""
      },
      updata_loading: false,
      create_loading: false,
      password_loading: false,
      tableData: [],
      multipleSelection: [],
      // 存放列表图片
      imgbox: [],
      params: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
        row: 0
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password_confirmation: [{ validator: validatePass2, trigger: "blur" }]
      },
      rules2: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: validatePass3, trigger: "blur" }],
        password_confirmation: [{ validator: validatePass4, trigger: "blur" }]
      },
      rules3: {
        old_password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        new_password: [{ validator: validatePass5, trigger: "blur" }],
        new_password_confirmation: [
          { validator: validatePass6, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取列表数据
    getDataList() {
      this.$http.getUserList(this.params.currentPage).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data;
          this.params.currentPage = res.data.current_page;
          this.params.total = res.data.total;
          this.params.row = res.data.per_page;
        } else {
          this.$message({
            message: "请求数据列表失败！",
            type: "error"
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 根据分页设置的数据控制每页显示的数据条数及页码跳转页面刷新
    getPageData() {
      let start = (this.params.currentPage - 1) * this.params.pagesize;
      let end = start + this.params.pagesize;
      this.schArr = this.tableData.slice(start, end);
    },
    // 分页自带的函数，当pageSize变化时会触发此函数
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.getPageData();
      this.getDataList();
    },
    // 分页自带函数，当currentPage变化时会触发此函数
    handleCurrentChange(val) {
      this.params.currentPage = val;
      this.getPageData();
      this.getDataList();
    },
    // 搜索用户
    search() {
      this.$http.searchUser(this.input).then(res => {
        if (this.input !== "") {
          this.tableData = res.data.data;
        } else {
          this.getDataList();
        }
      });
    },
    // 搜索下拉
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    // 操作
    // 删除操作
    handleDelete(index, row) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.deleteUser(row.id).then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getDataList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    upUser(row) {
      this.form_updata.id = row.id;
      this.dialogUpdata = true;
    },
    // 修改操作
    updataUser() {
      this.$http.updataUser(this.form_updata).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogUpdata = false;
          this.getDataList();
        } else {
          this.$message({
            message: "上传失败",
            type: "error"
          });
        }
      });
    },
    // 添加用户
    createUser() {
      this.$http.createUser(this.form_create).then(res => {
        if (res.status === 422) {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        } else if (res.status === 201) {
          this.$message({
            message: "添加用户成功",
            type: "success"
          });
          this.getDataList();
          this.dialogCreate = false;
        }
      });
    },
    // 修改密码
    updataPassword(row) {
      this.form_password.id = row.id;
      this.dialogPassword = true;
    },
    // 确认修改
    isModify() {
      this.$http.modifyPassword(this.form_password).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.data.message
          });
        }
        if (res.data === "") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogPassword = false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.el-dropdown {
  color: #c0c4cc;
  width: 100px;
}
.el-button {
  border: none;
  border-radius: 0;
}
.el-input {
  border-left: none;
  border-radius: 0;
  width: 200px;
}
.row {
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: #999;
  .title {
    color: #333;
    font-weight: bold;
  }
  .title_number {
    margin-left: 10px;
  }
  i {
    text-align: center;
  }
  .add-build {
    margin-left: 10px;
    .el-button {
      border-radius: 4px;
    }
  }
}
.pagination-box {
  text-align: center;
  color: #333;
  line-height: 60px;
  margin-top: 30px;
}
.scope-box {
  height: 40px;
  img {
    width: 100%;
  }
}
</style>
