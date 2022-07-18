<template>
  <div>
    <el-tabs v-model="activeName" type="card" style="margin: 0; padding: 0">
      <el-tab-pane name="revenueRecord">
        <span slot="label">
          <i class="el-icon-news"></i>
          收益记录
        </span>
        <revenueRecord ref="revenueRecord" />
      </el-tab-pane>
      <el-tab-pane name="settlementRecord">
        <span slot="label">
          <i class="el-icon-notebook-2"></i>
          结算记录
        </span>
        <settlementRecord ref="settlementRecord" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const revenueRecord = () => import("./incomeModuleComponents/revenueRecord.vue");
const settlementRecord = () => import("./incomeModuleComponents/settlementRecord.vue");

export default {
  props: {},
  components: { revenueRecord, settlementRecord },
  data() {
    return {
      activeName: "revenueRecord",
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
