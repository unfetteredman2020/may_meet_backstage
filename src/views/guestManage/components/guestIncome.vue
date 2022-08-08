<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm" ref="guestIncomeRef">
      <el-form-item label="嘉宾ID：" prop="guest_id">
        <el-input v-model="searchForm.guest_id" placeholder="嘉宾ID"></el-input>
      </el-form-item>
      <el-form-item label="时间：" prop="date" :rules="[{ required: true, message: '请选择时间' }]">
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="searchForm.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('guestIncomeRef')">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" :max-height="tableHeight" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="创建时间" prop="inserttime"></el-table-column>
      <el-table-column label="嘉宾ID" prop="userid"></el-table-column>
      <el-table-column label="嘉宾昵称" prop="nickname"></el-table-column>
      <el-table-column label="私信收益" prop="私信收益"></el-table-column>
      <el-table-column label="音视频收益" prop="音视频收益"></el-table-column>
      <el-table-column label="礼物收益" prop="礼物收益"></el-table-column>
    </el-table>
    <customPagination :tt="total" />
  </div>
</template>

<script>
import { getGuestIncome } from "@/api/guestApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";
const customPagination = () => import("@/components/customPagination.vue");
import getTableHeight from '@/mixin/getTableHeight.js'
export default {
  mixins: [getTableHeight],
  props: {},
  components: { customPagination },
  data() {
    return {
      data: [],
      searchForm: {
        guest_id: null,
        date: ["2022-01-01", "2022-09-01"],
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
      total: 0,
      page_index: 0,
      page_per_count: 30,
    };
  },
  created() {
    
  },
  computed: {},
  mounted() {
    this.subCount = 170
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setPagination(page_per_count, page_index) {
      console.log("page_per_count", page_per_count);
      console.log("page_index", page_index);
      page_per_count && (this.page_per_count = page_per_count);
      page_index && (this.page_index = page_index)
      this.getData(page_per_count, page_index);
    },
    async getData(page_per_count,page_index ) {
      try {
        const { date, ...rs } = clearEmptyObj(this.searchForm)
        let params = rs || {};
        date && ((params.starttime = date[0]), (params.endtime = date[1]));
        params.page_per_count = page_per_count || this.page_per_count
        params.page_index = page_index  ?? this.page_index
        console.log('params', params)
        const res = await getGuestIncome(params);
        console.log("getGuestIncome", res);
        if (res && res.errcode == 0) {
          res.data && res.data.length && res.data[0]?.record_count && (this.total = res.data[0]?.record_count);
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
