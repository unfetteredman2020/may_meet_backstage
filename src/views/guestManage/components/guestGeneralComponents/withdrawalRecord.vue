<template>
  <div>
    <el-table :data="data" stripe style="width: 100%" max-height="750px" border :header-cell-style="{ background: '#f2f3f4', height: '35px', 'line-height': '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" class="customTableStyle"
      :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px' }">
      <el-table-column prop="我方订单号" label="我方订单号" width="100px"></el-table-column>
      <el-table-column prop="通道订单号" label="通道订单号" width="270px"></el-table-column>
      <el-table-column prop="提现方式" label="提现方式"></el-table-column>
      <el-table-column prop="提现金额" label="提现金额"></el-table-column>
      <el-table-column prop="到账金额" label="到账金额"></el-table-column>
      <el-table-column prop="打款账户名称" label="打款账户名称" width="100px"></el-table-column>
      <el-table-column prop="状态" label="状态"></el-table-column>
      <el-table-column prop="状态时间戳" label="状态时间戳" width="150px"></el-table-column>
      <el-table-column prop="状态原因" label="状态原因" width="150px"></el-table-column>
      <el-table-column prop="提现时间" label="提现时间" width="100px"></el-table-column>
      <el-table-column prop="我方订单号" label="我方订单号" width="100px"></el-table-column>
      <el-table-column label="银行账户ID" width="100px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.bankinfo.id_card }}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行账户名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.bankinfo.real_name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getwithdrawalRecord } from "@/api/guestApi.js";
import customTable from "@/components/customTable.vue";
export default {
  props: {},
  inject: ["searchData"],
  components: {
    customTable,
  },
  data() {
    return {
      data: [],
      column: [
        { label: "我方订单号", value: "我方订单号" },
        { label: "通道订单号", value: "通道订单号" },
        { label: "提现方式", value: "提现方式" },
        { label: "提现金额", value: "提现金额" },
        { label: "到账金额", value: "到账金额" },
        { label: "打款账户名称", value: "打款账户名称" },
        { label: "状态", value: "状态" },
        { label: "状态时间戳", value: "状态时间戳" },
        { label: "状态原因", value: "状态原因" },
        { label: "提现时间", value: "提现时间" },
        { label: "bankinfo", value: "bankinfo" },
      ],
    };
  },
  computed: {},
  mounted() { },
  methods: {
    async getData() {
      try {
        console.log("getwithdrawalRecord", this.searchData);
        const { date, ...rs } = this.searchData;
        let params = rs;
        params.starttime = date[0];
        params.endtime = date[1];
        console.log("params", params);
        const res = await getwithdrawalRecord(params);
        console.log("getwithdrawalRecord res", res);
        if (res && res.errcode == 0) {
          this.data = res.data;
        } else {
          this.$message("error", res.errmsg || "当前用户数据不存在");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "当前用户数据不存在");
      }
    },
  },
};
</script>

<style scoped></style>
