<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar-box">
        <img src="../../assets/logo.png" alt="avatar" />
      </div>

      <!-- 登录表单 -->
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            prefix-icon="el-icon-user"
            maxlength="11"
            placeholder="请输入登录账号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            minlength="6"
            maxlength="15"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click.prevent="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripScript, validatePhone, validatePass } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    // 验证账号
    var validateAccount = (rule, value, callback) => {
      value = this.loginForm.account = stripScript(value); // 过滤特殊字符
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (!validatePhone(value)) {
        callback(new Error("账号格式错误"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      value = this.loginForm.password = stripScript(value); // 过滤特殊字符
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePass(value)) {
        callback(
          new Error("密码为大写字母、小写字母、数字组合，长度6-15个字符")
        );
      } else {
        callback();
      }
    };

    return {
      // 表单的数据绑定对象
      loginForm: {
        account: "",
        password: ""
      },
      // 表单的验证规则对象
      loginFormRules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginForm.resetFields();
    },
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return ;
        const {
          data,
          status: statusCode
        } = await this.$http.post("api/auth/login", this.loginForm);

        if (statusCode !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");

        window.sessionStorage.setItem(
          "token",
          data.token.access_token
        );

        this.$router.push("/dashboard");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
