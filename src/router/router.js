import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../components/Login.vue";
const Login = () =>
  import(
    /* webpackChunkName: "login_home_welcome" */ "../components/Login.vue"
  );
import Register from "../components/Register.vue";
// 学生功能
const Student = () => import("../components/student/Student.vue");
const s_message = () => import("../components/student/s_message.vue");
const S_grade = () => import("../components/student/S_grade.vue");
const S_course = () => import("../components/student/S_course.vue");
const S_select_course = () =>
  import("../components/student/S_select_course.vue");
const S_timetable = () => import("../components/student/S_timetable.vue");
// 管理员功能
const Admin = () => import("../components/admin/Admin.vue");
const S_message = () => import("../components/admin/S_message.vue");
const T_message = () => import("../components/admin/T_message.vue");

// 教师功能
const Teacher = () => import("../components/teacher/Teacher.vue");
const t_message = () => import("../components/teacher/t_message.vue");

// 通用功能
const Welcome = () => import("../components/Welcome.vue");

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", redirect: "/Login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    {
      path: "/student",
      component: Student,
      redirect: "/welcome",
      children: [
        { path: "/welcome", component: Welcome },
        { path: "/student/s_message", component: s_message },
        { path: "/student/s_course", component: S_course },
        { path: "/student/s_grade", component: S_grade },
        { path: "/student/s_select_course", component: S_select_course },
        { path: "/student/s_timetable", component: S_timetable }
      ]
    },
    {
      path: "/admin",
      component: Admin,
      redirect: "/admin/welcome",
      children: [
        { path: "/admin/welcome", component: Welcome },
        { path: "/admin/s_message", component: S_message },
        { path: "/admin/t_message", component: T_message }
      ]
    },
    {
      path: "/teacher",
      component: Teacher,
      redirect: "/teacher/welcome",
      children: [
        { path: "/teacher/welcome", component: Welcome },
        { path: "/teacher/t_message", component: t_message },
        { path: "/teacher/s_message", component: S_message }
      ]
    }
  ]
});
