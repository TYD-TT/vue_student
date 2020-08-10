import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../components/Login.vue";
const Login = () =>
  import(
    /* webpackChunkName: "login_home_welcome" */ "../components/Login.vue"
  );
import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
const Student = () => import("../components/student/Student.vue");
const Admin = () => import("../components/admin/Admin.vue");
const Teacher = () => import("../components/teacher/Teacher.vue");
const S_message = () => import("../components/student/S_message.vue");
const Welcome = () => import("../components/Welcome.vue");

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", redirect: "/Login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/home", component: Home },
    { path: "/student", component: Student },
    {
      path: "/admin", component: Admin, redirect: "/welcome",
      children: [
        { path: '/welcome', component: Welcome },
        { path: "/admin/s_message", component: S_message }
      ]
    },
    { path: "/teacher", component: Teacher }
  ]
});
