<template>
  <div class="S_message">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师信息</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>基本信息</el-breadcrumb-item> -->
    </el-breadcrumb>
    <!-- 顶部选项框 -->
    <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
      <el-form-item label="院系">
        <el-select v-model="formInline.department" placeholder="请选择院系">
          <el-option v-for="(value, index) in deps" :key="index" :label="value" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectTeacher('formInline')">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="dialogFormVisible = true">添加教师</el-button>
      </el-form-item>
    </el-form>

    <el-card>
      <!-- 显示搜索内容区域 -->
      <el-table
        :data="
          Teacherlist.slice(
            (queryInfo.pagenum - 1) * queryInfo.pagesize,
            queryInfo.pagenum * queryInfo.pagesize
          )
        "
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column prop="Tnu" label="教工号" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="department" label="院系" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column label="编辑" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑信息" placement="top">
              <el-button
                type="primary"
                title="编辑"
                size="medium"
                icon="el-icon-edit"
                @click="showEditDialog(scope.row.Tnu)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除信息" placement="top">
              <el-button
                type="danger"
                title="删除"
                size="medium"
                icon="el-icon-delete"
                @click="removeUserByTnu(scope.row.Tnu)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加教师按钮会话框 -->
    <el-dialog title="添加教师" :visible.sync="dialogFormVisible" width="330px" top="20px">
      <el-form
        :model="addTea"
        :rules="rules"
        label-position="right"
        label-width="65px"
        ref="addTea"
      >
        <!-- 教工号 -->
        <el-form-item label="教工号" prop="Tnu">
          <el-input v-model="addTea.Tnu" autocomplete="off" class="addName" placeholder="请输入教工号"></el-input>
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addTea.name" autocomplete="off" class="addName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <!-- 院系 -->
        <el-form-item label="院系" prop="department">
          <el-select v-model="addTea.department" placeholder="请选择院系">
            <el-option v-for="(value, key) in deps" :key="key" :label="value" :value="value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="Sex">
          <el-select v-model="addTea.Sex" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addTea.age" placeholder="年龄" autocomplete="off" class="addName"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addTea.phone" placeholder="手机号" autocomplete="off" class="addName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="创建时间">
          <el-input :model="addTea.creation_time | dataFormat" v-model="addTea.creation_time"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacher()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改教师信息对话框 -->
    <el-dialog
      title="修改教师信息"
      :visible.sync="editTeacherVisible"
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
        <el-form-item label="院系" prop="department">
          <el-select v-model="editTea.department" placeholder="请选择院系">
            <el-option v-for="(value, key) in deps" :key="key" :label="value" :value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editTea.phone" class="addName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTeacherVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogConfirm()">确 定</el-button>
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
    return {
      formInline: {
        department: ""
      },
      // 分页
      queryInfo: {
        quwey: "",
        pagenum: 1,
        pagesize: 5
      },
      // 总数据条数
      total: 0,
      // 获取教师列表
      Teacherlist: [],
      // 添加教师对话框
      dialogFormVisible: false,
      // 修改教师信息对话框
      editTeacherVisible: false,
      addTea: {
        Tnu: "",
        name: "",
        password: "888888",
        department: "",
        age: "",
        Sex: "",
        phone: "",
        creation_time: ""
      },
      formLabelWidth: "40px",
      // 所有可选择院系
      deps: [
        "机械工程学院",
        "电子信息与电气工程学院 ",
        "计算机科学与信息工程学院 ",
        "土木与建筑工程学院 ",
        "化学与环境工程学院 ",
        "生物与食品工程学院",
        "数理学院",
        "飞行学院",
        "经济管理学院",
        "文法学院",
        "外国语学院",
        "艺术设计学院",
        "国际教育学院"
      ],
      // 修改教师信息表单
      editTea: {},
      // 添加教师表单校验
      rules: {
        Tnu: [
          { required: true, message: "请输入教工号", trigger: "blur" },
          {
            require: true,
            min: 10,
            max: 10,
            message: "教工号长度为10位",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        department: [
          { required: true, message: "请选择院系", trigger: "blur" }
        ],
        Sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phone: [{ validator: checkphone, required: true, trigger: "blur" }]
      }
    };
  },
  created() {
    this.selectdepartment();
  },
  methods: {
    //检查手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    // 查询所有的院系
    async selectdepartment() {
      const { data: res } = await this.$http.get("department");
      for (let index = 0; index < res.length; index++) {
        this.deps[index] = res[index].department;
      }
      this.Teacherlist.dep = this.deps;
    },
    // 根据条件查询教师列表
    selectTeacher() {
      this.$refs.formInline.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "teacher_message",
          this.formInline
        );
        if (res.meta.status != 201) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        this.Teacherlist = res.data;
        this.total = res.count;
      });
    },
    // 分页切换
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
    },
    // 添加教师
    addTeacher() {
      this.addTea.creation_time = this.datatime();
      this.$refs.addTea.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post("addTea", this.addTea);
        if (res.meta.status != 201) {
          return this.$message.error("添加失败,该教工号已存在");
        }
        this.$message.success(res.meta.msg);
        this.dialogFormVisible = false;
        this.selectTeacher();
        this.addTea = {};
      });
    },
    // 修改信息按钮
    async showEditDialog(Tnu) {
      // console.log(typeof this.editTea);
      this.editTeacherVisible = true;
      const { data: res } = await this.$http.get("/editTea", {
        params: { Tnu: Tnu }
      });
      this.editTea = res.data;
    },
    // 编辑教师信息对话框右上角的关闭按钮
    editDialogClosed() {
      this.$refs.editTea.resetFields();
    },
    // 修改教师信息确定提交
    editDialogConfirm() {
      this.$refs.editTea.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "editTeacher",
          this.editTea
        );
        if (res.meta.status != 201) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        this.editTeacherVisible = false;
        this.selectTeacher();
      });
    },
    // 根据教工号删除教师
    async removeUserByTnu(Tnu) {
      // 询问是否确定删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // 如果用户点击确定，则返回字符串confirm
      // 如果用户点击确定，则返回字符串cancel
      console.log(confirmResult);
      if (confirmResult !== "confirm") {
        return this.$message.error("已取消删除");
      }
      const { data: res } = await this.$http.delete("editStudent/" + Tnu);
      if (res.meta.status == 201) {
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败");
      }
      // 刷新数据列表
      this.selectTeacher();
    },
    // 时间过滤器
    datatime() {
      const dt = new Date();
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + 1 + "").padStart(2, "0");

      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
    // 修改创建时间
    // editDateTime() {
    //   this.addTea.creation_time = this.datatime();
    // }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 15px;
}
.addName {
  width: 223px;
}
</style>
