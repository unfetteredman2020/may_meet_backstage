import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import ElementUI from "element-ui";
import '@/style/css/theme.scss'
import { Message, Loading } from "element-ui";
import store from '@/store/index.js'
import JsonExcel from "vue-json-excel";
import Fragment from 'vue-fragment'
Vue.use(ElementUI);
Vue.use(Fragment.Plugin)

Vue.prototype.$message = function (type, message) {
  Message({
    type,
    message: message
  })
}
// Vue.prototype.$loading = Loading

Vue.prototype.$eventBus = new Vue()

Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
