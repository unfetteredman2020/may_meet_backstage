<template>
  <div>
    <el-form :inline="true" :model="formInline" class="guestGeneralForm" size="mini" ref="guestSearchRef">
      <el-form-item label="可遇ID：" prop="userid" :rules="[{ required: true, message: 'ID不能为空' }]">
        <el-input v-model="formInline.userid" placeholder="可遇ID"></el-input>
      </el-form-item>
      <el-form-item label="流水号：">
        <el-input v-model="formInline.id" placeholder="流水号"></el-input>
      </el-form-item>
      <el-form-item label="时间：" prop="date" v-if="activeName=='socialRecord'"  :rules="[{ required: true, message: '日期不能为空不能为空' }]">
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="formInline.date" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin: 0; padding: 0">
      <el-tab-pane name="guestAllInfo">
        <span slot="label">
          <i class="el-icon-news"></i>
          嘉宾综合信息
        </span>
        <guestAllInfo ref="guestAllInfo" />
      </el-tab-pane>
      <el-tab-pane name="socialRecord">
        <span slot="label">
          <i class="el-icon-notebook-2"></i>
          社交记录
        </span>
        <socialRecord ref="socialRecord" />
      </el-tab-pane>
      <el-tab-pane name="incomeDetails">
        <span slot="label">
          <i class="el-icon-money"></i>
          收益明细
        </span>
        <incomeDetails ref="incomeDetails" />
      </el-tab-pane>
      <el-tab-pane name="withdrawalRecord">
        <span slot="label">
          <i class="el-icon-coin"></i>
          提现记录
        </span>
        <withdrawalRecord ref="withdrawalRecord" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const guestAllInfo = () => import("./guestGeneralComponents/guestAllInfo.vue");
const incomeDetails = () => import("./guestGeneralComponents/incomeDetails.vue");
const socialRecord = () => import("./guestGeneralComponents/socialRecord.vue");
const withdrawalRecord = () => import("./guestGeneralComponents/withdrawalRecord.vue");

export default {
  props: {},
  components: { guestAllInfo, incomeDetails, socialRecord, withdrawalRecord },
  provide() {
    return {
      searchData: this.formInline,
    };
  },

  data() {
    return {
      formInline: {
        userid: null,
        id: null,
        date: null,
      },
      activeName: "guestAllInfo",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs["guestSearchRef"].validate((valid) => {
        if (valid) {
          this.$refs[this.activeName].getData({ userid: this.formInline.userid });
        } else {
          return false;
        }
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>

<style scoped>
.guestGeneralForm {
  margin: 10px 0;
  /* border: 1px solid red; */
}
</style>
