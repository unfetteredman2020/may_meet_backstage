<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column v-for="item in columns" :key="item" :label="item" :prop="item"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRewardRecord } from "@/api/userApi.js";
export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      columns: ["流水号", "奖励发送类型", "奖励次数", "奖励金币", "奖励内容", "业务代码", "奖励用户", "创建时间"], // table 每一列数据
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    async getData(data = {}) {
      try {
        const res = await getRewardRecord(data);
        console.log("getRewardRecord res", res);
        if (res && res.errcode == 0) {
          this.data = res.data || [];
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
  },
};
</script>

<style scoped></style>
