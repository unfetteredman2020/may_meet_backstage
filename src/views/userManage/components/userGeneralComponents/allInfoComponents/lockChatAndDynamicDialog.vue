<template>
  <div>
    <el-dialog :title="type == 'chat' ? '禁用私聊' : type == 'dynamic' ? '禁用动态' : '禁用提现'" :visible.sync="lockChatAndDynamicVisisble">
      <el-form :model="form" ref="lockChatAndDynamicForm">
        <el-form-item label="封禁时间：" label-width="120" prop="hours" :rules="[{ required: true, message: '请选择封禁时间', trigger: 'blur' }]">
          <el-select v-model="form.hours" placeholder="请选择封禁时间">
            <el-option label="1小时" value="1"></el-option>
            <el-option label="12小时" value="2"></el-option>
            <el-option label="1天" value="3"></el-option>
            <el-option label="3天" value="4"></el-option>
            <el-option label="7天" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('lockChatAndDynamicForm')" >取消</el-button>
        <el-button type="primary" @click="submitForm('lockChatAndDynamicForm')" >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { lockPrivateChat, lockDynamic, lockWithdrawal } from "@/api/userApi.js";

export default {
  name: 'lockChatAndDyanmicDialog',
  props: {
    lockChatAndDynamicVisisble: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    }, // 'account' or 'device'
    userInfo: {
      type: Object,
      default: {},
    },
  },
  components: {},
  data() {
    return {
      fileList: [],
      form: {
        hours: "",
      },
    };
  },
  computed: {
    visible: {
      get() {
        return this.lockChatAndDynamicVisisble;
      },
      set(value) {
        this.$parent.closeDialog("lockChatAndDynamicVisisble");
      },
    },
  },
  mounted() {
  },
  watch: {},
  methods: {
    async submit() {
      try {
        let params = { ...this.form, userid: this.userInfo.userid };
        params.hours = params.hours * 1;
        let func = {
          chat: (data) => lockPrivateChat(data),
          dynamic: (data) => lockDynamic(data),
          withdrawal: (data) => lockWithdrawal(data),
        };
        // console.log("params", params);
        const res = await func[this.type](params);
        // console.log("submit res", res);
        if (res && res.errcode == 0) {
          this.$alert("操作成功！", "成功提示");
          this.resetForm("lockChatAndDynamicVisisble");
        } else {
          this.$message("error", res.errmsg || "修改失败！");
        }
      } catch (error) {
        // console.log("submit error", error);
        this.$message("error", error.errmsg || "修改失败！");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$parent.closeDialog("lockChatAndDynamicVisisble");
      this.$refs.lockChatAndDynamicForm.resetFields();
    },
  },
};
</script>

<style scoped></style>
