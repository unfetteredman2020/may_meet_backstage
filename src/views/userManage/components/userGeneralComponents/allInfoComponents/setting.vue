<template>
  <div class="settingBoxs">
    <el-button size="mini" type="primary" plain icon="el-icon-user" @click="changeUserInfo">修改资料</el-button>
    <el-button size="mini" type="primary" plain icon="el-icon-view" @click="sensitiveInfoVisible = true">敏感信息</el-button>
    <el-button
      type="primary"
      size="mini"
      plain
      :icon="isTimeOut((userInfo.frozen && userInfo.frozen.expiretime) || '') ? 'el-icon-lock' : 'el-icon-unlock'"
      @click="
        lockAccountAndDeviceVisible = true;
        type = 'account';
      "
    >
      {{ isTimeOut((userInfo.frozen && userInfo.frozen.expiretime) || "") ? "封禁账号" : "解封账号" }}
    </el-button>
    <el-button
      size="mini"
      type="primary"
      plain
      :icon="isTimeOut((userInfo.frozen_device && userInfo.frozen_device.expiretime) || '') ? 'el-icon-lock' : 'el-icon-unlock'"
      @click="
        lockAccountAndDeviceVisible = true;
        type = 'device';
      "
    >
      {{ isTimeOut((userInfo.frozen_device && userInfo.frozen_device.expiretime) || "") ? "封禁设备" : "解封设备" }}
    </el-button>
    <el-button
      size="mini"
      type="primary"
      plain
      :icon="isTimeOut((userInfo.frozen_chat && userInfo.frozen_chat.expiretime) || '') ? 'el-icon-document-delete' : 'el-icon-unlock'"
      @click="
        lockChatAndDynamicVisisble = true;
        type = 'chat';
      "
    >
      {{ isTimeOut((userInfo.frozen_chat && userInfo.frozen_chat.expiretime) || "") ? "禁用私聊" : "解除私聊禁用" }}
    </el-button>
    <el-button
      size="mini"
      type="primary"
      plain
      :icon="isTimeOut((userInfo.frozen_post && userInfo.frozen_post.expiretime) || '') ? 'el-icon-circle-close' : 'el-icon-unlock'"
      @click="
        lockChatAndDynamicVisisble = true;
        type = 'dynamic';
      "
    >
      {{ isTimeOut((userInfo.frozen_post && userInfo.frozen_post.expiretime) || "") ? "禁用动态" : "解除禁用动态" }}
    </el-button>
    <el-button
      size="mini"
      type="primary"
      plain
      :icon="isTimeOut((userInfo.frozen_withdraw && userInfo.frozen_withdraw.expiretime) || '') ? 'el-icon-money' : 'el-icon-unlock'"
      @click="
        lockChatAndDynamicVisisble = true;
        type = 'withdrawal';
      "
    >
      {{ isTimeOut((userInfo.frozen_withdraw && userInfo.frozen_withdraw.expiretime) || "") ? "禁用提现" : "解除禁用提现" }}
    </el-button>
    <el-button size="mini" type="primary" plain icon="el-icon-cpu">解绑功能</el-button>
    <el-button size="mini" type="primary" plain icon="el-icon-message-solid">系统提醒</el-button>
    <el-button size="mini" type="primary" plain icon="el-icon-switch-button">注销账号</el-button>
    <el-button size="mini" type="primary" plain icon="el-icon-edit">标记为秘书</el-button>
    <el-button size="mini" type="primary" plain icon="el-icon-s-promotion">发送客诉沟通消息</el-button>
    <!-- 修改资料 -->
    <el-dialog title="修改资料" :visible.sync="changeUserInfoVisible" class="userInfoDialog" width="700px" :close-on-click-modal="false">
      <el-form :model="changeUserInfoForm" :rules="changeUserInfoRules" ref="changeUserInfoForm" label-width="120px" class="demo-changeUserInfoForm" size="mini">
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
              <el-image @click="setPreview(index)" :preview-src-list="previewList" style="width: 100px; height: 100px" :src="`${BASE_CDN_DOMAIN + item.filename}`" fit="fill"></el-image>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeUserInfoVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitChange('changeUserInfoForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 敏感信息 -->
    <el-dialog title="敏感信息" :visible.sync="sensitiveInfoVisible" width="30%">
      <p style="text-align: center">用户ID：{{ userInfo.userid }}</p>
      <p style="text-align: center">手机号：{{ userInfo.phone }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sensitiveInfoVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 封禁账号 & 封禁时间 -->
    <LockAccountAndDeviceDialog :lockAccountAndDeviceVisible="lockAccountAndDeviceVisible" :type="type" :userInfo="userInfo" />

    <!-- 禁用私聊 & 动态 -->
    <LockChatAndDynamicDialog :lockChatAndDynamicVisisble="lockChatAndDynamicVisisble" :type="type" :userInfo="userInfo" />
  </div>
</template>

<script>
import { changeUserInfo, lockPrivateChat } from "@/api/userApi.js";
import { isTimeOut } from "@/utils/date.js";
import LockAccountAndDeviceDialog from "./lockAccountAndDeviceDialog.vue";
import LockChatAndDynamicDialog from "./lockChatAndDynamicDialog.vue";
export default {
  components: {
    LockAccountAndDeviceDialog: LockAccountAndDeviceDialog,
    LockChatAndDynamicDialog: LockChatAndDynamicDialog,
  },
  props: {
    userInfo: {
      type: Object,
      default: {},
    },
  },
  // 定义属性
  data() {
    return {
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      changeUserInfoVisible: false,
      sensitiveInfoVisible: false, //敏感信息
      lockAccountAndDeviceVisible: false, // 封禁账号
      lockPrivateChatVisible: false, //禁用私聊
      lockChatAndDynamicVisisble: false, // 禁用私聊和动态
      type: "", // 'account' or 'device'
      changeUserInfoForm: {},
      previewList: [],
      delIndex: [],
      changeUserInfoRules: {
        nickname: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
        default_face_img: [{ required: true, message: "请选择默认头像状态", trigger: "blur" }],
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    isTimeOut(time) {
      if (!time) {
        return true;
      } else {
        return isTimeOut(time);
      }
    },
    // 关闭打开的dialog
    closeDialog(dialogName) {
      this[dialogName] = false;
    },
    // 动态计算预览图片
    setPreview(index) {
      let origin = this.userInfo.fate_photo;
      let before = origin.slice(index);
      let after = origin.slice(0, index);
      let newArr = new Array().concat(before, after);
      let a = [];
      newArr.forEach((item) => a.push(`${this.BASE_CDN_DOMAIN + item.filename}`));
      this.previewList = a;
    },
    async submitChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleChange();
          // console.log("this.changeUserInfoForm", this.changeUserInfoForm);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改用户
    changeUserInfo() {
      const { nickname, wish, system_face_flag, fate_photo } = this.userInfo;
      // console.log("first", this.userInfo);
      this.changeUserInfoForm = {
        nickname,
        wish,
        photo: fate_photo || [],
        default_face_img: system_face_flag.toString(),
      };
      this.changeUserInfoVisible = true;
    },
    // 修改用户信息
    async handleChange() {
      try {
        const { nickname, wish, default_face_img, photo } = this.changeUserInfoForm;
        const params = {
          userid: this.userInfo.userid,
          nickname,
          default_face_img: default_face_img * 1,
          wish,
          photo: this.delIndex,
        };
        // console.log("handleChange");
        const res = await changeUserInfo(params);
        // console.log("changeUserInfo res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改用户信息成功！");
        } else {
          this.$message("error", "修改用户信息失败！");
        }
      } catch (error) {
        // console.log("error", error);
        this.$message("error", error.errmsg || "修改用户信息失败！");
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
  },
};
</script>

<style scoped>
.settingBoxs {
  /* border: 1px solid red; */
  min-width: 1400px;
}
.userInfoDialog {
  /* border: 1px solid blue; */
  min-width: 700px;
}
.imgList {
  display: flex;
  flex-wrap: nowrap;
  /* width: 100%; */
  /* min-width: 500px; */
  overflow-x: auto;
  /* border: 1px solid red; */
}
.imgItem {
  margin: 0 5px 0 0;
  position: relative;
  /* min-width: 80px; */
  /* pointer-events: none; */
}

.delIcon {
  position: absolute;
  z-index: 999;
  color: #fff;
  top: 0;
  right: 0;
}
</style>
