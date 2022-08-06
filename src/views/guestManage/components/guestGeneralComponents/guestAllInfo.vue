<template>
  <div class="box">
    <div class="header">基础信息</div>
    <div class="first">
      <div class="a">
        <div class="avatarBox">
          <img class="avatar" :src="BASE_CDN_DOMAIN + userInfo.faceimg" alt="" v-if="userInfo.faceimg" />
          <el-avatar class="avatar" size="large" :src="BASE_CDN_DOMAIN + userInfo.faceimg" v-else></el-avatar>
          <div style="margin: 0 20px">
            <p>
              <span>嘉宾用户ID：</span>
              <b>{{ userInfo.ID }}</b>
            </p>
            <p>
              <span>昵称：</span>
              <b>{{ userInfo["昵称"] }}</b>
            </p>
          </div>
        </div>
        <p>
          <span>手机号：</span>
          <b>{{ userInfo["手机号"] }}</b>
        </p>
        <p>
          <span>注册渠道：</span>
          <b>{{ userInfo["注册渠道"] }}</b>
        </p>
        <p>
          <span>最后打开时间：</span>
          <b>{{ userInfo["最后打开时间"] }}</b>
        </p>
        <p>
          <span>最后更新时间：</span>
          <b>{{ userInfo["最后更新时间"] }}</b>
        </p>
      </div>
      <div class="b">
        <p>
          <span>用户类型：</span>
          <b>{{ userType[userInfo["用户类型"]] }}</b>
        </p>
        <p>
          <span>出生日期：</span>
          <b>{{ userInfo["出生日期"] }}</b>
        </p>
        <p>
          <span>注册ip地址：</span>
          <b>{{ userInfo["注册ip地址"] }}</b>
        </p>
        <p>
          <span>状态：</span>
          <el-tag :type="isLockAccount ? 'success' : 'danger'" effect="dark">
            {{ isLockAccount ? "正常" : "禁用" }}
          </el-tag>
        </p>
        <p>
          <span>最后打开版本号：</span>
          <b>{{ userInfo["最后打开版本号"] }}</b>
        </p>
        <p>
          <span>最后充值时间：</span>
          <b>{{ userInfo["最后充值时间"] }}</b>
        </p>
      </div>
      <div class="c">
        <p>
          <span>性别：</span>
          <b>{{ userInfo["性别"] == 0 ? "男" : "女" }}</b>
        </p>
        <p>
          <span>所在城市：</span>
          <b>{{ userInfo["所在城市"] }}</b>
        </p>
        <p>
          <span>首次登录类型：</span>
          <b>{{ userInfo["首次登录类型"] }}</b>
        </p>
        <p>
          <span>注册时间：</span>
          <b>{{ userInfo["注册时间"] }}</b>
        </p>
        <p>
          <span>最后客户端类型：</span>
          <b>{{ userInfo["最后客户端类型"] == 1 ? "安卓" : "苹果" }}</b>
        </p>
      </div>
    </div>
    <div class="second">
      <p>
        <span>个性签名：</span>
        <b>{{ userInfo["个性签名"] }}</b>
      </p>
      <p>
        <span>聊天token：</span>
        <b>{{ userInfo["聊天token"] }}</b>
      </p>
    </div>
    <div class="header">交友信息</div>
    <div class="third">
      <div class="one">
        <p>
          <span>真实姓名：</span>
          <b>{{ userInfo["真实姓名"] }}</b>
        </p>
        <p>
          <span>用户头像：</span>
          <b>{{ userInfo["用户头像"] }}</b>
        </p>
        <p>
          <span>真人头像：</span>
          <b>{{ userInfo["真人头像"] }}</b>
        </p>
      </div>
      <div class="one">
        <p>
          <span>身份证号码：</span>
          <b>{{ userInfo["身份证号码"] }}</b>
        </p>
        <p>
          <span>密友数量：</span>
          <b>{{ userInfo["密友数量"] }}</b>
        </p>
      </div>
    </div>
    <div class="header">收益信息</div>
    <div class="four">
      <p>
        <span>历史总零钱：</span>
        <b>{{ userInfo["历史总零钱"] }}</b>
      </p>
      <p>
        <span>剩余零钱：</span>
        <b>{{ userInfo["剩余零钱"] }}</b>
      </p>
      <p>
        <span>提现零钱：</span>
        <b>{{ userInfo["提现零钱"] }}</b>
      </p>
    </div>
    <footer v-if="userInfo.ID">
      <div class="footer">
        <el-button type="primary" @click="changeUserInfo">修改资料</el-button>
        <el-button type="primary" @click="changeRecommendTeam">修改推荐团队</el-button>
        <el-button type="primary" @click="changeGuestShare">修改嘉宾分成</el-button>
      </div>
    </footer>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" class="userInfoDialog" width="700px" :close-on-click-modal="false">
      <!-- 修改资料 -->
      <el-form v-if="changeUserInfoVisible" :model="changeUserInfoForm" :rules="changeUserInfoRules" ref="changeUserInfoForms" label-width="120px" class="demo-changeUserInfoForm">
        <el-form-item label="用户昵称：" prop="nickname">
          <el-input v-model="changeUserInfoForm.nickname" auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item label="设为默认头像：" prop="default_face_img">
          <el-select v-model="changeUserInfoForm.default_face_img" placeholder="请选择活动区域">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个性签名：" prop="wish">
          <el-input type="textarea" v-model="changeUserInfoForm.wish" auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item label="封面操作">
          <div class="imgList">
            <div class="imgItem" v-for="(item, index) in changeUserInfoForm.photo" :key="index">
              <i class="el-icon-circle-close delIcon" @click="del(index)"></i>
              <el-image :preview-src-list="previewList" style="width: 100px; height: 100px" :src="`${BASE_CDN_DOMAIN + item.filename}`" fit="fill"></el-image>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <!-- 推荐团队 -->
      <el-form v-if="recommendTeamVisible" :model="recommendTeamForm" ref="recommendTeamForms" label-width="100px" class="demo-ruleForm">
        <el-form-item label="推荐人ID：" prop="inviteruserid" :rules="[{ required: true, message: '推荐人ID不能为空' }]">
          <el-input v-model.number="recommendTeamForm.inviteruserid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改备注：" :rules="[{ required: true, message: '备注不能为空' }]" prop="memo">
          <el-input type="textarea" v-model="recommendTeamForm.memo"></el-input>
        </el-form-item>
      </el-form>
      <!-- 修改嘉宾分成 -->
      <el-form v-if="guestShareVisible" :model="guestShareForm" ref="guestShareForms" label-width="100px" class="demo-ruleForm">
        <el-form-item label="修改备注：" :rules="[{ required: true, message: '备注不能为空' }]" prop="memo">
          <el-input type="textarea" v-model="guestShareForm.memo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGuestAllInfo, chageGuestInfo, chageRecommend, chageGuestShare } from "@/api/guestApi.js";
