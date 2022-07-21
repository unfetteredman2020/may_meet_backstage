<template>
  <div class="userGeneral">
    <div class="seatch">
      <el-form :rules="rules" :inline="true" :model="searchForm" class="userGeneralForm" ref="auditSearchForm">
        <el-form-item label="用户ID" prop="id">
          <el-input  v-model="searchForm.id" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="selectTime">
          <el-date-picker  v-model="searchForm.selectTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item label="订单号" prop="SerialNumber">
          <el-input  v-model="searchForm.SerialNumber" placeholder="订单号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" >搜索</el-button>
          <el-button @click="resetForm('auditSearchForm')" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="settingBox">
      <el-table :data="list" border style="width: 100%" max-height="580px">
        <el-table-column type="selection" width="55"></el-table-column>
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
        <el-table-column prop="month" label="本月提现" width="120"></el-table-column>
        <el-table-column prop="lastmonth" label="上月提现" width="120"></el-table-column>
        <el-table-column prop="all" label="历史提现" width="120"></el-table-column>
        <el-table-column prop="status" label="提现状态" width="120"></el-table-column>
        <el-table-column prop="updatetime" label="状态时间" width="120"></el-table-column>
        <el-table-column prop="type" label="打款方式" width="120"></el-table-column>
        <el-table-column prop="type" label="提现用户类型" width="120"></el-table-column>
        <el-table-column prop="inserttime" label="提现时间" width="120"></el-table-column>
        <el-table-column label="操作">
          <i class="el-icon-edit-outline"></i>
        </el-table-column>
      </el-table>
      <div class="rechargeFooter">
        <span class="el-icon-success auditBtn">批量二审</span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    //这⾥存放数据
    return {
      list: [],
      activeName: "abnormalRecord",
      currentPage: 1,
      searchForm: {
        selectTime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        id: "",
        SerialNumber: "",
      },
      rules: {
        id: [{ required: true, message: "请输入可遇ID", trigger: "blur" }],
      },
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    onSubmit() {
      this.$refs["searchForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
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
  height: calc(100vh - 130px);
  overflow: hidden;
}
.seatch {
  width: 100%;
  min-width: 1160px;
  /* height: 50px; */
  background-color: #f2f2f2;
}
.settingBox {
  padding: 0px 20px;
  /* margin: 8px 0 0 0; */
  height: calc(100vh - 206px);
  /* border: 1px solid blue; */
  background-color: #ffffff;
}
.userGeneralForm {
  height: 50px;
}
.rechargeFooter {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.auditBtn {
  border: 1px solid rgb(218, 20, 172);
  color: rgb(218, 20, 172);
  padding: 5px 10px;
}
</style>
