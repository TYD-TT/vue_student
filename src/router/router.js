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
const S_message = () => import("../components/student/S_message.vue");
const S_grade = () => import("../components/student/S_grade.vue");
const S_course = () => import("../components/student/S_course.vue");
const S_select_course = () =>
  import("../components/student/S_select_course.vue");
const S_timetable = () => import("../components/student/S_timetable.vue");
// 管理员功能
const Admin = () => import("../components/admin/Admin.vue");
const A_S_message = () => import("../components/admin/A_S_message.vue");
const A_T_message = () => import("../components/admin/A_T_message.vue");
const A_department = () => import("../components/admin/A_department.vue");
const A_major = () => import("../components/admin/A_major.vue");

// 教师功能
const Teacher = () => import("../components/teacher/Teacher.vue");
const T_message = () => import("../components/teacher/T_message.vue");
const View_grade = () => import("../components/teacher/View_grade.vue");
const Make_grade = () => import("../components/teacher/Make_grade.vue");

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
        { path: "/student/s_message", component: S_message },
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
        { path: "/admin/a_s_message", component: A_S_message },
        { path: "/admin/a_t_message", component: A_T_message },
        { path: "/admin/a_department", component: A_department },
        { path: "/admin/a_major", component: A_major }
      ]
    },
    {
      path: "/teacher",
      component: Teacher,
      redirect: "/teacher/welcome",
      children: [
        { path: "/teacher/welcome", component: Welcome },
        { path: "/teacher/t_message", component: T_message },
        { path: "/teacher/s_message", component: A_S_message },
        { path: "/teacher/view_grade", component: View_grade },
        { path: "/teacher/make_grade", component: Make_grade }
      ]
    }
  ]
});
