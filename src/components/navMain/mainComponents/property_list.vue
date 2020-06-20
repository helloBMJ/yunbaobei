<template>
  <div class="list">
    <el-container>
      <el-container>
        <el-header class="div row">
          <div class="div row">
            <div class="title">楼盘列表</div>
            <div class="title_number">
              <div>
                共(
                <i>{{ this.tableData.length }}</i>
                )条数据
              </div>
            </div>
            <div class="add-build">
              <el-button type="primary" @click="addbuild">添加楼盘</el-button>
            </div>
          </div>
          <div class="div row">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                楼盘名称<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">新盘名称</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input v-model="input" placeholder="搜索相关楼盘名称"></el-input>
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
            <el-table-column prop="id" label="id" width="120">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="120">
            </el-table-column>
            <el-table-column
              prop="build_selling_points"
              label="标识"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="img" label="缩略图" width="120">
              <template slot-scope="scope">
                <div class=" div row scope-box">
                  <img :src="scope.row.img" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="city_id" label="城市" width="120">
            </el-table-column>
            <el-table-column prop="build_address" label="区域" width="100">
              <!-- <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template> -->
            </el-table-column>
            <el-table-column prop="plate" label="板块" width="120">
            </el-table-column>
            <el-table-column
              prop="full_build_address"
              label="详细地址"
              width="188"
            >
            </el-table-column>
            <el-table-column
              prop="build_avg_price"
              label="均价（元/平）"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="sales_office_phone"
              label="售楼热线"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="completion_house_time"
              label="开盘时间"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="updated_at" label="添加时间" width="120">
            </el-table-column>

            <el-table-column prop="operating" label="操作" width="150">
              <!-- 二级操作菜单 -->
              <template slot-scope="scope">
                <div class="setup div row">
                  <el-dropdown>
                    <span
                      class="el-dropdown-link el-button--lightblue dropbutton"
                    >
                      <i class="el-icon-s-tools"></i>设置
                    </span>

                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="setupBuild(scope.row)"
                        >编辑楼盘</el-dropdown-item
                      >
                      <el-dropdown-item @click.native="setupType(scope.row)"
                        >编辑户型</el-dropdown-item
                      >
                      <el-dropdown-item @click.native="setupPhoto(scope.row)"
                        >编辑画册</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </div>
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
              :total="this.tableData.length"
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
        pagesize: 10
      },
      // 操作设置
      setup_box: [
        { name: "编辑楼盘", path: "setup_build", index: "1" },
        { name: "编辑户型", path: "setup_type", index: "2" },
        { name: "编辑画册", path: "setup_photo", index: "3" }
      ]
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取列表数据
    getDataList() {
      this.$http.getHousesList().then(res => {
        this.tableData = res.data.data;
        this.imgbox = res.data.data.img;
      });
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
    },
    // 分页自带函数，当currentPage变化时会触发此函数
    handleCurrentChange(val) {
      this.params.currentPage = val;
      this.getPageData();
    },
    // 搜索楼盘
    search() {
      this.$http.searchList(this.input).then(res => {
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
    addbuild() {
      this.$router.push("/addbuild");
    },
    // 操作
    setupBuild(row) {
      this.$router.push(`/setup_build?id=${row.id}`);
    },
    setupType(row) {
      this.$router.push(`/setup_type?id=${row.id}`);
    },
    setupPhoto(row) {
      this.$router.push(`/setup_photo?id=${row.id}`);
    },
    // 删除操作
    handleDelete(index, row) {
      this.$http.deleteBuild(row.id).then(res => {
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
  img {
    width: 100%;
  }
}
</style>
