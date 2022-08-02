<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm"  ref="agentGuestRef">
      <el-form-item label="代理人ID：" prop="proxy_id">
        <el-input v-model="searchForm.proxy_id" placeholder="代理人ID"></el-input>
      </el-form-item>
      <el-form-item label="统计日期：" prop="date" :rules="[{ required: true, message: '请选择统计日期' }]">
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="searchForm.date"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="830px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="嘉宾ID" prop="userid"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="统计日期" prop="统计日期"></el-table-column>
      <el-table-column label="代理人" prop="代理人"></el-table-column>
      <el-table-column label="当日收益" prop="当日收益"></el-table-column>
      <el-table-column label="总收益" prop="总收益"></el-table-column>
      <el-table-column label="分成比例" prop="分成比例"></el-table-column>
      <el-table-column label="结算状态" prop="结算状态"></el-table-column>
      <el-table-column label="所属推荐团队" prop="所属推荐团队"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAgencyIncome, setRecommendRole } from "@/api/guestApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        date: null,
        proxy_id: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit() {
      let params = clearEmptyObj(this.searchForm);
      this.getData(params);
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
          this.$message("error", res.errmsg || "修改失败，请稍后重试");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "修改失败，请稍后重试");
      }
    },
    async getData(data = {}) {
      try {
        const { date, ...rs } = data;
        let params = rs || {};
        date && ((params.starttime = date[0]), (params.endtime = date[1]));
        const res = await getAgencyIncome(params);
        console.log("getAgencyIncome", res);
        if (res && res.errcode == 0) {
          this.data = res.data;
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg ||  "获取数据失败，请稍后重试！");
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
