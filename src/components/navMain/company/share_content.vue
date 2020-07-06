<template>
  <el-container>
    <el-footer>
      <!-- 分页 -->
      <div class="pagination-box">
        <el-header class="div row">
          <div class="div row">
            <div class="title">推广信息列表</div>
            <div class="title_number">
              <div>
                当前页面共(
                <i>{{ this.tableData.length }}</i>
                )条数据
              </div>
            </div>
            <div class="add-build">
              <el-button type="primary" @click="dialogUpload = true"
                >添加推广内容</el-button
              >
            </div>
          </div>
          <div class="div row">
            <el-input v-model="input" placeholder="搜索相关推广信息"></el-input>
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
            <el-table-column prop="content" label="推广内容" width="500">
            </el-table-column>
            <el-table-column prop="created_at" label="添加时间" width="200">
            </el-table-column>
            <el-table-column
              :formatter="formatEnable"
              prop="enable"
              label="是否推广"
              width="200"
            >
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
                  @click="updataShare(scope.$index, scope.row)"
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
    <el-dialog
      @close="closeShare"
      title="修改推广内容"
      :visible.sync="dialogUpdata"
    >
      <el-form :model="form">
        <p>推广图片内容</p>
        <div class="share-box row div">
          <div class="share-img" v-for="(item, index) in arr_img" :key="index">
            <img :src="item" alt="" />
          </div>
        </div>
        <el-form-item label="添加图片" label-width="200">
          <el-upload
            :headers="myHeader"
            action="api/common/file/upload/admin?category=6"
            :on-success="handleSuccess"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="9"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="添加内容" label-width="200">
          <el-input
            rows="4"
            type="textarea"
            v-model="form.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否推广" label-width="200">
          <el-switch
            v-model="form.enable"
            active-color="#13ce66"
            inactive-color="#409eff"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdata = false">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加推广" :visible.sync="dialogUpload">
      <el-form :model="form1">
        <el-form-item label="添加图片" label-width="200">
          <el-upload
            :headers="myHeader"
            action="api/common/file/upload/admin?category=6"
            :on-success="handleSuccess"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="9"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="添加内容" label-width="200">
          <el-input
            rows="4"
            type="textarea"
            v-model="form1.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否推广" label-width="200">
          <el-switch
            v-model="form1.enable"
            active-color="#13ce66"
            inactive-color="#409eff"
          >
          </el-switch>
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
        id: "",
        project_id: "",
        enable: true,
        content: "",
        img_1: "",
        img_2: "",
        img_3: "",
        img_4: "",
        img_5: "",
        img_6: "",
        img_7: "",
        img_8: "",
        img_9: ""
      },
      form1: {
        project_id: "",
        enable: true,
        content: "",
        img_1: "",
        img_2: "",
        img_3: "",
        img_4: "",
        img_5: "",
        img_6: "",
        img_7: "",
        img_8: "",
        img_9: ""
      },
      project_id: "",
      dialogImageUrl: "",
      dialogVisible: false,
      arr_img: [],
      updata_id: ""
    };
  },
  computed: {
    // 获取请求头
    myHeader() {
      return {
        Authorization: "Bearer " + window.localStorage.getItem("TOKEN")
      };
    }
  },
  mounted() {
    this.project_id = this.$route.query.id;
    this.getDataList();
  },
  methods: {
    // 上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.response.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      var arr_img = fileList.map(item => item.response.url);
      for (var i = 0; i < arr_img.length; i++) {
        this.form1.img_1 = arr_img[0];
        this.form1.img_2 = arr_img[1];
        this.form1.img_3 = arr_img[2];
        this.form1.img_4 = arr_img[3];
        this.form1.img_5 = arr_img[4];
        this.form1.img_6 = arr_img[5];
        this.form1.img_7 = arr_img[6];
        this.form1.img_8 = arr_img[7];
        this.form1.img_9 = arr_img[8];
        this.form.img_1 = arr_img[0];
        this.form.img_2 = arr_img[1];
        this.form.img_3 = arr_img[2];
        this.form.img_4 = arr_img[3];
        this.form.img_5 = arr_img[4];
        this.form.img_6 = arr_img[5];
        this.form.img_7 = arr_img[6];
        this.form.img_8 = arr_img[7];
        this.form.img_9 = arr_img[8];
      }
    },
    formatEnable(row) {
      let enable = row.enable;
      if (enable === 1) {
        return (enable = "是");
      } else if (enable === 0) {
        return (enable = "否");
      }
    },
    // 获取列表数据
    getDataList() {
      this.$http
        .allShare(this.project_id, this.params.currentPage)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.data;
            this.params.currentPage = res.data.current_page;
            this.params.total = res.data.total;
            this.params.row = res.data.per_page;
            this.form1.project_id = this.project_id;
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
    handleDelete(index, row) {
      this.$confirm("此操作将删除该操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.deleteShare(row.id).then(res => {
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
    updataShare(index, row) {
      this.dialogUpdata = true;
      this.updata_id = row.id;
      this.$http.queryShare(this.updata_id).then(res => {
        if (res.status === 200) {
          this.form = res.data;
          switch (this.form.enable) {
            case 1:
              this.form.enable = true;
              break;
            case 0:
              this.form.enable = false;
              break;
            default:
              break;
          }
          var i = this.form;
          this.arr_img.push(
            i.img_1,
            i.img_2,
            i.img_3,
            i.img_4,
            i.img_5,
            i.img_6,
            i.img_7,
            i.img_8,
            i.img_9
          );
        }
      });
    },
    updata() {
      this.$http.updataShare(this.form).then(res => {
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
      this.$http.uploadShare(this.form1).then(res => {
        if (res.status === 200) {
          this.dialogUpload = false;
          this.getDataList();
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }
      });
    },
    closeShare() {
      this.arr_img = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.share-box {
  margin: 20px 0;

  img {
    width: 80px;
    height: 80px;
  }
}
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
