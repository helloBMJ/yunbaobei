<template>
  <el-main>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="300"> </el-table-column>
      <el-table-column prop="img" label="标题" width="500">
        <template slot-scope="scope">
          <div class=" div row scope-box">
            <img :src="scope.row.img" alt="" />
            <div class="left">
              <div class="top">{{ scope.row.name }}</div>
              <div class="bottom">
                {{ scope.row.total_room }}室{{ scope.row.total_sallon }}厅{{
                  scope.row.total_washroom
                }}卫 {{ scope.row.area }}平
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="添加时间" width="340">
      </el-table-column>
      <el-table-column
        prop="operating"
        label="操作"
        show-overflow-tooltip
        width="500"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="changeData(scope.row)">修改</el-button>
          <el-button size="mini" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  props: {
    build_id: String
  },
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.getDataList();
    });
  },
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
    // 获取数据列表
    getDataList() {
      this.$http.getBuildList(this.build_id).then(res => {
        if (res.status === 200) {
          this.tableData = res.data;
          console.log(this.tableData);
        }
      });
    },
    // 修改操作
    changeData(row) {
      this.$router.push(`/updata_type?id=${row.id}&build_id=${row.build_id}`);
    },
    //删除操作
    deleteData(row) {
      this.$http.deleteHouse(row.id).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getDataList();
        } else {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.scope-box {
  .left {
    margin-left: 6px;
    .top {
      font-weight: bold;
      font-size: 24px;
    }
  }
  img {
    width: 100px;
  }
}
</style>
