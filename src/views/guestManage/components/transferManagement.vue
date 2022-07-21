<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm"  ref="guestIncomeRef">
      <el-form-item label="用户ID：" prop="proxy_id">
        <el-input v-model="searchForm.proxy_id" placeholder="嘉宾ID"></el-input>
      </el-form-item>
      <el-form-item label="时间：" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="searchForm.date"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="800px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="记录id" prop="记录id"></el-table-column>
      <el-table-column label="备用账号id" prop="备用账号id"></el-table-column>
      <el-table-column label="备用账号昵称" prop="备用账号昵称"></el-table-column>
      <el-table-column label="转账金额" prop="转账金额"></el-table-column>
      <el-table-column label="创建时间" prop="创建时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTransferManagement, setRecommendRole } from "@/api/guestApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";
import { isTimeOut } from "@/utils/date";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        proxy_id: null,
        date: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    isLockAccount(userInfo) {
      const { frozen } = userInfo;
      if (userInfo.frozen && frozen.expiretime) {
        return isTimeOut(frozen.expiretime);
      } else {
        return true;
      }
    },
    onSubmit() {
      this.getData(clearEmptyObj(this.searchForm));
    },
    async getData(data = {}) {
      try {
        const { date, ...rs } = data;
        let params = rs || {};
        date && ((params.starttime = date[0]), (params.endtime = date[1]));
        const res = await getTransferManagement(params);
        console.log("getTransferManagement", res);
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
      this.$refs.guestIncomeRef.resetFields();
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
.coverImg {
  /* border: 1px solid red; */
}
</style>
