<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生成绩</el-breadcrumb-item>
      <el-breadcrumb-item>查看成绩</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="年级">
          <el-select v-model="formInline.level" placeholder="请选择年级">
            <el-option :label="this.date" :value="this.date"></el-option>
            <el-option :label="this.date - 1" :value="this.date - 1"></el-option>
            <el-option :label="this.date - 2" :value="this.date - 2"></el-option>
            <el-option :label="this.date - 3" :value="this.date - 3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectStudent()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="gradeTableData" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="Snu" label="学号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="coursename" label="课程"></el-table-column>
        <el-table-column prop="grade" label="成绩"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        level: ""
      },
      // 年级
      date: new Date().getFullYear(),
      gradeTableData: []
    };
  },

  methods: {
    selectStudent() {
      console.log(this.formInline);
      this.$refs.formInline.validate(async valid => {
        if (!valid) {
          return;
        }
        const tnu = localStorage.getItem("username");
        this.formInline.Tnu = tnu;
        const { data: res } = await this.$http.post(
          "view_grade",
          this.formInline
        );
        this.gradeTableData = res;
        console.log(res);
      });
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
