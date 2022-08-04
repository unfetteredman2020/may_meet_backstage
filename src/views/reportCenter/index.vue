<template>
  <div>
    <el-container>
      <el-aside class="reportAside" :width="collapse ? 'auto' : '220px'">
        <i :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" class="collapseIcon" @click="isCollapse"></i>
        <el-menu :collapse="collapse" :default-active="activeMenu" class="el-menu-vertical-demo userManageMenu" @open="handleOpen" @close="handleClose" background-color="#000" text-color="#999999" active-text-color="#fff" @select="handleSelect">
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
const MenuTree = ()=> import("@/components/menuTree.vue");
import { REPORTCENTER } from "@/config/menuConfig.js";

// 经营模块
const sumTableOfPlatformOperation = ()=> import("./components/jingyingModuleComponents/sumTableOfPlatformOperation.vue");
const firstPayUser = ()=> import("./components/jingyingModuleComponents/firstPayUser.vue");
const newPayUser = ()=> import("./components/jingyingModuleComponents/newPayUser.vue");
const headlinesAndroidNewPayUser = ()=> import("./components//jingyingModuleComponents/headlinesAndroidNewPayUser.vue");
const kwaiAndroidNewPayUser = ()=> import("./components/jingyingModuleComponents/kwaiAndroidNewPayUser.vue");
const iosNewPayUser = ()=> import("./components/jingyingModuleComponents/iosNewPayUser.vue");
const thridDayBusinessCompare = ()=> import("./components/jingyingModuleComponents/thridDayBusinessCompare.vue");
const ageDailyCompare = ()=> import("./components/jingyingModuleComponents/ageDailyCompare.vue");
const dailyPayStatistic = ()=> import("./components/jingyingModuleComponents/dailyPayStatistic.vue");
const platformActiveDaysData = ()=> import("./components/jingyingModuleComponents/platformActiveDaysData.vue");
const allBoard = ()=> import("./components/jingyingModuleComponents/allBoard.vue");
const businessBoard = ()=> import("./components/jingyingModuleComponents/businessBoard.vue");
// 运营模块
const registCount = ()=> import("./components/yunyingModuleComponents/registCount.vue");
const dayActiveUserStatistics = ()=> import("./components/yunyingModuleComponents/dayActiveUserStatistics.vue");
const registRetention = ()=> import("./components/yunyingModuleComponents/registRetention.vue");
const manRegistRetention = ()=> import("./components/yunyingModuleComponents/manRegistRetention.vue");
const guestRetention = ()=> import("./components/yunyingModuleComponents/guestRetention.vue");
const registMode = ()=> import("./components/yunyingModuleComponents/registMode.vue");
const payUserRetention = ()=> import("./components/yunyingModuleComponents/payUserRetention.vue");
// 产品模块
const voiceAndVideoCallData = ()=> import("./components/productModuleComponents/voiceAndVideoCallData.vue");
const manTaskCompletion = ()=> import("./components/productModuleComponents/manTaskCompletion.vue");
const dynamicDailyStatistics = ()=> import("./components/productModuleComponents/dynamicDailyStatistics.vue");
const womanTaskCompletion = ()=> import("./components/productModuleComponents/womanTaskCompletion.vue");
const realNameAuthenticationData = ()=> import("./components/productModuleComponents/realNameAuthenticationData.vue");
const videoConnectionData = ()=> import("./components/productModuleComponents/videoConnectionData.vue");
const dailyGoldData = ()=> import("./components/productModuleComponents/dailyGoldData.vue");
const dailyGiveGoldData = ()=> import("./components/productModuleComponents/dailyGiveGoldData.vue");
const manRecommendedData = ()=> import('./components/productModuleComponents/manRecommendedData.vue')
const guestRecommendedData = ()=> import('./components/productModuleComponents/guestRecommendedData.vue')
// 渠道模块
const promotionReport = ()=> import("./components/channelModuleComponents/promotionReport.vue");
const IELTSAssistantActiveCount = ()=> import("./components/channelModuleComponents/IELTSAssistantActiveCount.vue");
const dailyChannelConsumRanking = ()=> import("./components/channelModuleComponents/dailyChannelConsumRanking.vue");
const dailyChannelDataSum = ()=> import("./components/channelModuleComponents/dailyChannelDataSum.vue");
const userChatState = ()=> import("./components/channelModuleComponents/userChatState.vue");

