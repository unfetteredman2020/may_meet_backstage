<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm"  ref="settlementRecordRef">
      <el-form-item label="推荐团队ID：" prop="group_id">
        <el-input v-model="searchForm.group_id" placeholder="嘉宾ID"></el-input>
      </el-form-item>
      <el-form-item label="时间：" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="searchForm.date"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="日期" prop="日期"></el-table-column>
      <el-table-column label="推荐团队id" prop="推荐团队id"></el-table-column>
      <el-table-column label="推荐人" prop="推荐人"></el-table-column>
      <el-table-column label="推荐团队名称" prop="推荐团队名称"></el-table-column>
      <el-table-column label="应发金额（元）" prop="应发金额"></el-table-column>
      <el-table-column label="实发金额（元）" prop="实发金额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSettlementRecord } from "@/api/recommendApi.js";
import { isTimeOut } from "@/utils/date";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        group_id: null,
        date: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
    };
  },
  computed: {},
  mounted() {},
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
    async getData(data = {}) {
      try {
        const { date, ...rs } = data;
        let params = rs || {};
        date && ((params.starttime = date[0]), (params.endtime = date[1]));
        const res = await getSettlementRecord(params);
        console.log("getSettlementRecord", res);
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
      this.$refs.settlementRecordRef.resetFields();
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
