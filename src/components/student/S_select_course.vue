<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>选课信息</el-breadcrumb-item>
      <el-breadcrumb-item>选课</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="courseForm" :model="courseForm" label-width="40px" :inline="true">
      <el-form-item label="学年">
        <el-select v-model="courseForm.year" placeholder="请选择学年">
          <el-option v-for="(item, key) in stuYear" :key="key" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="院系">
        <el-select v-model="courseForm.dep" disabled placeholder="院系">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="courseForm.major" disabled placeholder="专业">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-radio v-model="courseForm.semester" label="1">第一学期</el-radio>
        <el-radio v-model="courseForm.semester" label="2">第二学期</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="selectCourse()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="课程编号" width="120"></el-table-column>
        <el-table-column prop="coursename" label="课程名称" width="180"></el-table-column>
        <el-table-column prop="name" label="授课老师" width="120"></el-table-column>
        <el-table-column prop="schooltime" label="上课时间" width="180"></el-table-column>
        <el-table-column prop="address" label="上课地址" width="120"></el-table-column>
        <el-table-column prop="max" label="限选" width="90"></el-table-column>
        <el-table-column prop="name" label="已选" width="90"></el-table-column>
        <el-table-column label="选课" width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="提交" placement="top">
              <el-button
                type="primary"
                title="提交"
                size="small"
                icon="el-icon-upload"
                @click="courseSelect(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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
      courseForm: {
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
    selectCourse() {
      this.$refs.courseForm.validate(async valid => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post(
          "course_select",
          this.courseForm
        );
        this.tableData = res;
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
      this.courseForm.dep = res.data.department;
      this.courseForm.major = res.data.major;
      this.courseForm.level = res.data.level;
    },
    // 提交选择的课程
    async courseSelect(id) {
      const snu = localStorage.getItem("username");
      const { data: res } = await this.$http.put("course_select/" + id, {
        Snu: snu,
        id: id
      });
      if (res.meta.status !== 201) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
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
