<template>
  <div class="container">
    <div class="allUserInfo">
      <div class="base">基本信息</div>
      <div class="baseInfo">
        <div class="firstPart">
          <div class="avator">
            <img :src="BASE_CDN_DOMAIN + userInfo.faceimg" alt="" v-if="userInfo.faceimg"/>
            <el-avatar size="large" :src="BASE_CDN_DOMAIN + userInfo.faceimg" v-else></el-avatar>
          </div>
          <div class="right">
            <div>
              <span>可遇ID：{{ userInfo.userid }}</span>
              <span>昵称：{{ userInfo.nickname }}</span>
            </div>
            <div>
              <span>用户类型：{{ userType[userInfo.level] }}</span>
              <span>出生日期：{{ userInfo.birthday }}</span>
            </div>
            <div>
              <span>性别：{{ userInfo.sex == 0 ? "男" : "女" }}</span>
              <span>所在城市：{{ userInfo.livingcity }}</span>
            </div>
          </div>
        </div>
        <div class="secondPart right">
          <div>
            <span>手机号：{{ userInfo.phone }}</span>
            <span>注册渠道：{{ userInfo.regchannelid }}</span>
            <span>注册时间：{{ userInfo.regdate }}</span>
            <span>最后客户端类型：{{ userInfo.last_login_ostype == 1 ? "苹果" : "安卓" }}</span>
          </div>
          <div style="margin: 0 0 0 70px; box-sizing: border-box">
            <span>注册ip地址：{{ userInfo.regip }}</span>
            <span>点击渠道：{{ userInfo.invitesrc }}</span>
            <span>最后打开时间：{{ userInfo.last_login_time }}</span>
            <span>最后更新时间：{{ userInfo.lastupdatetime }}</span>
          </div>
          <div>
            <span>首次登录类型：{{ regTypes[userInfo.regtype] }}</span>
            <span>
              状态：
              <el-tag size="mini" :type="isLockAccount ? 'success' : 'danger'" effect="dark">
                {{ isLockAccount ? "正常" : "禁用" }}
              </el-tag>
            </span>
            <span>最后打开版本号：{{ userInfo.lastappver }}</span>
            <span>最后充值时间：{{ userInfo.lastrechargetime }}</span>
          </div>
        </div>
        <div class="thridPart">
          <span>邀请人：{{ userInfo.inviteruserid }}</span>
          <span>个性签名：{{ userInfo.wish }}</span>
          <span>聊天token：{{ userInfo.im_token }}</span>
        </div>
      </div>
      <div class="friend">交友信息</div>
      <div class="friendInfo">
        <div>
          <span>真实姓名：{{ userInfo.sfz_name }}</span>
          <span style="margin: 0 0 0 70px; box-sizing: border-box">
            语音签名：
            <audio controls class="customAudio">
              <source :src="`${BASE_CDN_DOMAIN + userInfo.voiceurl}`" type="audio/mpeg" />
              <source :src="`${BASE_CDN_DOMAIN + userInfo.voiceurl}`" type="audio/ogg" />
              <embed height="20" width="70" :src="`${BASE_CDN_DOMAIN + userInfo.voiceurl}`" />
            </audio>
          </span>
          <span style="white-space: nowrap">身份证号码：{{ userInfo.sfz_id }}</span>
        </div>
        <div>
          <span>真人头像：{{ userInfo.realperson_auth_flag == 0 ? "否" : "是" }}</span>
          <span>语音审核状态： {{ voiceAuditStatus[userInfo.voicestate] }}</span>
        </div>
        <div class="photoList">
          <p>封面相册：</p>
          <div class="imgListBox">
            <el-image @click="setPreview(index)" v-for="(item, index) in userInfo.fate_photo" :preview-src-list="previewList" :key="index" style="min-width: 100px; height: 100px; margin: 0 5px 0 0" :src="`${BASE_CDN_DOMAIN + item.filename}`" fit="fill"></el-image>
          </div>
        </div>
      </div>
      <div class="leven">等级信息</div>
      <div class="levenInfo friendInfo">
        <div>
          <span>用户等级：{{ userInfo.richeslevel }}</span>
          <span style="margin: 0 0 0 70px; box-sizing: border-box">魅力等级：{{ userInfo.charmlevel }}级</span>
          <span>用户经验值：{{ userInfo.richesexp }}</span>
        </div>
        <div>升级所需经验值：{{ userInfo.charmexp }}</div>
      </div>
      <div class="money">财富信息</div>
      <div class="moneyInfo friendInfo">
        <div>
          <span>金币总余额：{{ userInfo.all_gold }}</span>
          <span style="margin: 0 0 0 70px; box-sizing: border-box">充值金币余额：{{ userInfo.gold }}</span>
          <span>平台赠送金币余额：{{ userInfo.free_gold }}</span>
        </div>
        <div>
          <span>充值金币总额：{{ userInfo.all_recharge_gold }}</span>
          <span style="margin: 0 0 0 70px; box-sizing: border-box">平台赠送金币总额：{{ userInfo.all_recharge_freegold }}</span>
          <span>充值总金额：{{ userInfo.all_recharge }}</span>
        </div>
      </div>
    </div>
    <div class="setting">
      <UserSetting :userInfo="userInfo" />
    </div>
  </div>
