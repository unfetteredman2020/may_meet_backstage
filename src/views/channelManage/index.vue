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
import { CHANNELMANAGE } from "@/config/menuConfig.js";

export default {
  components: { MenuTree: MenuTree },
  props: {},
  data() {
    //这⾥存放数据
    return {
      leftMenuList: CHANNELMANAGE,
      // leftMenuList: [
      //   {
      //     name: "渠道列表",
      //     path: "/channelManage/channelList",
      //     icon: "el-icon-s-marketing",
      //   }

      // ],
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
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
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期，挂载完成（可以访问dom元素）
  mounted() {},
  beforeCreate() {}, //⽣命周期-创建之前
  beforeMount() {}, //⽣命周期 - 挂载之前
  beforeUpdate() {}, //⽣命周期 - 更新之后
  updated() {}, //⽣命周期 - 更新之后
  beforeDestroy() {}, //⽣命周期 - 销毁之前
  destroy() {}, //⽣命周期 - 销毁完成
  activated() {}, //如果页⾯有keep-alive缓存功能，这个函数会触发
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
