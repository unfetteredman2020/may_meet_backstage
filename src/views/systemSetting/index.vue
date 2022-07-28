<!--
 * @Author: unfetteredman weixw2014@qq.com
 * @Date: 2022-06-10 10:16:21
 * @LastEditors: unfetteredman weixw2014@qq.com
 * @LastEditTime: 2022-07-23 09:47:12
 * @FilePath: \may_meet_backstage\src\views\systemSetting\index.vue
-->
<template>
  <div>
    <el-container>
      <el-aside width="180px">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo userManageMenu" @open="handleOpen" @close="handleClose" background-color="#000" text-color="#999999" active-text-color="#fff" @select="handleSelect">
          <MenuTree :menuData="leftMenuList" />
        </el-menu>
      </el-aside>
      <el-main class="userManageMain">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MenuTree from "@/components/menuTree.vue";
import { SYSTEMSETTING } from "@/config/menuConfig.js";

export default {
  name: 'systemSetting',
  components: { MenuTree: MenuTree },
  props: {},
  data() {
    //这⾥存放数据
    return {
      leftMenuList: SYSTEMSETTING,

      // leftMenuList: [
      //   {
      //     name: "角色管理",
      //     path: "/systemSetting/roleManagement",
      //     icon: "el-icon-user-solid",
      //   },
      //   {
      //     name: "后台账号管理",
      //     icon: "el-icon-s-help",
      //     path: "/systemSetting/backstageAccountManage",
      //   },
      // ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.$router.push(key);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
.userManageMain {
  margin: 0;
  padding: 0 !important;
}
.userManageMenu {
  height: calc(100vh - 70px);
}
</style>
