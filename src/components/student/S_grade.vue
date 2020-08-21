<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查看成绩</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="gradeForm" :model="gradeForm" label-width="40px" :inline="true">
      <el-form-item label="学年">
        <el-select v-model="gradeForm.year" placeholder="请选择学年">
          <el-option v-for="(item, key) in stuYear" :key="key" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="院系">
        <el-select v-model="gradeForm.dep" disabled placeholder="院系">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="gradeForm.major" disabled placeholder="专业">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-radio v-model="gradeForm.semester" label="1">第一学期</el-radio>
        <el-radio v-model="gradeForm.semester" label="2">第二学期</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="viewGrade()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-table :data="tableData" stripe style="width: 800">
        <el-table-column type="index" label="#" width="120"></el-table-column>
        <el-table-column prop="coursename" label="课程名称" width="180"></el-table-column>
        <el-table-column prop="name" label="授课老师" width="120"></el-table-column>
        <el-table-column prop="grade" label="分数" width="120"></el-table-column>
        <el-table-column prop="credit" label="学分 " width="120"></el-table-column>
        <el-table-column prop="receiveCredit" label="获得学分" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // 顶部搜索框绑定内容
      gradeForm: {
        year: "",
        dep: "",
        major: "",
        semester: "1"
      },
      // 学年
      stuYear: []
    };
  },
  created() {
    this.schoolYear();
    this.selectStudent();
  },
  methods: {
    // 查询成绩
    viewGrade() {
      const snu = localStorage.getItem("username");
      this.gradeForm.Snu = snu;
      this.$refs.gradeForm.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "S_viewGrade",
          this.gradeForm
        );
        this.tableData = res;
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].grade);
          if (res[i].grade < 60) {
            this.tableData[i].receiveCredit = "0.0";
          } else {
            this.tableData[i].receiveCredit = res[i].credit;
          }
        }
      });
    },
    // 计算学年
    schoolYear() {
      let year = new Date().getFullYear();
      for (let i = 0; i < 4; i++) {
        this.stuYear[i] = year - i + "-" + (year - (i - 1));
      }
    },
    // 根绝学号查询信息
    async selectStudent() {
      const snu = localStorage.getItem("username");
      const { data: res } = await this.$http.get("editStu", {
        params: { Snu: snu }
      });
      this.gradeForm.dep = res.data.department;
      this.gradeForm.major = res.data.major;
      this.gradeForm.level = res.data.level;
    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
}
</style>
