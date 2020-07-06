<template>
  <el-container>
    <el-footer>
      <!-- 分页 -->
      <div class="pagination-box">
        <el-header class="div row">
          <div class="div row">
            <div class="title">动态列表</div>
            <div class="title_number">
              <div>
                当前页面共(
                <i>{{ this.tableData.length }}</i>
                )条数据
              </div>
            </div>
            <div class="add-build">
              <el-button type="primary" @click="dialogUpload = true"
                >添加动态</el-button
              >
            </div>
          </div>
          <div class="div row">
            <el-input v-model="input" placeholder="搜索相关楼盘动态"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search"
              >搜索</el-button
            >
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            border
            style="width:2000px"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
          >
            <el-table-column prop="title" label="标题" width="500">
            </el-table-column>
            <el-table-column prop="created_at" label="添加时间" width="500">
            </el-table-column>
            <el-table-column label="操作" width="400" fixed="right">
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
    <el-dialog title="修改动态" :visible.sync="dialogUpdata">
      <el-form :model="form">
        <el-form-item label="动态标题" label-width="200">
          <el-input
            v-model="form.title"
            autocomplete="off"
            style="width:100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="动态内容" label-width="200">
          <el-input
            type="textarea"
            rows="4"
            v-model="form.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdata = false">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加动态" :visible.sync="dialogUpload">
      <el-form :model="form1">
        <el-form-item label="动态标题" label-width="200">
          <el-input
            v-model="form1.title"
            autocomplete="off"
            style="width:100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="动态内容" label-width="200">
          <el-input
            rows="4"
            type="textarea"
            v-model="form1.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      tableData: [],
      multipleSelection: [],
      params: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
        row: 0
      },
      dialogUpdata: false,
      dialogUpload: false,
      form: {
        title: "",
        content: ""
      },
      form1: {
        title: "",
        content: ""
      },
      project_id: ""
    };
  },
  mounted() {
    this.project_id = this.$route.query.id;
    this.getDataList();
  },
  methods: {
    // 获取列表数据
    getDataList() {
      this.$http
        .projectNews(this.project_id, this.params.currentPage, "")
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.data;
            this.params.currentPage = res.data.current_page;
            this.params.total = res.data.total;
            this.params.row = res.data.per_page;
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
    // 搜索相关信息
    search() {
      this.$http
        .projectNews(this.project_id, this.params.currentPage, this.input)
        .then(res => {
          if (this.input !== "") {
            this.tableData = res.data.data;
          } else {
            this.getDataList();
          }
        });
    },
    // 点击添加
    handleDelete(index, row) {
      this.$confirm("此操作将删除该操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.deleteNews(row.id).then(res => {
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
            type: "success",
            message: "已取消删除"
          });
        });
    },
    updataCompany(index, row) {
      this.dialogUpdata = true;
      this.$http.queryNews(row.id).then(res => {
        if (res.status === 200) {
          this.form = res.data;
        }
      });
    },
    updata() {
      this.$http
        .updataNews({
          title: this.form.title,
          content: this.form.content,
          id: this.form.id,
          project_id: this.form.project_id
        })
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogUpdata = false;
            this.getDataList();
          }
        });
    },
    upload() {
      this.$http
        .uploadNews({
          title: this.form1.title,
          content: this.form1.content,
          project_id: this.project_id
        })
        .then(res => {
          if (res.status === 200) {
            this.dialogUpload = false;
            this.getDataList();
            this.$message({
              message: "添加成功",
              type: "success"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
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
.el-main {
  padding: 0;
}
</style>
