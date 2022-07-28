<template>
  <div>
    <el-container>
      <el-header class="customHeader">
        <div class="logo">
          <img :src="logo" />
        </div>
        <div class="topMenu">
          <el-menu :default-active="$route.path == '/userGeneral' ? '/userManage' : fixPath" class="homeMenu" mode="horizontal" @select="handleSelect" background-color="#000" text-color="#999999" active-text-color="#fff">
            <MenuTree class="homeMenuTree" :menuData="menu" />
          </el-menu>
        </div>
        <div class="avatar">
          <img :src="avatar" />
          <div class="userInfo">
            <p>{{ storeUserInfo.nickname }}</p>
            <p>{{ role_name }}</p>
          </div>
          <el-popover placement="top" width="160">
            <div class="setting" @click="logout">
              <i class="el-icon-switch-button customIcon" style="margin: 0 10px"></i>
              <span>退出登录</span>
            </div>
            <i class="el-icon-s-platform customIcon" slot="reference"></i>
          </el-popover>
          <el-tooltip class="item" effect="dark" :content="fullscreen ? '退出全屏' : '全屏'" placement="top-start">
            <i :class="[fullscreen ? 'el-icon-copy-document' : 'el-icon-full-screen']" class="customIcon" @click="fullScreen"></i>
          </el-tooltip>
        </div>
      </el-header>
      <el-main class="homeMain"><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script>
