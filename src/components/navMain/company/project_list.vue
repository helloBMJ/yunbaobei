<template>
  <div class="list">
    <el-container>
      <el-container>
        <el-header class="div row">
          <div class="div row">
            <div class="title">项目列表</div>
            <div class="title_number">
              <div>
                当前页面共(
                <i>{{ this.tableData.length }}</i>
                )条数据
              </div>
            </div>
            <div class="add-build">
              <el-button type="primary" @click="addData">添加项目</el-button>
            </div>
          </div>
          <div class="div row">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                项目名称<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">项目名称</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input v-model="input" placeholder="搜索相关的项目"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search"
              >搜索</el-button
            >
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
          >
            <el-table-column prop="build_name" label="楼盘名称" width="100">
            </el-table-column>
            <el-table-column prop="company_name" label="所属公司" width="120">
            </el-table-column>
            <el-table-column
              :formatter="formatDisplay"
              prop="display"
              label="是否显示"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="name" label="项目名称" width="140">
              <!-- <template slot-scope="scope">
                <div class=" div row scope-box">
                  <img :src="scope.row.logo" alt="" />
                </div>
              </template> -->
            </el-table-column>
            <el-table-column prop="brokerage_rule" label="分佣规则" width="220">
              <!-- <template slot-scope="scope">
                <div class=" div row scope-box">
                  <img :src="scope.row.company_img" alt="" />
                </div>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="online_customer_protected_day"
              label="线上客户保护天数"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="reported_protected_day"
              label="报备保护天数"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="clearing_brokerage_category_name"
              label="结佣方式"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="project_ownership_name"
              label="项目归属"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="cooperation_category_name"
              label="合作方式"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="cooperation_start"
              label="合作开始时间"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="cooperation_end"
              label="合作结束时间"
              width="120"
            >
            </el-table-column>

            <el-table-column
              prop="operating"
              label="操作"
              width="250"
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
                <el-button
                  size="mini"
                  type="success"
                  @click="updataCompany(scope.$index, scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  @click="setupDynamic(scope.$index, scope.row)"
                  >管理动态</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  @click="shareClient(scope.$index, scope.row)"
                  >推广</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 绑定公司 -->
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
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // 搜索框数据
      input: "",
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
      formCompany: {
        company_id: "",
        project_id: ""
      },
      dialogCompany: false,
      dialogView: false
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取列表数据
    getDataList() {
      this.$http.getProjectList(this.params.currentPage).then(res => {
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
    formatDisplay(row) {
      let display = row.display;
      if (display === 1) {
        return (display = "显示");
      }
      if (display === 0) {
        return (display = "不显示");
      }
    },
    handleClick(row) {
      console.log(row);
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
    // 搜索项目
    search() {
      this.$http.searchProject(this.input).then(res => {
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
    // 点击进入添加楼盘界面
    addData() {
      this.$router.push("/upload_project");
    },

    // 删除操作
    handleDelete(index, row) {
      // deleteProject
      this.$confirm("此操作将删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.deleteProject(row.id).then(res => {
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
    // 修改操作
    updataCompany(index, row) {
      this.$router.push(`/updata_project?id=${row.id}`);
    },
    setupDynamic(index, row) {
      this.$router.push(`/dynamic_list?id=${row.id}`);
    },
    shareClient(index, row) {
      this.$router.push(`/share_content?id=${row.id}`);
    }
  },
  computed: {}
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
  margin: 5px;
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
