<template>
  <div class="teadent_message">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teadent' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="teaMsg" style="width: 100%">
        <!-- <el-table-column type="index" label="#" align="center"></el-table-column> -->
        <el-table-column prop="name" align="center" label="姓名"></el-table-column>
        <el-table-column prop="Tnu" align="center" label="学号"></el-table-column>
        <el-table-column prop="department" align="center" label="院系" width="190px"></el-table-column>
        <el-table-column prop="phone" align="center" label="手机号"></el-table-column>
        <el-table-column label="编辑" align="center">
          <el-tooltip class="item" effect="dark" content="修改信息" placement="top">
            <el-button
              type="primary"
              title="编辑"
              size="medium"
              icon="el-icon-edit"
              @click="showEditDialog()"
            ></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="修改密码" placement="top">
            <el-button
              type="primary"
              title="修改密码"
              size="medium"
              icon="el-icon-setting"
              @click="changePwd()"
            ></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改学生信息对话框 -->
    <el-dialog
      title="修改学生信息"
      :visible.sync="editTeadentVisible"
      width="330px"
      top="20px"
      @close="editDialogClosed"
    >
      <el-form
        :model="editTea"
        ref="editTea"
        :rules="rules"
        label-position="right"
        label-width="65px"
      >
        <el-form-item label="教工号">
          <el-input v-model="editTea.Tnu" autocomplete="off" disabled class="addName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editTea.name" autocomplete="off" class="addName"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="department">
          <el-input v-model="editTea.department" autocomplete="off" class="addName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editTea.phone" class="addName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTeadentVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="pwdDialogVisible" width="330px" top="20px">
      <el-form
        :model="pwdForm"
        ref="pwdForm"
        :rules="rules"
        label-position="right"
        label-width="65px"
      >
        <el-form-item label="原密码" prop="oldpass">
          <el-input
            type="password"
            v-model="pwdForm.oldpass"
            autocomplete="off"
            @change="changepass()"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input type="password" v-model="pwdForm.newpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input type="password" v-model="pwdForm.checkpass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // zi定义手机号校验规则
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwdForm.checkpass !== "") {
          this.$refs.pwdForm.validateField("checkpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      teaMsg: [],
      // 修改学生信息表单
      editTea: {},
      // 修改密码表单
      pwdForm: {
        num: "",
        oldpass: "",
        newpass: "",
        checkpass: ""
      },
      // 表单校验
      rules: {
        level: [{ required: true, message: "请输入年级", trigger: "blur" }],
        Tnu: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            require: true,
            min: 11,
            max: 11,
            message: "学号长度为13位",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        department: [
          { required: true, message: "请选择院系", trigger: "blur" }
        ],
        major: [{ required: true, message: "请选择专业", trigger: "blur" }],
        phone: [{ validator: checkphone, required: true, trigger: "blur" }],
        oldpass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newpass: [{ validator: validatePass, required: true, trigger: "blur" }],
        checkpass: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      },
      // 隐藏修改信息对话框
      editTeadentVisible: false,
      // 隐藏修改密码对话框
      pwdDialogVisible: false
    };
  },
  created() {
    this.selectTeadent();
  },
  methods: {
    async selectTeadent() {
      const tnu = localStorage.getItem("username");
      const { data: res } = await this.$http.get("editTea", {
        params: { Tnu: tnu }
      });
      this.teaMsg = [res.data];
      this.editTea = res.data;
    },
    // 修改信息按钮
    showEditDialog() {
      this.editTeadentVisible = true;
    },
    //检查手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    // 编辑学生信息对话框右上角的关闭按钮
    editDialogClosed() {
      this.$refs.editTea.resetFields();
      // this.$refs.pwdForm.resetFields();
    },
    editDialogConfirm() {
      this.$refs.editTea.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "editMsgById",
          this.editTea
        );
        if (res.meta.status == 201) {
          this.$message.success(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        this.editTeadentVisible = false;
        this.selectTeadent();
      });
    },
    changePwd() {
      this.pwdDialogVisible = true;
    },
    // 验证原密码
    changepass() {
      const pass = localStorage.getItem("pwd");
      if (this.pwdForm.oldpass !== pass) {
        return this.$message.error("原密码错误");
      }
    },
    // 确认修改密码
    changePassword() {
      this.pwdForm.num = localStorage.getItem("username");
      this.$refs.pwdForm.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "changeTeapwd",
          this.pwdForm
        );
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        localStorage.removeItem("username");
        localStorage.removeItem("pwd");
        this.logout();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 45px;
  line-height: 45px;
}
.addName {
  width: 223px;
}
</style>
