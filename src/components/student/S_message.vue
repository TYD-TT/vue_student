<template>
  <div class="S_message">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 顶部选项框 -->
    <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
      <el-form-item label="级别">
        <el-select v-model="formInline.level" placeholder="请选择年级">
          <el-option label="17" value="17"></el-option>
          <el-option label="18" value="18"></el-option>
          <el-option label="19" value="19"></el-option>
          <el-option label="20" value="20"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="院系">
        <el-select
          v-model="formInline.department"
          placeholder="请选择院系"
          @change="btn(formInline.department)"
        >
          <el-option v-for="(value, index) in deps" :key="index" :label="value" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="formInline.major" placeholder="请选择专业">
          <el-option v-for="(value, index) in majs" :key="index" :label="value" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectStudent('formInline')">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="dialogFormVisible = true">添加学生</el-button>
      </el-form-item>
    </el-form>

    <el-card>
      <!-- 显示搜索内容区域 -->
      <el-table
        :data="
          studentlist.slice(
            (queryInfo.pagenum - 1) * queryInfo.pagesize,
            queryInfo.pagenum * queryInfo.pagesize
          )
        "
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column prop="Snu" label="学号" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="department" label="院系" align="center"></el-table-column>
        <el-table-column prop="major" label="专业" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column label="编辑" align="center">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑信息" placement="top">
              <el-button type="primary" title="编辑" size="medium" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除信息" placement="top">
              <el-button type="danger" title="删除" size="medium" icon="el-icon-delete"></el-button>
            </el-tooltip>
          </el-button-group>
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
    <!-- 添加学生按钮会话框 -->
    <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
      <el-form :model="addStu">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addStu.name" autocomplete="off" class="addName"></el-input>
        </el-form-item>
        <el-form-item label="院系">
          <el-select
            v-model="addStu.department"
            placeholder="请选择院系"
            @change="btn(addStu.department)"
          >
            <el-option v-for="(value, key) in deps" :key="key" :label="value" :value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="addStu.major" placeholder="请选择专业">
            <el-option
              v-for="(value, key) in majs"
              :key="key"
              :label="value"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        level: "",
        department: "",
        major: ""
      },
      // 分页
      queryInfo: {
        quwey: "",
        pagenum: 1,
        pagesize: 5
      },
      // 总数据条数
      total: 0,
      // 获取学生列表
      studentlist: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      addStu: {
        Snu: "",
        name: "",
        password: "",
        department: "",
        major: "",
        age: "",
        Sex: "",
        phone: "",
        creation_time: Date()
      },
      formLabelWidth: "40px",
      // 所有可选择院系
      deps: [],
      // 记录下标
      depsKey: 0,
      // 院系对应的专业
      majs: [],
      // 所有专业
      majorList: []
    };
  },
  created() {
    this.selectdepartment();
    this.selectmajorList();
  },
  methods: {
    // 查询所有的院系
    async selectdepartment() {
      const { data: res } = await this.$http.get("department");
      for (let index = 0; index < res.length; index++) {
        this.deps[index] = res[index].department;
      }
    },
    // 根据条件查询学生列表
    selectStudent() {
      this.$refs.formInline.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "information",
          this.formInline
        );
        if (res.meta.status == 204) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        this.studentlist = res.data;
        console.log(this.studentlist);
        this.total = res.count;
      });
    },
    // 根据院系查询专业
    async selectmajor() {
      this.majs = [];
      const { data: res } = await this.$http.post("major", {
        depnum: this.depsKey + 1
      });
      for (let index = 0; index < res.length; index++) {
        this.majs[index] = res[index].major;
      }
      return this.majs;
    },
    // 查询所有的专业
    async selectmajorList() {
      const { data: res } = await this.$http.get("major");
      this.majorList = res;
    },
    // 监听院系选择框
    btn(value) {
      this.majs = [];
      for (let index = 0; index < this.deps.length; index++) {
        if (this.deps[index] == value) {
          this.depsKey = index;
          var tem = 0;
          for (let j = 0; j < this.majorList.length; j++) {
            if (this.majorList[j].depnum == this.depsKey + 1) {
              this.majs[tem++] = this.majorList[j].major;
            }
          }
        }
      }
    },
    // 分页切换
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
    }
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