export default {
  name: '',
  components: {
    manRecommendedData,
    guestRecommendedData,
    dailyChannelDataSum,
    userChatState,
    dailyChannelConsumRanking,
    IELTSAssistantActiveCount,
    promotionReport,
    payUserRetention,
    registMode,
    dailyGiveGoldData,
    dailyGoldData,
    videoConnectionData,
    realNameAuthenticationData,
    womanTaskCompletion,
    dynamicDailyStatistics,
    manTaskCompletion,
    voiceAndVideoCallData,
    MenuTree,
    sumTableOfPlatformOperation,
    firstPayUser,
    newPayUser,
    headlinesAndroidNewPayUser,
    kwaiAndroidNewPayUser,
    iosNewPayUser,
    thridDayBusinessCompare,
    ageDailyCompare,
    dailyPayStatistic,
    platformActiveDaysData,
    allBoard,
    businessBoard,
    registCount,
    dayActiveUserStatistics,
    registRetention,
    manRegistRetention,
    guestRetention,
  },
  props: {},
  data() {
    //这⾥存放数据
    return {
      collapse: false,
      activeMenu: "",
      emptyImg: require("../../assets/empty.png"),
      tabsValue: "",
      editableTabs: [],
      leftMenuList: REPORTCENTER,
      // leftMenuList: [
      //   {
      //     name: "经营模块",
      //     path: "/reportCenter/jingying",
      //     icon: "el-icon-odometer",
      //     children: [
      //       {
      //         name: "平台经营数据总表",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/sumTableOfPlatformOperation",
      //       },
      //       {
      //         name: "首次付费用户留存",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/firstPayUser",
      //       },
      //       {
      //         name: "新增付费用户留存",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/newPayUser",
      //       },
      //       {
      //         name: "头条 安卓新增付费用户",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/headlinesAndroidNewPayUser",
      //       },
      //       {
      //         name: "快手 安卓新增付费用户",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/kwaiAndroidNewPayUser",
      //       },
      //       {
      //         name: "IOS 新增付费用户",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/iosNewPayUser",
      //       },
      //       {
      //         name: "近3日业务数据对比",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/thridDayBusinessCompare",
      //       },
      //       {
      //         name: "年龄段每日数据",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/ageDailyCompare",
      //       },
      //       {
      //         name: "每日付费统计",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/dailyPayStatistic",
      //       },
      //       {
      //         name: "业务看板",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/businessBoard",
      //       },
      //       {
      //         name: "平台活跃每日数据",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/platformActiveDaysData",
      //       },
      //       {
      //         name: "总览看板",
      //         icon: "el-icon-odometer",
      //         path: "/jingying/allBoard",
      //       },
      //     ],
      //   },
      //   {
      //     name: "运营模块",
      //     icon: "el-icon-odometer",
      //     path: "/reportCenter/yunying",
      //     children: [
      //       {
      //         name: "各时段注册数",
      //         icon: "el-icon-odometer",
      //         path: "/yunying/registCount",
      //       },
      //       {
      //         name: "每日活跃用户统计",
      //         icon: "el-icon-odometer",
      //         path: "/yunying/dayActiveUserStatistics",
      //       },
      //       {
      //         name: "注册用户留存率",
      //         icon: "el-icon-odometer",
      //         path: "/yunying/registRetention",
      //       },
      //       {
      //         name: "注册男用户留存率",
      //         icon: "el-icon-odometer",
      //         path: "/yunying/manRegistRetention",
      //       },
      //       {
      //         name: "嘉宾留存率",
      //         icon: "el-icon-odometer",
      //         path: "/yunying/guestRetention",
      //       },
      //       {
      //         name: "付费用户留存率",
      //         icon: "el-icon-odometer",
      //         path: "/yunying/payUserRetention",
      //       },

      //       {
      //         name: "注册用户登录方式",
      //         icon: "el-icon-odometer",
      //         path: "/yunying/registMode",
      //       },
      //     ],
      //   },
      //   {
      //     name: "渠道模块",
      //     icon: "el-icon-set-up",
      //     path: "/reportCenter/channel",
      //     children: [
      //       {
      //         name: "推广数据报表",
      //         icon: "el-icon-set-up",
      //         path: "/channel/promotionReport",
      //       },
      //       {
      //         name: "每日渠道数据总表",
      //         icon: "el-icon-set-up",
      //         path: "/channel/dailyChannelDataSum",
      //       },
      //       {
      //         name: "雅思助手激活统计",
      //         icon: "el-icon-set-up",
      //         path: "/channel/IELTSAssistantActiveCount",
      //       },
      //       {
      //         name: "用户聊天情况",
      //         icon: "el-icon-set-up",
      //         path: "/channel/userChatState",
      //       },
      //       {
      //         name: "每日渠道消耗排名",
      //         icon: "el-icon-set-up",
      //         path: "/channel/dailyChannelConsumRanking",
      //       },
      //     ],
      //   },
      //   {
      //     name: "产品模块",
      //     icon: "el-icon-set-up",
      //     path: "/reportCenter/product",
      //     children: [
      //       {
      //         name: "视频、语音通话视频",
      //         icon: "el-icon-odometer",
      //         path: "/product/voiceAndVideoCallData",
      //       },
      //       {
      //         name: "男用户任务完成情况",
      //         icon: "el-icon-odometer",
      //         path: "/product/manTaskCompletion",
      //       },
      //       {
      //         name: "动态每日统计表",
      //         icon: "el-icon-odometer",
      //         path: "/product/dynamicDailyStatistics",
      //       },

      //       {
      //         name: "女用户任务完成情况",
      //         icon: "el-icon-odometer",
      //         path: "/product/womanTaskCompletion",
      //       },
      //       {
      //         name: "实名、真人认证数据",
      //         icon: "el-icon-odometer",
      //         path: "/product/realNameAuthenticationData",
      //       },
      //       // {
      //       //   name: "视频匹配",
      //       //   icon: "el-icon-odometer",
      //       //   path: "/product/videoMatching",
      //       // },
      //       {
      //         name: "视频专区接通情况",
      //         icon: "el-icon-odometer",
      //         path: "/product/videoConnectionData",
      //       },
      //       {
      //         name: "每日金币数据",
      //         icon: "el-icon-odometer",
      //         path: "/product/dailyGoldData",
      //       },
      //       {
      //         name: "每日赠送金币数据",
      //         icon: "el-icon-odometer",
      //         path: "/product/dailyGiveGoldData",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    isCollapse() {
      this.collapse = !this.collapse;
    },
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
        menuKey: key,
      });
      this.editableTabs = oldArr;
    },

    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
      return;
    },
    clickTab(tab, event) {
      console.log(tab, event);
      console.log("1", tab.name);
      let tabs = this.editableTabs;
      let menuKeys = tabs.filter((item) => item.component == tab.name)[0].menuKey;
      // console.log("menuKeys", menuKeys);
      this.activeMenu = menuKeys;
    },
    removeTab(targetName) {
      console.log("activeMenu", this.activeMenu);
      console.log("targetName", targetName);
      console.log("this.editableTabs", this.editableTabs);
      let tabs = this.editableTabs;
      // console.log('index', index)
      let activeName = this.tabsValue;
      let menuKey = this.activeMenu;
      console.log("activeName", activeName);
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.component === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            console.log("nextTab", nextTab);
            if (nextTab) {
              activeName = nextTab.component;
              menuKey = nextTab.menuKey;
            } else {
              activeName = "";
              menuKey = "";
            }
          }
        });
      }
      this.tabsValue = activeName || "";
      this.activeMenu = menuKey || "";
      this.editableTabs = this.editableTabs.filter((tab) => tab.component !== targetName);
    },
    close() {},
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
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 201px;
  /* border: 1px solid red; */
  box-sizing: border-box;
}
.el-menu-vertical-demo {
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
.reportAside {
  /* border: 1px solid orange; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.el-menu {
  border: none !important;
}
.el-aside {
  background-color: #000;
  /* border: 1px solid blue; */
  box-sizing: border-box;
  // width: auto!important;
}
.userManageMain {
  /* border: 1px solid blue; */
  margin: 0;
  padding: 0 !important;
}
.userManageMenu {
  height: calc(100vh - 70px - 20px);
}
.empty {
  margin-top: 150px;
  /* border: 1px solid red; */
}
.collapseIcon {
  /* background-color: red; */
  font-size: 20px !important;
  margin: 0 0 0 25px;
  font-size: 100%;
  /* height: 100px; */
  color: #fff;
}
</style>
