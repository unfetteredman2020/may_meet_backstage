<template>
  <div>
    <el-form :inline="true" :rules="rules" :model="formInline" class="guestGeneralForm" size="mini" ref="userAwardPunishSearchRef">
      <el-form-item label="可遇ID：" prop="userid">
        <el-input v-model="formInline.userid" placeholder="可遇ID"></el-input>
      </el-form-item>
      <el-form-item label="流水号：" prop="id">
        <el-input v-model="formInline.id" placeholder="流水号"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间：" prop="date" >
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="formInline.date" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin: 0; padding: 0">
      <el-tab-pane name="rewardRecord">
        <span slot="label">
          <i class="el-icon-news"></i>
          奖励记录
        </span>
        <rewardRecord ref="rewardRecord" />
      </el-tab-pane>
      <el-tab-pane name="auditManagement">
        <span slot="label">
          <i class="el-icon-notebook-2"></i>
          审核管理
        </span>
        <auditManagement ref="auditManagement" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const auditManagement = () => import("./userAwardPunishComponents/auditManage.vue");
const rewardRecord = () => import("./userAwardPunishComponents/rewardRecord.vue");

export default {
  props: {},
  components: { auditManagement, rewardRecord },
  provide() {
    return {
      searchData: this.formInline,
      
    };
  },

  data() {
    return {
      formInline: {
        status: null,
        userid: null,
        id: null,
        date: null,
      },
      options: [
        { label: "待审核", value: "0" },
        { label: "审核通过", value: "1" },
        { label: "审核拒绝", value: "2" },
        { label: "被撤销", value: "3" },
        { label: "所有状态", value: "null" },
      ],
      activeName: "rewardRecord",
      rules: {
        userid: [{required: true, message: '请输入可遇ID'}],
        date: [{required: true, message: '请选择筛选时间'}],
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs["userAwardPunishSearchRef"].validate((valid) => {
        if (valid) {
          const { date, ...res } = this.formInline
          let params = {...res }
          date &&(params.starttime=date[0], params.endtime=date[1])
          console.log('search params', params)
          this.$refs[this.activeName].getData(params);
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
