<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :rules="rules" :model="searchForm" ref="agentGuestRef">
      <el-form-item label="嘉宾ID" prop="guest_id">
        <el-input v-model="searchForm.guest_id" placeholder="嘉宾ID"></el-input>
      </el-form-item>
      <el-form-item label="嘉宾昵称" prop="guest_name">
        <el-input v-model="searchForm.guest_name" placeholder="嘉宾昵称"></el-input>
      </el-form-item>
      <el-form-item label="代理人ID：" prop="proxy_id">
        <el-input v-model="searchForm.proxy_id" placeholder="代理人ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('agentGuestRef')">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="嘉宾ID" prop="嘉宾ID"></el-table-column>
      <el-table-column label="昵称" prop="昵称"></el-table-column>
      <el-table-column label="嘉宾分成" prop="嘉宾分成"></el-table-column>
      <el-table-column label="代理分成" prop="代理分成"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-s-tools setting" @click="set(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAgentGuest, setRecommendRole } from "@/api/guestApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        guest_id: null,
        guest_name: null,
        proxy_id: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      rules: {
        proxy_id: [{ required: true, message: "请输入代理人ID" }],
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = clearEmptyObj(this.searchForm);
          this.getData(params);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    set(user) {
      console.log("user", user);
      this.$prompt("请输入备注", "推荐专区权限", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "请输入备注",
        inputValidator: (value) => {
          if (!value || value.replace(/(^s)(s$)/g, "").length == 0) {
            return false;
          }
        },
      })
        .then(({ value }) => {
          console.log("value", value);
          this.setRole(user, value);
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    async setRole(user, value) {
      try {
        const res = await setRecommendRole({ userid: user.userid, memo: value });
        console.log("setRecommendRole res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改成功！");
        } else {
          this.$message("error", "修改失败，请稍后重试");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "修改失败，请稍后重试");
      }
    },
    async getData(data = {}) {
      try {
        const res = await getAgentGuest(data);
        console.log("getAgentGuest", res);
        if (res && res.errcode == 0) {
          this.data = res.data;
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    resetForm() {
      this.$refs.agentGuestRef.resetFields();
    },
  },
};
</script>

<style scoped>
.setting {
  /* border: 1px solid red; */
  font-size: 25px;
  color: #d1289c;
}
.imgBox {
  /* border: 1px solid blue; */
  height: 40px;
}
</style>
