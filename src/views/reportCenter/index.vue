<template>
  <div>
    <el-container>
      <el-aside width="220px">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo userManageMenu" @open="handleOpen" @close="handleClose" background-color="#000" text-color="#999999" active-text-color="#fff" @select="handleSelect">
          <MenuTree :menuData="leftMenuList" />
        </el-menu>
      </el-aside>
      <el-main class="userManageMain">
        <el-tabs class="reportTabs" v-if="tabsValue" @tab-click="clickTab" v-model="tabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane v-for="item in editableTabs" :key="item.label" :label="item.label" :name="item.component">
            <component :is="item.component" :name="item.component" />
          </el-tab-pane>
        </el-tabs>
        <el-result class="empty" v-else title="暂无数据显示~" subTitle="您选择您要查看的数据">
          <template slot="icon">
            <el-image :src="emptyImg"></el-image>
          </template>
        </el-result>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MenuTree from "@/components/menuTree.vue";
// 经营模块
import sumTableOfPlatformOperation from "./components/jingyingModuleComponents/sumTableOfPlatformOperation.vue";
import firstPayUser from "./components/jingyingModuleComponents/firstPayUser.vue";
import newPayUser from "./components/jingyingModuleComponents/newPayUser.vue";
import headlinesAndroidNewPayUser from "./components//jingyingModuleComponents/headlinesAndroidNewPayUser.vue";
import kwaiAndroidNewPayUser from "./components/jingyingModuleComponents/kwaiAndroidNewPayUser.vue";
import iosNewPayUser from "./components/jingyingModuleComponents/iosNewPayUser.vue";
import thridDayBusinessCompare from "./components/jingyingModuleComponents/thridDayBusinessCompare.vue";
import ageDailyCompare from "./components/jingyingModuleComponents/ageDailyCompare.vue";
import dailyPayStatistic from "./components/jingyingModuleComponents/dailyPayStatistic.vue";
import platformActiveDaysData from "./components/jingyingModuleComponents/platformActiveDaysData.vue";
import allBoard from "./components/jingyingModuleComponents/allBoard.vue";
import businessBoard from "./components/jingyingModuleComponents/businessBoard.vue";
// 运营模块
import registCount from './components/yunyingModuleComponents/registCount.vue'
import dayActiveUserStatistics from './components/yunyingModuleComponents/dayActiveUserStatistics.vue'
import registRetention from './components/yunyingModuleComponents/registRetention.vue'
import manRegistRetention from './components/yunyingModuleComponents/manRegistRetention.vue'
import guestRetention from './components/yunyingModuleComponents/guestRetention.vue'

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: { MenuTree, sumTableOfPlatformOperation, firstPayUser, newPayUser, headlinesAndroidNewPayUser, kwaiAndroidNewPayUser, iosNewPayUser, thridDayBusinessCompare, ageDailyCompare, dailyPayStatistic, platformActiveDaysData, allBoard, businessBoard, registCount, dayActiveUserStatistics, registRetention, manRegistRetention, guestRetention},
  props: {},
  data() {
    //这⾥存放数据
    return {
      activeMenu: "/product/voiceAndVideoCallData",
      emptyImg: require("../../assets/empty.png"),
      tabsValue: "",
      editableTabs: [],
      leftMenuList: [
        {
          name: "经营模块",
          path: "/reportCenter/jingying",
          icon: "el-icon-odometer",
          children: [
            {
              name: "平台经营数据总表",
              icon: "el-icon-odometer",
              path: "/jingying/sumTableOfPlatformOperation",
            },
            {
              name: "首次付费用户留存",
              icon: "el-icon-odometer",
              path: "/jingying/firstPayUser",
            },
            {
              name: "新增付费用户留存",
              icon: "el-icon-odometer",
              path: "/jingying/newPayUser",
            },
            {
              name: "头条 安卓新增付费用户",
              icon: "el-icon-odometer",
              path: "/jingying/headlinesAndroidNewPayUser",
            },
            {
              name: "快手 安卓新增付费用户",
              icon: "el-icon-odometer",
              path: "/jingying/kwaiAndroidNewPayUser",
            },
            {
              name: "IOS 新增付费用户",
              icon: "el-icon-odometer",
              path: "/jingying/iosNewPayUser",
            },
            {
              name: "近3日业务数据对比",
              icon: "el-icon-odometer",
              path: "/jingying/thridDayBusinessCompare",
            },
            {
              name: "年龄段每日数据",
              icon: "el-icon-odometer",
              path: "/jingying/ageDailyCompare",
            },
            {
              name: "每日付费统计",
              icon: "el-icon-odometer",
              path: "/jingying/dailyPayStatistic",
            },
            {
              name: "业务看板",
              icon: "el-icon-odometer",
              path: "/jingying/businessBoard",
            },
            {
              name: "平台活跃每日数据",
              icon: "el-icon-odometer",
              path: "/jingying/platformActiveDaysData",
            },
            {
              name: "总览看板",
              icon: "el-icon-odometer",
              path: "/jingying/allBoard",
            },
          ],
        },
        {
          name: "运营模块",
          icon: "el-icon-odometer",
          path: "/reportCenter/yunying",
          children: [
            {
              name: "各时段注册数",
              icon: "el-icon-odometer",
              path: "/yunying/registCount",
            },
            {
              name: "每日活跃用户统计",
              icon: "el-icon-odometer",
              path: "/yunying/dayActiveUserStatistics",
            },
            {
              name: "注册用户留存率",
              icon: "el-icon-odometer",
              path: "/yunying/registRetention",
            },
            {
              name: "注册男用户留存率",
              icon: "el-icon-odometer",
              path: "/yunying/manRegistRetention",
            },
            {
              name: "嘉宾留存率",
              icon: "el-icon-odometer",
              path: "/yunying/guestRetention",
            },
             {
              name: "付费用户留存率",
              icon: "el-icon-odometer",
              path: "/yunying/payUserRetention",
            },

             {
              name: "注册用户登录方式",
              icon: "el-icon-odometer",
              path: "/yunying/registMode",
            },
          ],
        },
        {
          name: "渠道模块",
          icon: "el-icon-set-up",
          path: "/reportCenter/channel",
          // children: [],
        },
        {
          name: "产品模块",
          icon: "el-icon-set-up",
          path: "/reportCenter/product",
          children: [
            {
              name: "视频、语音通话视频",
              icon: "el-icon-odometer",
              path: "/product/voiceAndVideoCallData",
            },
            {
              name: "男用户任务完成情况",
              icon: "el-icon-odometer",
              path: "/product/manTaskCompletion",
            },
            {
              name: "动态每日统计表",
              icon: "el-icon-odometer",
              path: "/product/dynamicDailyStatistics",
            },

            {
              name: "女用户任务完成情况",
              icon: "el-icon-odometer",
              path: "/product/womanTaskCompletion",
            },
            {
              name: "实名、真人认证数据",
              icon: "el-icon-odometer",
              path: "/product/realNameAuthenticationData",
            },
            {
              name: "视频匹配",
              icon: "el-icon-odometer",
              path: "/product/videoMatching",
            },
             {
              name: "视频专区接通情况",
              icon: "el-icon-odometer",
              path: "/product/videoConnectionData",
            },
             {
              name: "每日金币数据",
              icon: "el-icon-odometer",
              path: "/product/dailyGoldData",
            },
             {
              name: "每日赠送金币数据",
              icon: "el-icon-odometer",
              path: "/product/dailyGiveGoldData",
            },
          ],
        },
      ],
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    handleSelect(key, keyPath) {
      console.log("key", key);
      this.activeMenu = key;
      console.log(key, keyPath);
      let component = key.split("/").pop();
      if (this.editableTabs.filter((item) => item.component == component).length) {
        return (this.tabsValue = component);
      }
      let oldArr = [...this.editableTabs];
      let name = this.leftMenuList.filter((item) => item.path == keyPath[0])[0].children.filter((item) => item.path == key)[0].name;
      this.tabsValue = component;
      oldArr.push({
        label: name,
        component,
      });
      this.editableTabs = oldArr;
    },
    setActiveMenu(str) {
      let b = this.activeMenu.split("/");
      console.log("b", b);
      let a = b.reduce((pre, cur, idx) => {
        return pre + cur;
      });
      console.log("a", a);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    clickTab(tab, event) {
      console.log(tab, event);
      console.log("this.tabsValue", this.tabsValue);
    },
    removeTab(targetName) {
      this.setActiveMenu();
      console.log("activeMenu", this.activeMenu);
      console.log("targetName", targetName);
      console.log("this.editableTabs", this.editableTabs);
      let tabs = this.editableTabs;
      let idx = this.editableTabs.findIndex((item) => item.label !== targetName);
      // console.log('index', index)
      let activeName = this.tabsValue;
      console.log("activeName", activeName);
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.component === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.component;
            } else {
              activeName = "";
            }
          }
        });
      }
      this.tabsValue = activeName;
      this.editableTabs = this.editableTabs.filter((tab) => tab.component !== targetName);
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
  /* border: 1px solid blue; */
  margin: 0;
  padding: 0 !important;
}
.userManageMenu {
  height: calc(100vh - 70px);
}
.empty {
  margin-top: 150px;
  /* border: 1px solid red; */
}
</style>
