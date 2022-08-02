<template>
  <div class="loginBox">
    <div class="centerBox">
      <div class="pannel">
        <p>誓聊交友</p>
        <p>CONTENT MANAGEMENT SYSTEM</p>
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="userid">
            <el-input placeholder="请输入用户ID" v-model="loginForm.userid" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.pwd" autocomplete="off" maxlength="20" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="submitForm('loginForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="copyRight">©2018- 杭州奕游网络科技有限公司 版权所有</div>
  </div>
</template>

<script>
// import { login, signLogin } from "@/api/userApi.js";
// import { getMd5 } from "@/utils/md5";
import { mapMutations } from "vuex";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  props: {},
  data() {
    //这⾥存放数据
    return {
      loginForm: {
        userid: "100005",
        pwd: "123456",
      },
      rules: {
        userid: [{ required: true, message: "用户ID不能为空" }],
        pwd: [{ required: true, message: "密码不能为空" }],
      },
      redirect: null,
    };
  },
  //监控data中的数据变化
  watch: {
    $route: {
      handler: function (route) {
        console.log("route", route);
        const query = route.query;
        if (query) {
          console.log('query.redirect', query.redirect)
          this.redirect = query.redirect;
        }
      },
      immediate: true,
    },
  },
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    async submit() {
      try {
        console.log("this.redirect", this.redirect);
        await this.$store.dispatch("login", this.loginForm);
        this.$message("success", "登录成功");
        this.$nextTick(() => {
          let url = (this.redirect && decodeURIComponent(this.redirect)) || "/";
          console.log("url", url);
          this.$router.replace({ path: url });
          this.redirect && location.reload()  //解决缓存问题
        });
      } catch (error) {
        this.$message("error", error.errmsg || "登录失败，请检查账号和密码");
      }
    },
  },
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期，挂载完成（可以访问dom元素）
  mounted() {
    // console.log('this.$stor1e', this.$store)
    // let backlen = window.history.length - 1;
    // console.log("backlen", backlen);
    // this.$route.query && this.$route.query.redirect && window.history.go(-backlen);
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
.loginBox {
  border: 1px solid red;
  background: #fff;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.centerBox {
  margin: 0;
  padding: 0;
  position: absolute;
  /* border: 1px solid blue; */
  width: 300px;
  height: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}
.copyRight {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  text-align: center;
  font-size: 13px;
  color: #d3c1cc;
  text-align: center;
}
.pannel p {
  margin: 0;
}
.pannel p:nth-child(1) {
  font-size: 72px;
  font-weight: 300;
  color: #d5007f;
  text-indent: 2px;
  letter-spacing: 2px;
}

.pannel p:nth-child(2) {
  font-size: 17px;
  margin-top: -10px;
  font-family: "Microsoft Yahei";
  color: #555;
}
.loginForm {
  /* border: 1px solid orange; */
  margin-top: 50px;
}
.btn {
  width: 296px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  background-color: #d5007f;
}
</style>
