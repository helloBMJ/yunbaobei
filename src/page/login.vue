<template>
  <div class="login-container">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">腾房云报备</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm2.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          type="text"
          v-model="ruleForm2.captcha"
          auto-complete="off"
          placeholder="验证码"
        ></el-input>
        <div></div>
      </el-form-item>
      <!-- <valid-code :value.sync="validCode"></valid-code> -->
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from "axios";
// import validCode from "@/components/validCode";

//先引入登录接口
export default {
  data() {
    return {
      //登录状态
      isLogin: false,
      // 加载状态
      logining: false,
      ruleForm2: {
        // 测试账号
        username: "",
        // 测试密码
        password: "",
        captcha: ""
      },
      rules2: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      checked: false
    };
  },
  mounted() {
    this.getCode();
  },
  components: {
    // validCode
  },
  methods: {
    // 获取验证码
    getCode() {
      this.$http.getLoginCode({}, res => {});
    },
    handleSubmit(event) {
      this.getCode();
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          if (
            // 测试账号
            this.ruleForm2.username === "" ||
            // 测试密码
            this.ruleForm2.password === ""
          ) {
            this.logining = false;
            this.$alert("用户名或密码输入错误", "警告", {
              confirmButtonText: "ok"
            });
            this.isLogin = false;
          } else {
            // let token = "Bearer " + localStorage.getItem("TOKEN");
            this.$http
              .login({
                user_name: this.ruleForm2.username,
                password: this.ruleForm2.password,
                captcha: this.ruleForm2.captcha
              })
              .then(res => {
                localStorage.setItem("TOKEN", res.data.token);
                localStorage.setItem("user_name", this.ruleForm2.username);
                this.$message({
                  message: "登录成功！",
                  type: "success"
                });
                this.isLogin = true;
                this.$emit("click", this.isLogin);
                this.$router.push("/index");
              });
            this.logining = false;
            // this.$router.push({ path: "/home" });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  .title {
    margin-bottom: 30px;
  }
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