import MenuTree from "@/components/menuTree.vue";
import { mapState } from "vuex";
import { HOME } from "@/config/menuConfig.js";
console.log("HOME", HOME);
export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: { MenuTree: MenuTree },
  props: {},
  data() {
    //这⾥存放数据
    return {
      logo1:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAABQCAMAAAA6J/nhAAAC9FBMVEUAAAD///////7///////////////////////////////////////////////////////////////////v//v3///////////////////////////////////////r/////////////////////////////////////////////////////////////Xnz/7Mz/OXf/bnX/OHf/////cX7/OHb/anb/+N//cHL/9cf/VXb/7dH/9sr/+t7/VXf/+d//V3b/mn7/4dj/9cb/b3b/n53/88T/+Nz/9Ob/oIf/m3L/////OHb/bnX/Qmf/Vkz//vn/bXj/Pm7/XET/X0D/OXP/O3H/QWr/PG//WUj/V0r/VE//cHH/P2v/Wkb/anj/YmL/WW//YD7/RWP/XUL/aXr//O3/99L/9s7/9cn/b3L/aH3/+uT/RGX/YTz/YWX/R2H/Yzv/39b/ZYH/9MT/WHH/cm7/7e3/+Nf/ZWD/a1j/Wm3/4tr/UXr/X2j/+d//XWv/++f/aVr//fz/SF7/5N7//PD/+Nv/Zl3/ZDn/9/b/4Nj/Z3//l23/dG3/dmr/Zjf/UVL/1tz/6ub/VHX//fX/9PL/++n/S1r/U3j/VnT/lGn/6OH/V0n/+vj/n5n/mpn/7ur/bFX8QUr/8e7/3dz/m5b/lZj/U2X/08z/t7z6OEz/TFX9S0f/5Ob/u7H/l6n/WXX/XlX/+O7/9Or/2tX/1NP/zcv/zMH/oq3/jJL/Tmz/2dD/tKv/mnH5MU3/8a//qqL/7JL/iYb/UYH/RXD/yMX/76H/o6H/lYz/6YP/ZIP/Ul7/VFf/q63/fYP/Xn7/7ub/w8D/vr3/xLf/q7f+mqP/coH/YnX/Zm34KU7/fpL/aZP/5XP/k6z/t5v/UY7/D3b/XGj/bGL/il///PL/8Nj/2sD/p4v/eHX/I2r/a2n/9Lv/w4H/hHX/fFX/7+H/ts//s2r4QF3/c0j/17T/zqL/Xl//Z0P/gqf/KXr/p3G/USmSAAAAS3RSTlMA8hh49oYEfH7tZh8n58+xvftzLRIkTsuclzNVj14KRg4/3OJqOtnFpNRvg6u5EfyDg9ieL+3s5+Lhrot/YmI8PNnfyMi7roSAfq7KK4r5AAAPqElEQVR42tTZ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",
      logo: require("@/assets/logo_txt.png"),
      menu: HOME || [],
      // menu: [
      //   {
      //     path: "/userManage",
      //     name: "用户管理",
      //   },
      //   {
      //     path: "/guestManage",
      //     name: "嘉宾管理",
      //   },
      //   {
      //     path: "/recommenderManage",
      //     name: "推荐人管理",
      //   },
      //   {
      //     path: "/productConfig",
      //     name: "产品配置",
      //   },
      //   {
      //     path: "/contentSafe",
      //     name: "内容安全",
      //   },
      //   {
      //     path: "/channelManage",
      //     name: "渠道管理",
      //   },
      //   {
      //     path: "/reportCenter",
      //     name: "报表中心",
      //   },
      //   {
      //     path: "/systemSetting",
      //     name: "系统管理",
      //   },
      // ],
      avatar: 'https://cdn.keyuchat.com/config/app/head_male.png',
      role_name: '',
      fullscreen: false,
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {
    ...mapState(["storeUserInfo"]),
    fixPath() {
      let path = this.$route.path.split("/")[1];
      console.log("abc", path);
      return "/" + path;
    },
  },
  //⽅法集合
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key);
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    fullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  beforeUpdate() {},
  //⽣命周期，挂载完成（可以访问dom元素）
  mounted() {
    this.role_name = this.storeUserInfo?.role_name || ''
    // console.log("$route.path", this.$route);
    // window.addEventListener("fullscreenchange", (e) => {
    //   // 监听到屏幕变化，在回调中判断是否已退出全屏
    //   console.log("监听全屏变化：", e);
    //   let isFull = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    //   console.log("全屏吗：", isFull);
    //   this.fullscreen = isFull ? true : false;
    // });
    // window.onresize = function () {
    //   var isFull1 = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
    //   console.log("isFull1", isFull1);
    //   // console.log('document', document)
    //   let isFull = document.fullscreenEnabled || document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || null;
    //   let isFull2= document.fullscreenElement
    //   console.log('isFull2', isFull2)
    //   console.log("isFull", isFull);
    //   if (isFull) {
    //     console.log("进入全屏");
    //   } else {
    //     // TODO...
    //     console.log("退出全屏");
    //   }
    // };
  },
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
.customHeader {
  margin: 0;
  padding: 0;
  background-color: #000;
  color: #858484;
  height: 70px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.customHeader > div {
  height: 50px;
}
.homeMain {
  padding: 0;
  margin: 0;
}
.logo {
  /* border: 1px solid blue; */
  width: 180px;
  box-sizing: border-box;
}
.logo > img {
  margin-left: 5px;
  width: 140px;
  height: 48px;
}
.topMenu {
  /* border: 1px solid red; */
  flex: 1;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.avatar {
  /* border: 1px solid pink; */
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.menuItem {
  height: 100%;
  line-height: 50px;
  padding: 0 20px;
  white-space: nowrap;
}
.active {
  background-color: hsla(0, 0%, 100%, 0.15);
  color: #fff;
}
.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.userInfo > p:nth-child(1) {
  font-size: 16px;
  color: #ffffff;
  white-space: nowrap;
}
.userInfo > p:nth-child(2) {
  font-size: 12px;
  white-space: nowrap;
  color: #aaaaaa;
}
.logout {
  background-color: #fff;
  color: #fff;
}
.customIcon {
  font-size: 28px;
}
.setting {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  /* background-color: #000; */
  color: #000;
}

.homeMenu {
  border: 1px solid #000;
  display: flex;
  width: 100%;
}
.homeMenuTree {
  display: flex;
}
</style>
