<template>
  <div class="welcome">
    <el-row :gutter="10">
      <el-col :span="24">
        <h1>欢迎使用学生管理系统</h1>
      </el-col>
    </el-row>
    <div class="rili">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-calendar :first-day-of-week="star" v-model="value"></el-calendar>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      star: 7
    };
  }
};
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}
.rili {
  width: 300px;
}
</style>