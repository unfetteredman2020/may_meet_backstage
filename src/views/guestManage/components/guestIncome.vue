<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm"  ref="guestIncomeRef">
      <el-form-item label="嘉宾ID：" prop="guest_id">
        <el-input v-model="searchForm.guest_id" placeholder="嘉宾ID"></el-input>
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
      <el-table-column label="创建时间" prop="inserttime"></el-table-column>
      <el-table-column label="嘉宾ID" prop="userid"></el-table-column>
      <el-table-column label="嘉宾昵称" prop="nickname"></el-table-column>
      <el-table-column label="私信收益" prop="私信收益"></el-table-column>
      <el-table-column label="音视频收益" prop="音视频收益"></el-table-column>
      <el-table-column label="礼物收益" prop="礼物收益"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGuestIncome, setRecommendRole } from "@/api/guestApi.js";
import { isTimeOut } from "@/utils/date";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        guest_id: null,
        date: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit() {
      this.getData(clearEmptyObj(this.searchForm));
    },
    async getData(data = {}) {
      try {
        const { date, ...rs } = data;
        let params = rs || {};
        date && ((params.starttime = date[0]), (params.endtime = date[1]));
        const res = await getGuestIncome(params);
        console.log("getGuestIncome", res);
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
