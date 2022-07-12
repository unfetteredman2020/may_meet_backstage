<template>
  <el-table :data="data" style="width: 100%" max-height="700px" border :header-cell-style="{ height: '20px', 'line-height': '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px' }">
    <el-table-column label="业务ID" prop="业务ID"></el-table-column>
    <el-table-column label="价值" prop="价值"></el-table-column>
    <el-table-column label="对方昵称" prop="对方昵称"></el-table-column>
    <el-table-column label="收益零钱" prop="收益零钱"></el-table-column>
    <el-table-column label="礼物名称" prop="礼物名称"></el-table-column>
    <el-table-column label="创建时间" prop="创建时间"></el-table-column>
  </el-table>
</template>

<script>
import { getReceiveGift } from "@/api/guestApi.js";
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
        console.log("getReceiveGift", this.searchData);
        const { date, ...rs } = this.searchData;
        let params = rs;
        params.starttime = date[0];
        params.endtime = date[1];
        // id && (params.id = id)
        console.log("params", params);
        const res = await getReceiveGift(params);
        console.log("getReceiveGift res", res);
        if (res && res.errcode == 0) {
          this.data = res.data || [];
        } else {
          this.$message("error", "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取数据失败，请稍后重试！");
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
