<template>
  <div class="userGeneral">
    <div class="seatch">
      <el-form :rules="rules" :inline="true" :model="searchForm" class="userGeneralForm" ref="auditSearchForm">
        <el-form-item inline-message label="用户ID" prop="userid">
          <el-input v-model="searchForm.userid" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-date-picker value-format="yyyy-MM-dd" v-model="searchForm.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="提现状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="提现状态">
            <el-option v-for="item in withdrawalOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单号" prop="tradeno">
          <el-input v-model="searchForm.tradeno" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item style="margin: 0 10px">
          <el-button class="el-icon-search" type="primary" @click="onSubmit('auditSearchForm')">搜索</el-button>
          <el-button class="el-icon-refresh-left" @click="resetForm('auditSearchForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button class="el-icon-s-check" type="primary" @click="edit">批量审核</el-button>
    </div>

    <div class="settingBox">
      <el-table :data="list" border style="width: 100%" max-height="885px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form style="margin: 0 0 0 50px" label-position="left" class="demo-table-expand">
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
        <el-table-column prop="nickname" label="用户昵称"></el-table-column>
        <el-table-column prop="oldscore" label="现有零钱"></el-table-column>
        <el-table-column prop="type" label="打款方式">
          <template slot-scope="scope">
            <el-tag effect="dark" :type="paymment[scope.row.type][1]">
              {{ paymment[scope.row["type"]][0] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="提现金额"></el-table-column>
        <el-table-column prop="month" label="本月提现" width="300"></el-table-column>
        <el-table-column prop="lastmonth" label="上月提现"></el-table-column>
        <el-table-column prop="all" label="历史提现"></el-table-column>
        <el-table-column prop="status" label="提现状态">
          <template slot-scope="scope">
            <el-tag effect="dark" :type="withdrawalStatus[scope.row.status][1]">
              {{ withdrawalStatus[scope.row["status"]][0] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatetime" label="状态时间"></el-table-column>

        <el-table-column prop="level" label="提现用户类型"></el-table-column>
        <el-table-column prop="inserttime" label="提现时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="50">
          <template slot-scope="scope">
            <i class="el-icon-s-check checkIcon" @click="edit(scope.row)" type="primary"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="rechargeFooter" v-if="false">
        <span></span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>

    <el-dialog title="审核" :visible="checkDialogFormVisible">
      <el-form :model="checkForm" ref="checkFormRef" :rules="rules" label-position="right">
        <el-form-item label="审核状态：" prop="result" label-width="100px">
          <el-select v-model="checkForm.result" placeholder="请选择审核状态" style="width: 300px">
            <el-option label="拒绝" value="0"></el-option>
            <el-option label="通过" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核人：" prop="type" label-width="100px">
          <el-select v-model="checkForm.type" placeholder="请选审核人" style="width: 300px">
            <el-option label="预审" value="0"></el-option>
            <el-option label="副总审核" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="memo" label-width="100px">
          <el-input type="textarea" style="width: 300px" v-model="checkForm.memo" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="resetForm('checkFormRef')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('checkFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllAuditList, withdrawalAudit } from "@/api/userApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  name: 'allAuditList',
  components: {},
  props: {},
  data() {
    //这⾥存放数据
    return {
      list: [],
      currentPage: 1,
      total: 0,
      activeName: "abnormalRecord",
      editItem: null,
      checkForm: {
        type: null,
        result: null,
        memo: null,
      },
      selectTime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      searchForm: {
        userid: "10000",
        date: ["2021-01-01", "2022-08-01"],
        status: null,
        tradeno: "",
      },
      rules: {
        type: [{ required: true, message: "请选审核人" }],
        result: [{ required: true, message: "请选择审核状态" }],
        memo: [{ required: true, message: "请输入备注" }],
        // userid: [{ required: true, message: "请输入用户ID" }],
        date: [{ required: true, message: "请选择日期" }],
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
      checkDialogFormVisible: false,
      //提现状态
      withdrawalStatus: {
        0: ["审核中", ""],
        1: ["成功", "success"],
        2: ["失败", "danger"],
        3: ["审核失败", "warning"],
        4: ["未知状态", "info"],
        8: ["未知状态", "info"],
      },
      // 打款方式
      paymment: {
        0: ["银行", ""],
        1: ["微信", "success"],
        2: ["支付宝", "warning"],
      },
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    edit(item) {
      console.log("item", item);
      this.editItem = item;
      this.checkDialogFormVisible = true;
    },
    async withdrawalAudit() {
      try {
        let params = { ...this.checkForm };
        params.tradeno = this.editItem.trade_no;
        const res = await withdrawalAudit(params);
        console.log("withdrawalAudit res :>> ", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改审核状态成功！");
          this.resetForm("checkFormRef");
        } else {
          this.$message("error", res.errmsg || "修改审核状态失败！");
        }
      } catch (error) {
        console.log("error :>> ", error);
        this.$message("error", error.errmsg || "修改审核状态失败！");
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case "auditSearchForm":
              this.getData();
              break;
            case "checkFormRef":
              this.withdrawalAudit();
              break;
          }
        } else {
          return false;
        }
      });
    },
    async getData() {
      try {
        const { date, ...rs } = this.searchForm;
        console.log("this.searchForm", this.searchForm);
        let params = clearEmptyObj(rs);
        date && ((params.starttime = date[0]), (params.endtime = date[1]));
        const res = await getAllAuditList(params);
        console.log("getAllAuditList res :>> ", res);
        if (res && res.errcode == 0) {
          this.list = res.data || [];
        } else {
          this.$message("error", res.errmsg || "获取充值记录失败");
        }
      } catch (error) {
        // console.log("error :>> ", error);
        this.$message("error", error.errmsg || "获取充值记录失败");
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    resetForm(formName) {
      this.checkDialogFormVisible = false;
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
.checkIcon {
  font-size: 18px;
  color: #d1289c;
}
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
  /* padding: 10px 20px; */
  /* margin: 8px 0 0 0; */
  /* border: 1px solid blue; */
  background-color: #ffffff;
}
.userGeneralForm {
  /* height: 100px; */
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