import { isTimeOut } from "@/utils/date";

export default {
  props: {},
  inject: ["searchData"],
  components: {},
  data() {
    return {
      userType: {
        0: "普通用户",
        100: "嘉宾A",
        101: "嘉宾B",
        102: "嘉宾C",
        103: "嘉宾D",
        130: "嘉宾S",
        200: "超级推荐人",
      },
      dialogTitle: "",
      dialogVisible: false,
      changeUserInfoVisible: false,
      recommendTeamVisible: false,
      guestShareVisible: false,
      changeUserInfoForm: {},
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      userInfo: {},
      changeUserInfoRules: {
        nickname: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
        default_face_img: [{ required: true, message: "请选择默认头像状态", trigger: "blur" }],
      },
      // 推荐团队form
      recommendTeamForm: {
        inviteruserid: "",
        memo: "",
      },
      // 嘉宾分成form
      guestShareForm: {
        memo: "",
      },
      previewList: [],
    };
  },
  computed: {
    a() {
      console.log("nl", this.searchData);
    },
    isLockAccount() {
      const { frozen } = this.userInfo;
      if (this.userInfo.frozen && frozen.expiretime) {
        return isTimeOut(frozen.expiretime);
      } else {
        return true;
      }
    },
  },
  mounted() {},
  methods: {
    changeGuestShare() {
      this.dialogTitle = "嘉宾分成";
      this.dialogVisible = true;
      this.guestShareVisible = true;
    },
    // 修改用户
    changeUserInfo() {
      const { 昵称, 个性签名, system_face_flag, fate_photo } = this.userInfo;
      // console.log("first", this.userInfo);
      this.changeUserInfoForm = {
        nickname: 昵称,
        wish: 个性签名,
        photo: fate_photo || [],
        default_face_img: system_face_flag.toString(),
      };
      console.log("fate_photo", fate_photo);
      let preview = fate_photo ? fate_photo.map((item) => `${this.BASE_CDN_DOMAIN}${item.filename}`) : [];
      console.log("preview", preview);
      this.previewList = preview;
      this.dialogTitle = "修改资料";
      this.changeUserInfoVisible = true;
      this.dialogVisible = true;
    },
    changeRecommendTeam() {
      this.dialogTitle = "修改推荐团队";
      this.dialogVisible = true;
      this.recommendTeamVisible = true;
    },
    submitChange() {
      let formName = this.changeUserInfoVisible ? "changeUserInfoForms" : this.recommendTeamVisible ? "recommendTeamForms" : "guestShareForms";
      console.log("formName", formName);
      console.log("this.$options", this.$options.methods);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let methods = this.$options.methods;
          const that = this;
          methods[formName](that);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    async getData(data) {
      try {
        console.log("this.searchData", this.searchData);
        const res = await getGuestAllInfo(this.searchData);
        console.log("getGuestAllInfo res", res);
        if (res && res.errcode == 0) {
          this.userInfo = res.data;
        } else {
          this.$message("error", res.errmsg || "当前用户数据不存在");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || res.errmsg || "当前用户数据不存在");
      }
    },
    async changeUserInfoForms(that) {
      try {
        console.log("this.", that.changeUserInfoForm);
        const { nickname, wish, default_face_img, photo } = that.changeUserInfoForm;
        console.log("nickname", nickname);
        const params = {
          userid: that.userInfo.ID,
          nickname: nickname,
          default_face_img: default_face_img * 1,
          wish,
          photo: that.delIndex,
        };
        const res = await chageGuestInfo(params);
        console.log("res", res);
        if (res && res.errcode == 0) {
          that.$message("success", "修改成功!");
          that.close();
        } else {
          that.$message("error", "修改失败");
        }
      } catch (error) {
        console.log("error", error);
        that.$message("error", error.errmsg || "修改失败");
      }
    },
    async recommendTeamForms(that) {
      try {
        const params = that.recommendTeamForm;
        params.userid = that.userInfo.ID;
        const res = await chageRecommend(params);
        console.log("chageRecommend res ", res);
        if (res && res.errcode == 0) {
          that.$message("success", "修改成功!");
          that.close();
        } else {
          that.$message("error", "修改失败");
        }
      } catch (error) {
        console.log("error", error);
        that.$message("error", error.errmsg || "修改失败");
      }
    },
    async guestShareForms(that) {
      try {
        let params = that.guestShareForm;
        params.userid = that.userInfo.ID;
        const res = await chageGuestShare(params);
        console.log("chageGuestShare res", res);
        if (res && res.errcode == 0) {
          that.$message("success", "修改成功!");
          that.close();
        } else {
          that.$message("error", "修改失败");
        }
      } catch (error) {
        console.log("error", error);
        that.$message("error", error.errmsg || "修改失败");
      }
    },
    del(index) {
      // console.log("del", this.delIndex);
      let photo = [...this.changeUserInfoForm.photo];
      photo.splice(index, 1);
      // console.log("newArr", photo);
      this.changeUserInfoForm.photo = photo;
      this.delIndex = [].concat(this.delIndex, [index]);
      // console.log("delIndex", this.delIndex);
    },
    close() {
      this.delIndex = [];
      this.dialogVisible = false;
      this.guestShareVisible = false;
      this.recommendTeamVisible = false;
      this.changeUserInfoVisible = false;
    },
  },
};
</script>

<style scoped>
.box {
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding: 0 20px 0 0;
  background-color: #fff;
  height: calc(100vh - 70px - 120px);
  position: relative;
}
.box > div {
  padding-left: 20px;
}
.header {
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
}
.first {
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.first p,
.second p,
.third > div,
.four p {
  margin: 15px 0;
}
.second {
  font-size: 14px;
}
.avatarBox {
  display: flex;
}
.third > div,
.four {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.avatar {
  margin: 10px 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.footer {
  position: absolute;
  background-color: #eee;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  /* border: 1px solid blue; */
}
.imgList {
  box-sizing: border-box;
  padding: 10px 0;
  /* border: 1px solid red; */
  display: flex;
  overflow-x: scroll;
}
.imgItem {
  position: relative;
  margin: 0 10px;
}
.delIcon {
  position: absolute;
  color: red;
  font-size: 20px;
  top: -9px;
  right: -10px;
}
</style>
