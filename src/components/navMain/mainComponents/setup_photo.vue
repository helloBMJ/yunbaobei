<template>
  <el-container>
    <el-header>
      <div class="title">操作提示</div>
      <div class="title-ctn">
        <p>所属户型为扩展内容，仅在类型为"样板间"时设置有效，可不填</p>
      </div>
      <div class="btn-box">
        <el-button size="mini" @click="goBack">新盘列表</el-button>
        <el-button size="mini" @click="photoList">相册列表</el-button>
      </div>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col v-for="item in photo_list" :key="item.number" :span="6"
          ><div
            class="grid-content bg-purple"
            @click="goPlanPhoto(build_id, item.value)"
          >
            <div class="img-box" v-for="item in category_img" :key="item.id">
              <img :src="item.img" alt="" />
            </div>
            <div class="mask">
              <div class="mask-box div row">
                <p class="top">{{ item.description }}</p>
              </div>
            </div>
          </div></el-col
        >
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      photo_list: [],
      build_id: null,
      category: null,
      category_img: [],
      newArr: []
    };
  },
  mounted() {
    this.build_id = this.$route.query.id;
    this.getPhotoList();
    this.showImg();
  },
  methods: {
    // 返回列表页
    goBack() {
      this.$router.push("/property_list");
    },
    photoList() {},
    getPhotoList() {
      this.$http.getphototypeList("BUILD_IMG_CATEGORY").then(res => {
        if (res.status === 200) {
          res.data.data.filter(item => {
            this.photo_list.push({
              category: item.value,
              description: item.description
            });
          });
        }
      });
    },
    showImg() {
      this.$http.getImgList(this.build_id).then(res => {
        res.data.filter(item => {
          this.photo_list.map(it => {
            console.log(it);
            if (it.category == item.category) {
              this.newArr.push(it);
            }
          });
        });
      });
    },
    goPlanPhoto(id, value) {
      this.$router.push(`/plan_photo?id=${id}&category=${value}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  margin: 10px 0;
}
.title {
  color: #333;
  font-weight: bold;
}
.title-ctn {
  padding: 10px;
  color: #fff;
  background: #edfbf8;
  p {
    color: #748a8f;
    margin: 4px 0;
  }
  i {
    color: red;
  }
}
.el-main {
  margin-top: 80px;
  .title {
    margin: 10px 0;
    padding-left: 5px;
    text-align: left;
    color: #2589ff;
    background: #2589ff14;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    position: relative;
    height: 250px;
    border-radius: 4px;
    min-height: 36px;
    margin: 30px 0;
    overflow: hidden;
    .mask {
      .mask-box {
        flex-direction: column;
        align-items: center;
        p {
          height: 250px;
          width: 100%;
          text-align: center;
          line-height: 250px;
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 24px;
          font-weight: bold;
        }
        .top {
          position: absolute;
        }
      }
    }
  }
}
.img-box {
  height: 250px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
