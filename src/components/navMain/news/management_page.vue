<template>
  <el-main>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100"> </el-table-column>
      <el-table-column prop="id" label="id" width="100"> </el-table-column>
      <el-table-column prop="author" label="作者" width="200">
      </el-table-column>
      <el-table-column prop="created_at" label="添加时间" width="200">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="300"> </el-table-column>
      <el-table-column
        :formatter="formatType"
        prop="news_category_id"
        label="分类"
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
          <el-button type="success" size="mini" @click="changeData(scope.row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" @click="deleteData(scope.row)"
            >删除</el-button
          >
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
      }
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    changeData(row) {
      this.$router.push(`/updataInfo?id=${row.id}`);
    },
    deleteData(row) {
      this.$confirm("此操作将删除该户型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.deleteInfo(row.id).then(res => {
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
    formatType(row) {
      let news_category_name = row.news_category_id;
      if (news_category_name === 1) {
        return (news_category_name = "楼盘动态");
      }
      // if(){}
    },
    // 获取列表数据
    getDataList() {
      this.$http.searchInfo(this.params.currentPage).then(res => {
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
    }
  }
};
</script>

<style></style>
