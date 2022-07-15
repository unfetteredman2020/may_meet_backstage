<template>
  <el-table :data="data" style="width: 100%" max-height="700px" border :header-cell-style="{ height: '20px', 'line-height': '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px' }">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="通话状态">
            <span>{{ props.row.通话状态 }}</span>
          </el-form-item>
          <el-form-item label="折扣券">
            <span>{{ props.row.折扣 }}</span>
          </el-form-item>
          <el-form-item label="音频文件地址">
            <span>{{ props.row.文件地址 }}</span>
          </el-form-item>
          <el-form-item label="呼叫时间">
            <span>{{ props.row.呼叫时间 }}</span>
          </el-form-item>
          <el-form-item label="接通时间">
            <span>{{ props.row.接通时间 }}</span>
          </el-form-item>
          <el-form-item label="结束时间">
            <span>{{ props.row.结束时间 }}</span>
          </el-form-item>
          <el-form-item label="结束类型">
            <span>{{ props.row.结束类型 }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="通话记录ID" prop="通话记录ID"></el-table-column>
    <el-table-column label="通话类型" prop="通话类型"></el-table-column>
    <el-table-column label="主叫用户" prop="主叫用户"></el-table-column>
    <el-table-column label="被叫用户" prop="被叫用户"></el-table-column>
    <el-table-column label="付费用户" prop="付费用户"></el-table-column>
    <el-table-column label="话时长(s)" prop="话时长"></el-table-column>
    <el-table-column label="通话总金币" prop="通话总金币"></el-table-column>
    <el-table-column label="实扣金币" prop="实扣金币"></el-table-column>
    <el-table-column label="创建时间" prop="创建时间"></el-table-column>
  </el-table>
</template>

<script>
import { getCallLog } from "@/api/guestApi.js";
export default {
  props: {},
  inject: ["searchData"],
  components: {},
  data() {
    return {
      data: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getData(data) {
      try {
        console.log("getCallLog", this.searchData);
        const { date, ...rs } = this.searchData;
        let params = rs;
        params.starttime = date[0];
        params.endtime = date[1];
        console.log("params", params);
        const res = await getCallLog(params);
        console.log("getCallLog res", res);
        if (res && res.errcode == 0) {
          this.data = res.data || [];
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg ||  "获取数据失败，请稍后重试！");
      }
    },
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
  margin-left: 20px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
