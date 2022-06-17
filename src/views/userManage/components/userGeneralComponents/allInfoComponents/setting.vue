<template>
  <div>
    <el-button type="primary" plain icon="el-icon-user" @click="changeUserInfo">修改资料</el-button>
    <el-button type="primary" plain icon="el-icon-view" @click="sensitiveInfoVisible = true">敏感信息</el-button>
    <el-button
      type="primary"
      plain
      icon="el-icon-lock"
      @click="
        lockVisible = true;
        type = 'account';
      "
    >
      封禁账号
    </el-button>
    <el-button type="primary" plain icon="el-icon-lock">封禁设备</el-button>
    <el-button type="primary" plain icon="el-icon-document-delete">禁用私聊</el-button>
    <el-button type="primary" plain icon="el-icon-circle-close">禁用动态</el-button>
    <el-button type="primary" plain icon="el-icon-money">禁用提现</el-button>
    <el-button type="primary" plain icon="el-icon-cpu">解绑功能</el-button>
    <el-button type="primary" plain icon="el-icon-message-solid">系统提醒</el-button>
    <el-button type="primary" plain icon="el-icon-switch-button">注销账号</el-button>
    <el-button type="primary" plain icon="el-icon-edit">标记为秘书</el-button>
    <el-button type="primary" plain icon="el-icon-s-promotion">发送客诉沟通消息</el-button>
    <!-- 修改资料 -->
    <el-dialog title="修改资料" :visible.sync="changeUserInfoVisible" class="userInfoDialog" width="700px">
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
              <i class="el-icon-circle-close delIcon" @click="del"></i>
              <el-image :preview-src-list="changeUserInfoForm.photo" style="width: 100px; height: 100px" :src="`${BASE_CDN_DOMAIN + item.filename}`" fit="fill"></el-image>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeUserInfoVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitChange" size="mini">确 定</el-button>
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
    <!-- 封禁账号 -->
    <LockDialog :lockVisible="lockVisible" :type="type" :userInfo="userInfo" />
  </div>
</template>

<script>
import { changeUserInfo } from "@/api/userApi.js";

import { isTimeOut } from "@/utils/date.js";
import LockDialog from "./lockDialogComponent.vue";
export default {
  components: {
    LockDialog: LockDialog,
  },
  props: {
    userInfo: {
      type: Object,
      default: {}
    },
  },
  // 定义属性
  data() {
    return {
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      changeUserInfoVisible: false,
      sensitiveInfoVisible: false, //敏感信息
      lockVisible: false, // 封禁账号
      type: "", // 'account' or 'device'
      changeUserInfoForm: {},
      changeUserInfoRules: {
        nickname: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
        default_face_img: [{ required: true, message: "请选择默认头像状态", trigger: "blur" }],
      },
    };
  },
  computed: {},
  mounted() {
    const bool = isTimeOut("2022-06-16 11:47:59");
    console.log("bool", bool);
  },
  methods: {
    closeDialog() {
      this.lockVisible = false;
    },
    async submitChange() {
      console.log("this.changeUserInfoForm", this.changeUserInfoForm);
    },
    // 修改用户
    changeUserInfo() {
      const { nickname, wish, system_face_flag, fate_photo } = this.userInfo;
      console.log("first", this.userInfo);
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
          userid: this.storeUserInfo.userid,
          nickname,
          default_face_img,
          wish,
          photo,
        };
        const res = await changeUserInfo(params);
        if (res && res.errcode == 0) {
          this.$message("success", "修改用户信息成功！");
        } else {
          this.$message("error", "修改用户信息失败！");
        }
      } catch (error) {
        this.$message("error", error.errmsg || "修改用户信息失败！");
      }
    },
    del() {
      console.log("del");
    },
    async submitChange() {
      console.log("this.changeUserInfoForm", this.changeUserInfoForm);
    },
  },
};
</script>

<style scoped>
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
