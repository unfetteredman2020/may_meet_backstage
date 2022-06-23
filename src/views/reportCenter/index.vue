<template>
  <div>
    <el-container>
      <el-aside width="220px">
        <el-menu default-active="" class="el-menu-vertical-demo userManageMenu" @open="handleOpen" @close="handleClose" background-color="#000" text-color="#999999" active-text-color="#fff" @select="handleSelect">
          <MenuTree :menuData="leftMenuList" />
        </el-menu>
      </el-aside>
      <el-main class="userManageMain">
        <el-tabs class="reportTabs" v-if="tabsValue" v-model="tabsValue" type="card" closable @tab-remove="removeTab">
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
import sumTableOfPlatformOperation from "./components/jingyingModuleComponents/sumTableOfPlatformOperation.vue";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: { MenuTree: MenuTree, sumTableOfPlatformOperation: sumTableOfPlatformOperation },
  props: {},
  data() {
    //这⾥存放数据
    return {
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
              path: "/reportCenter/jingying/sumTableOfPlatformOperation",
            },
            {
              name: "首次付费用户留存",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/firstPayUser",
            },
            {
              name: "新增付费用户留存",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/newPayUser",
            },
            {
              name: "头条 安卓新增付费",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/headlinesAndroidNewPayUser",
            },
            {
              name: "快手 安卓新增付费用户",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/KwaiAndroidNewPayUser",
            },
            {
              name: "IOS 新增付费用户",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/iosNewPayUser",
            },
            {
              name: "近3日业务数据对比",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/thridDayBusinessCompare",
            },
            {
              name: "年龄段每日数据",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/ageDailyCompare",
            },
            {
              name: "每日付费统计",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/dailyPayStatistic",
            },
            {
              name: "业务看板",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/businessBoard",
            },
            {
              name: "平台活跃每日数据",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/platformActiveDaysData",
            },
            {
              name: "总览看板",
              icon: "el-icon-odometer",
              path: "/reportCenter/jingying/allBoard",
            },
          ],
        },
        {
          name: "运营模块",
          icon: "el-icon-odometer",
          path: "/reportCenter/yunying",
          // children: [],
        },
        {
          name: "渠道模块",
          icon: "el-icon-set-up",
          path: "/reportCenter/channel",
          // children: [],
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
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },

    removeTab(targetName) {
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

      console.log("a", activeName);
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
.reportTabs {
  /* border: 1px solid orange; */
}
</style>
