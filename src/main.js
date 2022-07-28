import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import element from "@/plugins/element.js";
import '@/style/css/theme.scss'
import store from '@/store/index.js'
import JsonExcel from "vue-json-excel";
import Fragment from 'vue-fragment'
import permission from '@/directive/hasPermission'
// import './permission'
Vue.use(element);
Vue.use(Fragment.Plugin)
Vue.prototype.$eventBus = new Vue()
Vue.component("downloadExcel", JsonExcel);
Vue.config.productionTip = false;
Vue.directive('permission', permission)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
