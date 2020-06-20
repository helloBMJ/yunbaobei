<template>
  <div class="main">
    <!-- 输入选择框 -->
    <div class="select-box div row">
      <el-input size="mini" v-model="areaValue" placeholder="滕州"></el-input>
      <el-select
        size="mini"
        v-model="typeValue"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="项目类型"
      >
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option> </el-select
      ><el-select
        v-model="disValue"
        size="mini"
        multiple
        collapse-tags
        style="margin-left: 20px; width:200px"
        placeholder="请选择分销项目"
      >
        <el-option
          v-for="item in disList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="channelValue"
        size="mini"
        multiple
        collapse-tags
        style="margin-left: 20px; width:200px"
        placeholder="请选择渠道"
      >
        <el-option
          v-for="item in channelList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="block">
        <el-date-picker
          size="mini"
          v-model="timeValue"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" size="mini">查询</el-button>
      <el-button type="primary" size="mini">录入订单</el-button>
      <el-button type="primary" size="mini">导出excel</el-button>
    </div>

    <!-- 数据列表 -->
    <div class="table-list">
      <el-table
        height="580px"
        ref="multipleTable"
        :data="schArr"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="{
          'background-color': '#e9e9e9'
        }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="客户" width="120" prop="name">
        </el-table-column>
        <el-table-column prop="otherTel" label="其他号码" width="120">
        </el-table-column>
        <!-- 格式化时间戳  =>formatter=>dateFormat -->
        <el-table-column
          prop="date"
          label="报备时间"
          show-overflow-tooltip
          :formatter="dateFormat"
        >
        </el-table-column>
        <el-table-column prop="project" label="项目" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="channels" label="渠道" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="brokers" label="经纪人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="company_stores"
          label="公司门店"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>

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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // <搜索栏
      value: "",
      typeValue: "",
      disValue: "",
      areaValue: "",
      channelValue: "",
      channelList: [],
      disList: [],
      typeList: [],
      timeValue: "",
      // 表单数据
      tableData: [],
      schArr: [], // 此数组会由getBlogList()函数调用由articleList[]数组提取的部分数据存入来控制页面显示数据条数
      multipleSelection: [],
      // 分页
      params: {
        currentPage: 1,
        pagesize: 10
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取模拟数据
    getList() {
      axios
        .get("", {})
        .then(res => {
          this.tableData = res.data.data.lists;
          this.getPageData();
          return;
        })
        .catch(function(error) {
          console.log(error);
        });
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
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 格式化时间
    dateFormat(row, column) {
      var moment = require("moment");
      var date = row[column.property];
      return moment(date).format("YYYY-MM-DD h:mm:ss");
    }
  }
};
</script>

<style lang="scss">
.select-box {
  margin: 30px;
  margin-top: 0;
  .el-button {
    z-index: 1;
    width: 100px;
    margin: 0 15px;
  }
  .block {
    height: 22px;
  }
}
.el-input {
  width: 150px;
}
.table-list {
  height: 580px;
  .el-table {
    height: 100%;
  }
  .top-select {
    .el-tabs--border-card {
      border: none;
      .el-tabs__nav-scroll {
        border: 1px solid #d1dbe5;
        border-bottom: none;
      }
    }
  }
}
.pagination-box {
  text-align: center;
  color: #333;
  line-height: 60px;
  margin-top: 30px;
}
</style>
