
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
import { CONTENTSAFE } from "@/config/menuConfig.js";
console.log('CONTENTSAFE1', CONTENTSAFE)
export default {
  name: 'contentSafe',
  components: { MenuTree: MenuTree },
  props: {},
  data() {
    //这⾥存放数据
    return {
      leftMenuList: CONTENTSAFE,

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
