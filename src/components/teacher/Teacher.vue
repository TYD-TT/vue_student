<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../../assets/logo.png" class="logo" />
        <span>学生管理系统</span>
      </div>
      <div class="right">
        <div class="welCome">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <el-tag type="info" effect="dark" v-model="username">欢迎：{{ this.username }}</el-tag>
        </div>
        <el-button type="info" @click="tuichu" size="small">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 侧边栏的折叠和展开 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 左侧菜单栏 -->
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          background-color="#373d41"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-custom"></i>
            <span slot="title">
              <router-link :to="'/teacher/t_message'">基本信息</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link :to="'/teacher/s_message'">学生信息</router-link>
            </span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title" style="color:#fff">学生成绩</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-postcard"></i>
                <router-link :to="'/teacher/view_grade'">查看成绩</router-link>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/teacher/s_course">
                <i class="el-icon-trophy"></i>
                <router-link :to="'/teacher/make_grade'">评判成绩</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link :to="'/teacher/t_timetable'">课程表</router-link>
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      isCollapse: false,
      // 记录登录教师的学号
      username: ""
    };
  },
  created() {
    this.userName();
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 点击按钮实现侧边栏的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    userName() {
      const username = localStorage.getItem("username");
      this.username = username;
    },
    tuichu() {
      localStorage.removeItem("username");
      localStorage.removeItem("pwd");
      this.logout();
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  color: white;
  width: 200px;
  min-height: 400px;
}
.el-menu-item {
  color: #fff;
}
.el-submenu > span {
  color: #fff;
}
.home-container {
  height: 100%;
}
.logo {
  border-radius: 50%;
  margin-left: 69px;
  width: 60px;
  height: 60px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
a {
  color: white;
  text-decoration: none;
}
.welCome {
  display: flex;
  margin-right: 20px;
}
.welCome > .el-tag {
  margin-top: 5px;
}
</style>
