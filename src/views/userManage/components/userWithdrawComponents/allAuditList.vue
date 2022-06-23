<template>
  <div class="userGeneral">
    <div class="seatch">
      <el-form :rules="rules" :inline="true" :model="searchForm" class="userGeneralForm" ref="auditSearchForm">
        <el-form-item label-width="80px" inline-message required label="用户ID" prop="id">
          <el-input size="mini" v-model="searchForm.id" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label-width="50px" label="时间">
          <el-date-picker size="mini" v-model="selectTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="120px" label="提现状态" prop="withdrawalStatus">
          <el-select size="mini" v-model="searchForm.withdrawalStatus" placeholder="提现状态">
            <el-option v-for="item in withdrawalOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label-width="80px" label="订单号" prop="SerialNumber">
          <el-input size="mini" v-model="searchForm.SerialNumber" placeholder="订单号"></el-input>
        </el-form-item>

        <el-form-item style="margin: 0 20px">
          <el-button class="el-icon-search" type="primary" @click="onSubmit" size="mini">搜索</el-button>
          <el-button class="el-icon-refresh-left" size="mini" @click="resetForm('auditSearchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="settingBox">
      <el-table :data="list" border style="width: 100%" max-height="668px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="打款账号ID：">
                <span>{{ props.row.outbankno }}</span>
              </el-form-item>
              <el-form-item label="提现状态原因：">
                <span>{{ props.row.failreason }}</span>
              </el-form-item>
              <el-form-item label="预审人员">
                <span>{{ props.row.admin1 }}</span>
              </el-form-item>
              <el-form-item label="复审人员">
                <span>{{ props.row.admin2 }}</span>
              </el-form-item>
              <el-form-item label="计划打款时间">
                <span>{{ props.row.plan_paytime }}</span>
              </el-form-item>
              <el-form-item label="实际打款时间">
                <span>{{ props.row.paytime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="trade_no" label="订单号" width="150"></el-table-column>
        <el-table-column prop="nickname" label="用户昵称" width="120"></el-table-column>
        <el-table-column prop="oldscore" label="现有零钱" width="120"></el-table-column>
        <el-table-column prop="amount" label="提现金额" width="120"></el-table-column>
        <el-table-column prop="month" label="本月提现" width="300"></el-table-column>
        <el-table-column prop="lastmonth" label="上月提现" width="120"></el-table-column>
        <el-table-column prop="all" label="历史提现" width="120"></el-table-column>
        <el-table-column prop="status" label="提现状态" width="120"></el-table-column>
        <el-table-column prop="updatetime" label="状态时间" width="120"></el-table-column>
        <el-table-column prop="type" label="打款方式" width="120"></el-table-column>
        <el-table-column prop="type" label="提现用户类型" width="120"></el-table-column>
        <el-table-column prop="inserttime" label="提现时间" width="120"></el-table-column>
      </el-table>
      <div class="rechargeFooter">
        <span>
          充值总金额：
          <b>99999</b>
          元
        </span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllAuditList } from "@/api/userApi.js";
import { getDate, formateDate } from "@/utils/date.js";
export default {
  components: {},
  props: {},
  data() {
    //这⾥存放数据
    return {
      list: [],
      currentPage: 1,
      activeName: "abnormalRecord",
      selectTime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      searchForm: {
        id: "",
        SerialNumber: "",
      },
      rules: {
        id: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
      },
      withdrawalOptions: [
        { label: "等待一审", value: "1" },
        { label: "等待二审", value: "2" },
        { label: "待提交打款", value: "3" },
        { label: "打款中", value: "4" },
        { label: "提现成功", value: "5" },
        { label: "提现失败", value: "6" },
        { label: "一审拒绝", value: "7" },
        { label: "二审拒绝", value: "8" },
        { label: "订单被冻结", value: "9" },
      ],
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    onSubmit() {
      this.$refs["auditSearchForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    async getAll() {
      try {
        const { year, month, dayNumber, fullDate } = getDate();
        let startTime = `${year}-${formateDate(month - 1)}-${formateDate(dayNumber)}`;
        let endTiem = fullDate;
        const res = await getAllAuditList(`userid=${10000}&starttime=${startTime}&endtime=${endTiem}`);
        // console.log("getAllAuditList res :>> ", res);
        if (res && res.errcode == 0) {
          this.list = res.data || [];
        } else {
          this.$message("error", "获取充值记录失败");
        }
      } catch (error) {
        // console.log("error :>> ", error);
        this.$message("error", "获取充值记录失败");
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期，挂载完成（可以访问dom元素）
  mounted() {},
  beforeCreate() {}, //⽣命周期-创建之前
  beforeMount() {}, //⽣命周期 - 挂载之前
  beforeUpdate() {}, //⽣命周期 - 更新之后
  updated() {}, //⽣命周期 - 更新之后
  beforeDestroy() {}, //⽣命周期 - 销毁之前
  destroy() {}, //⽣命周期 - 销毁完成
  activated() {}, //如果页⾯有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.userGeneral {
  box-sizing: border-box;
  /* border: 1px solid red; */
  width: 100%;
  height: calc(100vh - 70px - 56px);
  overflow: hidden;
}
.seatch {
  box-sizing: border-box;
  width: 100%;
  min-width: 1160px;
  /* height: 50px; */
  background-color: #f2f2f2;
}
.settingBox {
  padding: 10px 20px;
  /* margin: 8px 0 0 0; */
  height: calc(100vh - 256px);
  /* border: 1px solid blue; */
  background-color: #ffffff;
}
.userGeneralForm {
  height: 100px;
}

.rechargeFooter {
  display: flex;
  height: 53px;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
}
.rechargeFooter > span {
  font-size: 14px;
}
.demo-table-expand {
  font-size: 0;
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
