<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less" scope>
.el-button--mini {
  padding: 5px 10px !important;
}

.el-form-item__error {
  margin-left: 55px;
}
</style>
