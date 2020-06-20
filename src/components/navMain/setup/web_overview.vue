<template>
  <div class="">
    <div class="title">最新情报</div>
    <div class="div row flex_box">
      <div class="box row div" v-for="item in list" :key="item.name">
        <div class="small-box">{{ item.name }}</div>
        <div class="right-box ">
          <p class="top">{{ item.type_name }}</p>
          <p class="bottom">{{ item.total }}</p>
        </div>
      </div>
    </div>
    <div class="today">今日</div>
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in list2" :key="item.number">
        <div class="grid-content bg-purple div row">
          <div class="left">{{ item.name }}</div>
          <div class="right">{{ item.number }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "盘", type_name: "楼盘总数", total: "23" },
        { name: "员", type_name: "会员总数", total: "123" },
        { name: "客", type_name: "客户总数", total: "223" }
      ],
      list2: [
        { name: "新增会员", number: "1" },
        { name: "新增客户", number: "2" },
        { name: "报备成交金额（万） ", number: "3" },
        { name: "报备成交佣金（元）", number: "4" },
        { name: "已分成佣金（元）", number: "5" },
        { name: "提现总金额", number: "6" },
        { name: "已提现金额", number: "7" },
        { name: "未提现金额", number: "8" },
        {}
      ]
    };
  }
};
</script>

<style lang="scss">
.title {
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
}
.flex_box {
  .box {
    width: 33%;
    padding: 10px;
    background: #fff;
    margin: 20px 10px;
    .small-box {
      color: #fff;
      background: #f66e6d;
      text-align: center;
      line-height: 60px;
      width: 70px;
      height: 60px;
    }
    .right-box {
      color: #f66e6d;
      padding: 10px;
      .top {
        color: #999;
      }
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.today {
  margin-left: 10px;
  margin-bottom: 20px;
  width: 50px;
  height: 30px;
  background: #0081e6;
  text-align: center;
  line-height: 30px;
  border-radius: 50px;
  color: #fff;
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  border: 1px dashed #d3dce6;
}
.grid-content {
  padding: 10px;
  margin: 10px;
  justify-content: space-between;
  border-radius: 4px;
  min-height: 36px;
  .left {
    color: #999;
  }
  .right {
    color: #26bf8c;
  }
}
</style>
