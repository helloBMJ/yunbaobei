<template>
  <el-container>
    <el-header>
      <div class="title">提示</div>
      <div class="title-ctn">
        <p>新增内容后编辑可以增加楼盘地图坐标,增加坐标后即可在地图中显示</p>
        <p>地图坐标输入框依次对应 lng,lat (经纬度)</p>
        <p>带 <i>*</i> 为必填项</p>
      </div>
    </el-header>
    <el-main>
      <div class="title">
        楼盘信息
      </div>
      <el-form
        :rules="rules"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <!-- 项目名称 -->
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="formInline.project_name" placeholder=""></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary">检查重名</el-button>
        </el-form-item> -->
        <!-- 项目拼音 -->
        <!-- <el-form-item label="项目拼音" prop="project_pinyin">
          <el-input
            v-model="formInline.project_pinyin"
            placeholder="系统默认添加项目名称首字母组合 "
          ></el-input>
        </el-form-item> -->
        <!-- 城市区域 -->
        <div>
          <el-form-item label="城市区域" prop="area">
            <v-distpicker
              :province="formInline.province_name"
              :city="formInline.city_name"
              :area="formInline.district_name"
              @selected="onSelected"
            ></v-distpicker>
          </el-form-item>
        </div>

        <!-- 楼盘地址 -->
        <el-form-item label="楼盘地址" prop="build_address">
          <el-input
            v-model="formInline.build_address"
            placeholder=" "
          ></el-input>
        </el-form-item>
        <!-- 地图坐标 -->
        <el-form-item label="地图坐标" prop="map_lat">
          <el-input
            type="number"
            v-model="formInline.map_lat"
            placeholder=" "
            style="width:100px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="map_lng">
          <el-input
            type="number"
            v-model="formInline.map_lng"
            placeholder=" "
            style="width:100px"
          ></el-input>
        </el-form-item>
        <el-button type="primary">标注位置</el-button>
        <!-- 楼盘类型 -->
        <div class="lou-type">
          <div class="lou-type-s">楼盘类型</div>
          <el-checkbox-group v-model="formInline.lou_radio">
            <el-checkbox
              v-for="item in lou_list"
              :key="item.id"
              :label="item.id"
              >{{ item.type }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <!-- 楼盘属性 -->
        <div class="lou-type">
          <div class="lou-type-s">楼盘属性</div>
          <el-select
            v-model="formInline.attributes"
            :placeholder="formInline.build_status_name"
          >
            <el-option
              v-for="item in attributes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 售楼热线 -->
        <el-form-item label="售楼热线" prop="lou_tel">
          <el-input v-model="formInline.lou_tel" placeholder=" "></el-input>
        </el-form-item>
        <!-- 售楼地址 -->
        <el-form-item label="售楼地址" prop="sales_address">
          <el-input
            v-model="formInline.sales_address"
            placeholder=" "
          ></el-input>
        </el-form-item>
        <!-- 楼盘均价 -->
        <el-form-item label="楼盘均价" prop="lou_price">
          <el-input
            v-model="formInline.lou_price"
            placeholder="用于价格排序"
          ></el-input
          >元/平
          <i style="color:#999">不填写为待定</i>
        </el-form-item>
        <!-- 价格说明 -->
        <el-form-item label="价格说明" prop="price_info">
          <el-input
            v-model="formInline.price_info"
            placeholder="对均价的补充说明"
          ></el-input>
        </el-form-item>
        <!-- 上传楼盘缩略图 -->
        <div class="lou-type">
          <div class="lou-type-s">
            <i style="font-style:normal;margin-bottom:40px">楼盘缩略图</i>
          </div>
          <img width="148px" height="148px" :src="formInline.img" alt="" />
          <el-upload
            :headers="myHeader"
            action="api/common/file/upload/admin?category=6"
            :on-success="handleSuccess"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
        <!-- 物业费 -->
        <el-form-item label="物业费" prop="property_costs">
          <el-input
            v-model="formInline.property_costs"
            placeholder=""
          ></el-input
          >元（/㎡/月）
        </el-form-item>
        <!-- 物业公司 -->
        <el-form-item label="物业公司" prop="property_company">
          <el-input
            v-model="formInline.property_company"
            placeholder=""
          ></el-input>
        </el-form-item>
        <!-- 面积区间 -->
        <el-form-item label="面积区间" prop="area_interval">
          <el-input
            v-model="formInline.area_interval"
            placeholder=""
          ></el-input>
        </el-form-item>
        <!-- 购房优惠 -->
        <el-form-item label="购房优惠" prop="buy_discount">
          <el-input v-model="formInline.buy_discount" placeholder=""></el-input>
        </el-form-item>
        <!-- 开放商 -->
        <el-form-item label="开发商" prop="developer">
          <el-input v-model="formInline.developer" placeholder=""></el-input>
        </el-form-item>
        <!-- 销售许可证 -->
        <el-form-item label="销售许可证" prop="license">
          <el-input v-model="formInline.license" placeholder=""></el-input>
        </el-form-item>
        <!-- 装修 -->
        <div class="lou-type">
          <div class="lou-type-s">装修</div>
          <el-checkbox-group v-model="formInline.decoration">
            <el-checkbox
              v-for="item in decorationlist"
              :key="item.id"
              :label="item.id"
              >{{ item.type }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <!-- 楼层 -->
        <div class="lou-type">
          <div class="lou-type-s">楼层</div>
          <el-checkbox-group v-model="formInline.floor">
            <el-checkbox
              v-for="item in floorlist"
              :key="item.id"
              :label="item.id"
              >{{ item.type }}</el-checkbox
            >
          </el-checkbox-group>
          <p style="font-size:12px; color:#999 ">
            参考:1~3层为低层4-7层为多层8~12层为小高层13~25层为高层26层100米以上为超高层
          </p>
        </div>
        <!-- 楼盘特色 -->
        <div class="lou-type">
          <div class="lou-type-s">楼盘特色</div>
          <el-checkbox-group v-model="formInline.lou_feature">
            <el-checkbox
              v-for="item in lou_feature_lsit"
              :key="item.id"
              :label="item.id"
              >{{ item.type }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <!-- 建筑数据 -->
        <div class="title">建筑数据</div>
        <!-- 总建筑面积 -->
        <el-form-item label="总建筑面积">
          <el-input v-model="formInline.total_area" placeholder=""></el-input
          >平米<i style="color:rgb(153, 153, 153)">例：100平米</i>
        </el-form-item>
        <!-- 占地面积 -->
        <el-form-item label="占地面积">
          <el-input v-model="formInline.footprint" placeholder=""></el-input
          >平米<i style="color:rgb(153, 153, 153)">例：100平米</i>
        </el-form-item>
        <!-- 总户数 -->
        <el-form-item label="总户数">
          <el-input v-model="formInline.total_houses" placeholder=""></el-input
          >户
        </el-form-item>
        <!-- 绿化率 -->
        <el-form-item label="绿化率">
          <el-input v-model="formInline.greening_rate" placeholder=""></el-input
          >%<i style="color:rgb(153, 153, 153)">例：20%</i>
        </el-form-item>
        <!-- 容积率 -->
        <el-form-item label="容积率">
          <el-input v-model="formInline.volume_rate" placeholder=""></el-input
          ><i style="color:rgb(153, 153, 153)">例：2.00</i>
        </el-form-item>
        <!-- 停车位 -->
        <el-form-item label="停车位">
          <el-input v-model="formInline.car_space" placeholder=""></el-input
          ><i style="color:rgb(153, 153, 153)">例：2.00</i>
        </el-form-item>
        <!-- 房屋产权 -->
        <el-form-item label="房屋产权">
          <el-input
            v-model="formInline.houses_property"
            placeholder="70"
          ></el-input
          ><i style="color:rgb(153, 153, 153)">例：70年</i>
        </el-form-item>
        <!-- 开盘时间 -->
        <el-form-item label="开盘时间">
          <el-input v-model="formInline.open_time" placeholder=""></el-input>
          <p style="color:rgb(153, 153, 153)">
            主要以开盘时间说明为准，这里用于开盘日历及列表排序
          </p>
          <p style="color:rgb(153, 153, 153)">注：时间格式：xxxx-xx-xx</p>
        </el-form-item>
        <!-- 竣工时间 -->
        <el-form-item label="竣工时间">
          <el-input
            v-model="formInline.complete_time"
            placeholder=""
          ></el-input>
        </el-form-item>
        <div class="title">楼盘报备</div>
        <!-- 独立经纪人设置 -->
        <!-- <div class="tips-box div row" style="background:#f4f9ff">
          <div class="tips-left">独立经纪人设置</div>
          <div class="tips-right">
            此处设置内容仅在独立经纪人或游客登录时展示
          </div>
        </div> -->
        <!-- 楼盘佣金 -->
        <!-- <el-form-item label="楼盘佣金">
          <el-input
            v-model="formInline.independent_floor_commission"
            placeholder="不设置佣金填0即可"
          ></el-input
          >元起
          <p style="color:rgb(153, 153, 153)">
            仅用作前台展示，最终分佣以实际价格为准
          </p>
        </el-form-item> -->
        <!-- 带看奖励 -->
        <!-- <el-form-item label="带看奖励">
          <el-input
            v-model="formInline.independent_visit_reward"
            placeholder=""
          ></el-input>
        </el-form-item> -->
        <!-- 分佣规则 -->
        <!-- <el-form-item label="分佣规则">
          <el-input
            :rows="3"
            :cols="100"
            type="textarea"
            v-model="formInline.independent_commission_rules"
          ></el-input>
        </el-form-item> -->
        <!-- 门店经纪人设置 -->
        <!-- <div class="tips-box div row" style="background:#f9f2ff">
          <div class="tips-left" style="color: #a125ff">门店经纪人设置</div>
          <div class="tips-right">
            此处设置内容仅在门店经纪人登录时设置,留空时,将于独立经纪人展示一样的内容
          </div>
        </div> -->
        <!-- 楼盘佣金 -->
        <!-- <el-form-item label="楼盘佣金">
          <el-input
            v-model="formInline.store_floor_commission"
            placeholder="不设置佣金填0即可"
          ></el-input
          >元起
          <p style="color:rgb(153, 153, 153)">
            仅用作前台展示，最终分佣以实际价格为准
          </p>
        </el-form-item> -->
        <!-- 带看奖励 -->
        <!-- <el-form-item label="带看奖励">
          <el-input
            v-model="formInline.store_visit_reward"
            placeholder=""
          ></el-input>
        </el-form-item> -->
        <!-- 分佣规则 -->
        <!-- <el-form-item label="分佣规则">
          <el-input
            :rows="3"
            :cols="100"
            type="textarea"
            v-model="formInline.store_commission_rules"
          ></el-input>
        </el-form-item> -->
        <!-- 默认分佣比例 -->
        <!-- <el-form-item label="默认分佣比例">
          <el-input
            v-model="formInline.default_commission_rules"
            placeholder=""
          ></el-input>
          <p style="color:rgb(153, 153, 153)">
            后台提示用，成交价金额的此百分比部分作为默认分成用金额
          </p>
        </el-form-item> -->
        <!-- 楼盘卖点 -->
        <el-form-item label="楼盘卖点">
          <el-input
            :rows="3"
            :cols="100"
            type="textarea"
            v-model="formInline.selling_point"
          ></el-input>
        </el-form-item>
        <!-- 合作规则 -->
        <!-- <el-form-item label="合作规则">
          <el-input
            :rows="3"
            :cols="100"
            type="textarea"
            v-model="formInline.cooperation_rules"
          ></el-input>
        </el-form-item> -->
        <!-- 提交返回 -->
        <div class="btn-box">
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">保存楼盘信息</el-button>
            <el-button @click="goBack">返回楼盘列表</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import VDistpicker from "v-distpicker";

export default {
  data() {
    return {
      // 提交内容表单
      formInline: {
        // 楼盘信息
        city_name: "",
        district_name: "",
        province_name: "",
        province_id: "",
        build_status_name: "",
        city_id: "",
        district_id: "",
        project_name: "",
        project_pinyin: "",
        area: "",
        plate: "",
        build_address: "",
        map_lat: "",
        map_lng: "",
        lou_radio: [],
        attributes: "",
        lou_tel: "",
        sales_address: "",
        lou_price: "",
        price_info: "",
        property_costs: "",
        property_company: "",
        area_interval: "",
        buy_discount: "",
        developer: "",
        license: "",
        decoration: [],
        floor: [],
        lou_feature: [],
        // 建筑数据
        total_area: "",
        footprint: "",
        total_houses: "",
        greening_rate: "",
        volume_rate: "",
        car_space: "",
        houses_property: "",
        open_time: "",
        complete_time: "",
        // 楼盘报备
        // 独立经纪人
        // independent_floor_commission: "",
        // independent_visit_reward: "",
        // independent_commission_rules: "",
        // 门店经纪人
        // store_floor_commission: "",
        // store_visit_reward: "",
        // store_commission_rules: "",
        // default_commission_rules: "",
        selling_point: "",
        // cooperation_rules: "",
        img: ""
        // 上传的图片数组
      },
      // 楼盘类型数组
      lou_list: [
        { id: 1, type: "高层" },
        { id: 2, type: "写字楼" },
        { id: 3, type: "洋房" },
        { id: 4, type: "别墅" },
        { id: 5, type: "商业" }
      ],
      // 装修类型数组
      decorationlist: [
        { id: 1, type: "毛坯" },
        { id: 2, type: "简装" },
        { id: 3, type: "精修" },
        { id: 4, type: "豪华装修" }
      ],
      // 楼层类型数组
      floorlist: [
        { id: 1, type: "低层" },
        { id: 2, type: "多层" },
        { id: 3, type: "小高层" },
        { id: 4, type: "高层" },
        { id: 5, type: "超高层" }
      ],
      // 楼盘特色类型数组
      lou_feature_lsit: [
        { id: 1, type: "别墅洋房" },
        { id: 2, type: "经济住宅" }
      ],
      // 区域选择列表数组
      arealist: [{ name: "枣庄", id: 1 }],
      // 板块选择列表数组
      platelist: [{ name: "滕州", id: 2 }],
      // 楼盘属性列表数组
      attributes: [
        { name: "到期房卡", id: 1 },
        { name: "期房顺销", id: 2 },
        { name: "现房销售", id: 3 },
        { name: "即将清盘", id: 4 }
      ],
      // 输入框规则
      rules: {
        project_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        project_pinyin: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择内容", trigger: "change" }],
        plate: [{ required: true, message: "请选择内容", trigger: "change" }],
        map_lat: [{ required: true, message: "请输入内容", trigger: "blur" }],
        map_lng: [{ required: true, message: "请输入内容", trigger: "blur" }],
        lou_tel: [{ required: true, trigger: "blur", message: "请输入内容" }],
        sales_address: []
      },
      // 上传的内容
      dialogImageUrl: "",
      dialogVisible: false,
      lou_id: null,
      city_list: []
    };
  },
  components: {
    VDistpicker
  },
  mounted() {
    this.lou_id = this.$route.query.id;
    this.getQueryList();
    this.getAttrList();
    this.getCity();
  },
  computed: {
    // 获取请求头
    myHeader() {
      return {
        Authorization: "Bearer " + window.localStorage.getItem("TOKEN")
      };
    }
  },
  methods: {
    // 获取楼盘展示信息
    getQueryList() {
      this.$http.getQueryBuildList(this.lou_id).then(res => {
        if (res.status === 200) {
          this.formInline.map_lat = res.data.build_location_long;
          this.formInline.map_lng = res.data.build_location_lat;
          this.formInline.img = res.data.img;
          this.formInline.project_name = res.data.name;
          this.formInline.build_address = res.data.build_address;
          this.formInline.lou_tel = res.data.sales_office_phone;
          this.formInline.attributes = res.data.build_status;
          this.formInline.lou_price = res.data.build_avg_price;
          this.formInline.price_info = res.data.price_description;
          this.formInline.sales_address = res.data.full_sales_office_address;
          this.formInline.complete_time = res.data.completion_house_time;
          this.formInline.open_time = res.data.newest_opening_time;
          this.formInline.selling_point = res.data.build_selling_points;
          this.formInline.city_name = res.data.city_name;
          this.formInline.district_name = res.data.district_name;
          this.formInline.province_name = res.data.province_name;
          this.formInline.lou_radio = res.data.build_category.split(",");
          this.formInline.lou_radio = this.formInline.lou_radio.map(Number);
        }
      });
    },
    // 获取物业展示信息
    getAttrList() {
      this.$http.getQueryAttrList(this.lou_id).then(res => {
        if (res.status === 200) {
          this.formInline.property_costs = res.data.real_estate_price;
          this.formInline.property_company = res.data.real_estate_company;
          this.formInline.area_interval = res.data.area_space;
          this.formInline.buy_discount = res.data.buy_coupon;
          this.formInline.developer = res.data.developers_company_name;
          this.formInline.license = res.data.sales_license;
          //
          this.formInline.floor = res.data.floor_category.split(",");
          this.formInline.floor = this.formInline.floor.map(Number);
          this.formInline.lou_feature = res.data.build_feature.split(",");
          this.formInline.lou_feature = this.formInline.lou_feature.map(Number);
          this.formInline.decoration = res.data.decoration_category.split(",");
          this.formInline.decoration = this.formInline.decoration.map(Number);
          //
          this.formInline.total_area = res.data.total_build_area;
          this.formInline.footprint = res.data.land_occupancy_area;
          this.formInline.total_houses = res.data.total_land_occupancy;
          this.formInline.greening_rate = res.data.greening_rate;
          this.formInline.volume_rate = res.data.plot_ratio;
          this.formInline.car_space = res.data.plot_ratio;
          this.formInline.houses_property = res.data.property_right_years;
        }
      });
    },
    // 获取城市
    getCity() {
      this.$http.getCity().then(res => {
        this.city_list = res.data;
      });
    },
    // 城市选择
    onSelected(data) {
      console.log(data);
      this.formInline.province_id = data.province.code;
      this.formInline.city_id = data.city.code;
      this.formInline.district_id = data.area.code;
      var city_obj = this.city_list.find(item => {
        return item.code === this.formInline.city_id;
      });
      var province_obj = this.city_list.find(item => {
        return item.code === this.formInline.province_id;
      });
      var district_obj = this.city_list.find(item => {
        return item.code === this.formInline.district_id;
      });
      this.formInline.province_id = province_obj.id;
      this.formInline.city_id = city_obj.id;
      this.formInline.district_id = district_obj.id;
    },
    // 上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.response.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      this.formInline.img = response.url;
      console.log(this.formInline.img);
    },
    // :http-request="uploadFile"
    // 提交
    onSubmit() {
      if (
        !this.formInline.project_name ||
        !this.formInline.map_lat ||
        !this.formInline.map_lng ||
        !this.formInline.lou_tel
      ) {
        this.$message({
          message: "请输入必填字段",
          type: "error"
        });
      } else {
        this.$http
          .updateBuild({
            build: {
              id: this.lou_id,
              province_id: this.formInline.province_id,
              city_id: this.formInline.city_id,
              district_id: this.formInline.district_id,
              full_build_address: this.formInline.build_address,
              full_sales_office_address: this.formInline.sales_address,
              build_status: this.formInline.attributes,
              sales_office_phone_ext_num: this.formInline.lou_tel,
              name: this.formInline.project_name,
              build_address: this.formInline.build_address,
              sales_office_address: this.formInline.sales_address,
              build_location_long: this.formInline.map_lng,
              build_location_lat: this.formInline.map_lat,
              build_category: this.formInline.lou_radio,
              sales_office_phone: this.formInline.lou_tel,
              build_avg_price: this.formInline.lou_price,
              price_description: this.formInline.price_info,
              newest_opening_time: this.formInline.open_time,
              completion_house_time: this.formInline.complete_time,
              build_selling_points: this.formInline.selling_point,
              img: this.formInline.img
            },
            build_attr: {
              build_id: this.lou_id,
              real_estate_price: this.formInline.property_costs,
              real_estate_company: this.formInline.property_company,
              area_space: this.formInline.area_interval,
              buy_coupon: this.formInline.buy_discount,
              developers_company_name: this.formInline.developer,
              sales_license: this.formInline.license,
              decoration_category: this.formInline.decoration,
              floor_category: this.formInline.floor,
              build_feature: this.formInline.lou_feature,
              total_build_area: this.formInline.total_area,
              land_occupancy_area: this.formInline.footprint,
              total_land_occupancy: this.formInline.total_houses,
              greening_rate: this.formInline.greening_rate,
              plot_ratio: this.formInline.volume_rate,
              total_parking_space: this.formInline.car_space,
              property_right_years: this.formInline.houses_property
            }
          })
          .then(res => {
            console.log(res.status);
            if (res.status === 200) {
              this.$message({
                message: "修改内容成功",
                type: "success"
              });
              this.$router.push("/property_list");
            } else {
              this.$message({
                message: "请输入正确内容",
                type: "error"
              });
            }
          });
      }
    },

    // 返回楼盘列表
    goBack() {
      this.$router.push("/property_list");
    }
  }
};
</script>

<style lang="scss" scoped>
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
  margin-top: 100px;
  .title {
    margin: 10px 0;
    padding-left: 5px;
    text-align: left;
    color: #2589ff;
    background: #2589ff14;
  }
  .el-input {
    width: 300px;
  }
  .lou-type {
    margin: 20px 0;
    .lou-type-s {
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      padding: 0 12px 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
  .tips-box {
    margin: 10px 0;
    justify-content: flex-start;
    .tips-left {
      color: #2589ff;
    }
    .tips-right {
      margin-left: 20px;
      color: rgb(153, 153, 153);
    }
  }
}
</style>
