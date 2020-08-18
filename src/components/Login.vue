<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt srcset />
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-radio-group v-model="ruleForm.radio">
            <el-radio :label="0">学生</el-radio>
            <el-radio :label="1">老师</el-radio>
            <el-radio :label="2">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "ay20171001",
        password: "888888",
        radio: 1
      },
      rules: {
        username: [
          { required: true, message: "请输入学号/教工号", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [{ validator: validatePass, required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 登录按钮
    login() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post("login", this.ruleForm);
        console.log(res);
        if (res.meta.status !== 201) {
          return this.$message.error("登陆失败,账号或密码错误");
        }
        this.$message.success("登录成功");
        switch (this.ruleForm.radio) {
          case 0:
            this.$router.push("/student");
            break;
          case 1:
            this.$router.push("/teacher");
            break;
          case 2:
            this.$router.push("/admin");
            break;
        }
        console.log(this.ruleForm.radio);
        // 将用户名保存到localStorage
        localStorage.setItem("username", this.ruleForm.username);
        localStorage.setItem("pwd", this.ruleForm.password);
      });
    }
  }
};
</script>

// scopd是规定改css样式只在该组件中有效
<style lang="less" scoped>
.login {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  min-width: 450px;
  max-width: 360px;
  height: 340px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_box > .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.login_box > .avatar_box > img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}

.password {
  margin-bottom: 5px;
}

.hint {
  font-size: 12px;
  margin: 20px 0px 22px 50px;
}

.btns {
  display: flex;
  justify-content: center;
}

.demo-ruleForm {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 80px 0 20px;
  box-sizing: border-box;
}
</style>
