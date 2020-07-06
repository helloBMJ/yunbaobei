<template>
  <el-main>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="200"> </el-table-column>
      <el-table-column prop="name" label="标题" width="200"> </el-table-column>
      <el-table-column prop="created_at" label="添加时间" width="200">
      </el-table-column>
      <el-table-column
        :formatter="formatCategory"
        prop="link_category"
        label="类型"
        width="200"
      >
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="auto"> </el-table-column>
      <el-table-column
        prop="operating"
        label="操作"
        show-overflow-tooltip
        width="200"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="changeData(scope.row)">修改</el-button>
          <el-button size="mini" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog title="修改分类" :visible.sync="dialogNews">
      <el-form ref="form" :model="form">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属分类" label-width="100px">
          <el-input v-model="form.name"></el-input>
        </el-form-item> -->
        <el-form-item label="类型" label-width="100px">
          <el-radio-group v-model="form.link_category">
            <el-radio
              v-for="item in category_list"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" label-width="100px">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" label-width="100px">
          <el-input
            placeholder="外链时有效"
            v-model="form.out_link_address"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNews = false">取 消</el-button>
        <el-button type="primary" @click="updataNews">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      params: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
        row: 0
      },
      news_id: "",
      dialogNews: false,
      news_loading: false,
      form: {
        name: "",
        link_category: "",
        sort: "",
        out_link_address: "",
        id: ""
      },
      category_list: [
        { name: "内链", id: 1 },
        { name: "外链", id: 2 }
      ]
    };
  },
  mounted() {
    this.getDataList();
  },
  watch: {},
  methods: {
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 取消全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
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
    // 获取列表数据
    getDataList() {
      this.$http.uploadCategory(this.params.currentPage).then(res => {
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
    // 将展示页面1/2转为字符串
    formatCategory(row, column, index) {
      let link_category = row.link_category;
      if (link_category === 1) {
        return (link_category = "内链");
      }
      if (link_category === 2) {
        return (link_category = "外链");
      }
    },
    //删除操作
    deleteData(row) {
      // deleteHouse
      this.$confirm("此操作将删除该户型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.deleteCategory(row.id).then(res => {
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
    changeData(row) {
      this.news_id = row.id;
      console.log(this.news_id);
      this.dialogNews = true;
    },
    // 修改
    updataNews() {
      this.$http
        .updataCategory({
          id: this.news_id,
          name: this.form.name,
          link_category: this.form.link_category,
          out_link_address: this.form.out_link_address,
          sort: this.form.sort
        })
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogNews = false;
            this.getDataList();
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.pagination-box {
  margin-top: 20px;
}
</style>