</template>

<script>
import { getAllInfo } from "@/api/userApi.js";
import UserSetting from "./allInfoComponents/setting.vue";
import { isTimeOut } from "@/utils/date";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {
    UserSetting: UserSetting,
  },
  props: {},
  data() {
    //这⾥存放数据
    return {
      id: '',
      userInfo: {},
      previewList: [],
      changeUserInfoVisible: false,
      regTypes: {
        phone: "手机登录",
        fast: "一键登录",
        apple: "苹果登录",
        wxapp: "微信APP登录",
        wxmini: "小程序登录",
      },
      userType: {
        0: "普通用户",
        100: "嘉宾A",
        101: "嘉宾B",
        102: "嘉宾C",
        103: "嘉宾D",
        130: "嘉宾S",
        200: "超级推荐人",
      },
      voiceAuditStatus: {
        0: "未上传语音",
        1: "审核通过",
        2: "审核中",
        3: "审核失败",
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {
    isLockAccount() {
      const { frozen } = this.userInfo;
      if (this.userInfo.frozen && frozen.expiretime) {
        return isTimeOut(frozen.expiretime);
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.getUserInfo();
    this.$on("search", this.search);
  },
  //⽅法集合
  methods: {
    // 图片预览
    setPreview(index) {
      let origin = this.userInfo.fate_photo;
      let before = origin.slice(index);
      let after = origin.slice(0, index);
      let newArr = new Array().concat(before, after);
      let a = [];
      newArr.forEach((item) => a.push(`${this.BASE_CDN_DOMAIN + item.filename}`));
      this.previewList = a;
    },
    search(params) {
      this.getUserInfo(params.id);
    },

    // 获取用户信息
    async getUserInfo(id) {
      try {
        const res = await getAllInfo(id);
        console.log("getAllInfo :>> ", res);
        if (res && res.errcode == 0) {
          !res.data && this.$message("info", "用户不存在！");
          this.userInfo = res.data || {}
        } else {
          this.$message("error", "获取用户信息失败！");
        }
      } catch (error) {
        console.log("error :>> ", error);
        this.$message("error", error.errmsg || "获取用户信息失败！");
      }
    },
  },
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期，挂载完成（可以访问dom元素）

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
.container {
  /* border: 1px solid olivedrab; */
  display: flex;
  flex-direction: column;
  min-width: 1400px;
}
.setting {
  /* border: 1px solid orange; */
  box-sizing: border-box;
  padding: 10px 0 0 0;
  background-color: #f2f2f2;
  height: 100px;
}
.allUserInfo span {
  white-space: nowrap;
}
.customAudio {
  width: 150px;
  height: 30px;
  vertical-align: middle;
}
.allUserInfo {
  box-sizing: border-box;
  /* border: 1px solid red; */
  padding: 0 0 120px 20px;
  max-height: 650px;
  flex: 1;
  color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  font-size: 14px;
  font-variant: tabular-nums;
  overflow-y: scroll;
}

.allUserInfo > div:nth-child(odd) {
  box-sizing: border-box;
  height: 40px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  margin: 10px 0;
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
.friendInfo > div {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
}
.friendInfo > div > span {
  flex: 1;
}
.photoList {
  /* border: 1px solid red; */
  flex-wrap: nowrap;
  align-items: center;
  max-width: 1250px;
  justify-content: start !important;
}
.imgListBox {
  /* border: 1px solid blue; */
  display: flex;
  flex: 1;
  overflow-x: auto;
}
</style>
