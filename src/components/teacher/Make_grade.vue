<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生成绩</el-breadcrumb-item>
      <el-breadcrumb-item>评判成绩</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" stripe style="width: 650px">
      <el-table-column prop="Snu" label="学号" width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="grade" label="成绩/更改成绩再次输入即可" width="200" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.grade"
            @change="getNum(scope.row)"
            placeholder="请输入成绩"
            class="input-width"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.select_student();
  },
  methods: {
    async getNum(value) {
      const tnu = localStorage.getItem("username");
      value.Tnu = tnu;
      const { data: res } = await this.$http.put("make_grade", value);
      if (res.meta.status != 201) {
        return this.$message.error(res.meta.msg);
      }
      return this.$message.success(res.meta.msg);
    },
    async select_student() {
      const tnu = localStorage.getItem("username");
      const { data: res } = await this.$http.get("make_gradeList/" + tnu, {
        Tnu: tnu
      });
      this.tableData = res;
    }
  }
};
</script>

<style lang="less" scoped>
.input-width {
  width: 120px;
}
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
}
</style>
