<template>
  <div class="allUserInfo">
    <div class="base">基本信息</div>
    <div class="baseInfo">
      <div class="firstPart">
        <div class="avator">
          <img src="https://cdn.keyuchat.com/config/app/head_male.png" alt="" />
        </div>
        <div class="right">
          <div>
            <span>可遇ID：{{ userInfo.userid }}</span>
            <span>昵称：{{ userInfo.nickname }}</span>
          </div>
          <div>
            <span>用户类型：{{ userInfo.level }}</span>
            <span>出生日期：{{ userInfo.birthday }}</span>
          </div>
          <div>
            <span>性别：{{ userInfo.sex }}</span>
            <span>所在城市：{{ userInfo.livingcity }}</span>
          </div>
        </div>
      </div>
      <div class="secondPart right">
        <div>
          <span>手机号：{{ userInfo.phone }}</span>
          <span>注册渠道：{{ userInfo.regchannelid }}</span>
          <span>注册时间：{{ userInfo.regdate }}</span>
          <span>最后客户端类型：{{ userInfo.last_login_ostype }}</span>
        </div>
        <div style="margin: 0 0 0 70px; box-sizing: border-box">
          <span>注册ip地址：{{ userInfo.regip }}</span>
          <span>点击渠道：{{ userInfo.invitesrc }}</span>
          <span>最后打开时间：{{ userInfo.last_login_time }}</span>
          <span>最后更新时间：{{ userInfo.lastupdatetime }}</span>
        </div>
        <div>
          <span>首次登录类型：{{ userInfo.regtype }}</span>
          <span>状态：{{ userInfo.frozen }}</span>
          <span>最后打开版本号：{{ userInfo.lastappver }}</span>
          <span>最后充值时间：{{ userInfo.lastrechargetime }}</span>
        </div>
      </div>
      <div class="thridPart">
        <span>邀请人：{{ userInfo.inviteruserid }}</span>
        <span >个性签名：{{ userInfo.wish }}</span>
        <span>聊天token：{{ userInfo.im_token }}</span>
      </div>
    </div>
    <div class="friend">交友信息</div>
    <div class="friendInfo">
      <div>
        <span>真实姓名：{{ userInfo.sfz_name }}</span>
        <span  style="margin: 0 0 0 70px; box-sizing: border-box">语音签名：{{ userInfo.voiceurl }}</span>
        <span>身份证号码：{{ userInfo.sfz_id }}</span>
      </div>
      <div>真实姓名：{{ userInfo.sfz_name }}</div>
      <div>封面相册：{{ userInfo.sfz_name }}</div>
    </div>
    <div class="leven">等级信息</div>
    <div class="levenInfo friendInfo">
      <div>
        <span>用户等级：{{ userInfo.richeslevel }}</span>
        <span  style="margin: 0 0 0 70px; box-sizing: border-box">魅力等级：{{ userInfo.charmlevel }}</span>
        <span>用户经验值：{{ userInfo.richesexp }}</span>
      </div>
      <div>升级所需经验值：{{ userInfo.charmexp }}</div>
    </div>
    <div class="money">财富信息</div>
    <div class="moneyInfo friendInfo">
      <div>
        <span>金币总余额：{{ userInfo.all_gold }}</span>
        <span  style="margin: 0 0 0 70px; box-sizing: border-box">充值金币余额：{{ userInfo.gold }}</span>
        <span>平台赠送金币余额：{{ userInfo.free_gold }}</span>
      </div>
      <div>
        <span>充值金币总额：{{ userInfo.all_recharge_gold }}</span>
        <span  style="margin: 0 0 0 70px; box-sizing: border-box">平台赠送金币总额：{{ userInfo.all_recharge_freegold }}</span>
        <span>充值总金额：{{ userInfo.all_recharge }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllInfo } from "@/api/api.js";
export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  props: {},
  data() {
    //这⾥存放数据
    return {
      userInfo: {},
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    async getUserInfo() {
      try {
        const res = await getAllInfo(10000);
        console.log("res :>> ", res);
        if (res && res.errcode == 0) {
          this.userInfo = res.data;
        } else {
          this.$$message({
            type: "error",
            message: "获取用户信息失败！",
          });
        }
      } catch (error) {
        console.log("error :>> ", error);
        this.$$message({
          type: "error",
          message: "获取用户信息失败！",
        });
      }
    },
  },
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期，挂载完成（可以访问dom元素）
  mounted() {
    this.getUserInfo();
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
.allUserInfo {
  box-sizing: border-box;
  border: 1px solid red;
  padding: 0 0 0 20px;
   color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  font-size: 14px;
  font-variant: tabular-nums;
}
.allUserInfo > div:nth-child(odd) {
  box-sizing: border-box;
  height: 45px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  margin: 20px 0;
}
.baseInfo {
  display: flex;
  /* border: 1px solid blue; */
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  font-size: 14px;
  font-variant: tabular-nums;
}
.avator {
  width: 72px;
  height: 40px;
}
.avator > img {
  margin-top: 15px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.right {
  display: flex;
  flex: 1;
  /* border: 1px solid red; */
}
.right > div {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.right > div > span {
  margin-bottom: 16px;
}
.firstPart {
  display: flex;
}
.thridPart {
  display: flex;
  flex-direction: column;
}
.thridPart > span {
  margin-bottom: 16px;
}
.friendInfo {
  display: flex;
  flex-direction: column;
}
.friendInfo>div {
  margin-bottom: 16px;
  display: flex;
justify-content: space-between;
}
.friendInfo>div>span {
  flex: 1;
}
</style>
