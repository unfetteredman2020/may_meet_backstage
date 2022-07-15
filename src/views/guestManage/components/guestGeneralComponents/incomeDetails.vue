<template>
  <div>
    <customTable :tableConfig="tableConfig" />
  </div>
</template>

<script>
import { incomeDetail } from "@/api/guestApi.js";
import customTable from "@/components/customTable.vue";
export default {
  props: {},
  inject: ["searchData"],
  components: {
    customTable,
  },
  data() {
    return {
      tableConfig: {
        data: [],
        column: [
          { label: "业务流水号", value: "业务流水号" },
          { label: "收益来源", value: "收益来源" },
          { label: "零钱", value: "零钱" },
          { label: "来源描述内容", value: "来源描述内容" },
          { label: "创建时间", value: "创建时间" },
        ],
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getData() {
      try {
        console.log("incomeDetail", this.searchData);
        const { date, ...rs } = this.searchData;
        let params = rs;
        params.starttime = date[0];
        params.endtime = date[1];
        console.log("params", params);
        const res = await incomeDetail(params);
        console.log("incomeDetail res", res);
        if (res && res.errcode == 0) {
          this.tableConfig.data = res.data;
        } else {
          this.$message("error", res.errmsg || "当前用户数据不存在");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || error.errmsg || "当前用户数据不存在");
      }
    },
  },
};
</script>

<style scoped></style>
