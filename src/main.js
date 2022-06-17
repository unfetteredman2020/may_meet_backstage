import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import ElementUI from "element-ui";
import '@/style/css/theme.scss'
import { Message } from "element-ui";
import store from '@/store/index.js'
Vue.use(ElementUI);

Vue.prototype.$message = function (type, message) {
  Message({
    type,
    message: message
  })
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
