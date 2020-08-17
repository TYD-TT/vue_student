import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import router from "./router/router";
import "element-ui/lib/theme-chalk/index.css";
// 全局样式表
import "./assets/css/global.css";

import axios from "axios";
// 配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:3000";
Vue.prototype.$http = axios;
Vue.use(Element);
Vue.config.productionTip = false;

// 时间过滤器
Vue.filter("dataFormat", function(originVal) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + 1 + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
