<template>
  <div class="list">
    <el-container>
      <el-header class="div row">
        <div class="div row">
          <div class="title">公司列表</div>
          <div class="title_number">
            <div>
              当前页面共(
              <i>{{ this.tableData.length }}</i>
              )条数据
            </div>
          </div>
          <div class="add-build">
            <el-button type="primary" @click="addData">添加公司</el-button>
          </div>
        </div>
        <div class="div row">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              公司名称<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">公司名称</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-input v-model="input" placeholder="搜索相关公司"></el-input>
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
          <el-table-column prop="id" label="id" width="200"> </el-table-column>
          <el-table-column prop="name" label="公司名称" width="200">
          </el-table-column>
          <el-table-column prop="logo" label="标识" width="200">
            <template slot-scope="scope">
              <div class=" div row scope-box">
                <el-image fit="contain" :src="scope.row.logo" alt="" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="category_name" label="公司分类" width="200">
          </el-table-column>
          <el-table-column prop="city_name" label="城市" width="200">
          </el-table-column>
          <el-table-column prop="full_address" label="详细地址" width="238">
          </el-table-column>
          <el-table-column prop="updated_at" label="添加时间" width="200">
          </el-table-column>

          <el-table-column
            prop="operating"
            label="操作"
            width="200"
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
      }
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取列表数据
    getDataList() {
      this.$http.showCompanyList(this.params.currentPage).then(res => {
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
    // 搜索楼盘
    search() {
      this.$http.searchCompany(this.input).then(res => {
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
      this.$router.push("/upload_company");
    },
    // 操作

    // 删除操作
    handleDelete(index, row) {
      this.$confirm("此操作将删除该公司, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.deleteCompany(row.id).then(res => {
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
      this.$router.push(`/updata_company?id=${row.id}`);
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
  .el-image {
    height: 40px;
    width: 100%;
  }
}
</style>
