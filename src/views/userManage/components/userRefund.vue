<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm" ref="userRefundSearchRef">
      <el-form-item label="充值对象：" prop="userid">
        <el-input v-model="searchForm.userid" placeholder="充值对象"></el-input>
      </el-form-item>
      <el-form-item label="订单号：" prop="id">
        <el-input v-model="searchForm.id" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="第三方订单号：" prop="third_id">
        <el-input v-model="searchForm.third_id" placeholder="第三方订单号"></el-input>
      </el-form-item>
      <el-form-item label="退款状态：" prop="status">
        <el-input v-model="searchForm.status" placeholder="退款状态"></el-input>
      </el-form-item>
      <el-form-item label="大群退款编号：" prop="group_id">
        <el-input v-model="searchForm.group_id" placeholder="大群退款编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('userRefundSearchRef')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="batchRefund" style="background: #eee; padding: 0px 0 10px 0">
      <el-button type="primary" @click="edit(null)">批量审核</el-button>
      <el-button type="primary" @click="createRefundDialogVisible = true">创建退款</el-button>
    </div>
    <el-table header-align="center" ref="userRefundTableRef" @selection-change="handleSelectionChange" :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for="item in column" :key="item" :label="item" :prop="item"></el-table-column>
      <el-table-column label="状态" prop="状态" width="70">
        <template slot-scope="scope">
          <el-tag :type="scope.row['状态'] == 1 ? 'success' : scope.row['状态'] == 0 ? 'warning' : 'danger'" effect="dark">
            {{ scope.row["状态"] == 1 ? "已同意" : scope.row["状态"] == 0 ? "未处理" : "已拒绝" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <i slot="reference" v-if="scope.row['状态'] == 0" class="el-icon-s-tools setting" @click="edit(scope.row)"></i>
          <el-popover v-else placement="top-start" width="200" trigger="hover" content="审核状态已变更，不可再操作">
            <i class="el-icon-error setting" slot="reference"></i>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="审核" :visible.sync="batchRefundDialogVisible" :close-on-click-modal="false">
      <el-form :model="batchRefundForm" ref="batchRefundFormRef" :rules="rules">
        <el-form-item label="审核状态：" prop="status">
          <el-select v-model="batchRefundForm.status" placeholder="请选择审核状态">
            <el-option label="通过" value="1"></el-option>
            <el-option label="拒绝" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加备注：" prop="memo">
          <el-input type="textarea" style="width: 300px" v-model="batchRefundForm.memo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('batchRefundFormRef')">取 消</el-button>
        <el-button type="primary" @click="submitForm('batchRefundFormRef')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="创建退款" :visible.sync="createRefundDialogVisible" :close-on-click-modal="false">
      <el-form :model="createRefundForm" :rules="rules" ref="createRefundFormRef" label-position="right" label-width="120px">
        <el-form-item label="第三方订单号:" prop="third_id">
          <el-input style="width: 300px" v-model="createRefundForm.third_id" placeholder="请输入第三方订单号"></el-input>
        </el-form-item>
        <el-form-item label="退款金额:" prop="amount">
          <el-input style="width: 300px" v-model="createRefundForm.amount" placeholder="请输入退款金额"></el-input>
        </el-form-item>
        <el-form-item label="添加备注:" prop="memo">
          <el-input type="textarea" style="width: 300px" v-model="createRefundForm.memo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('createRefundFormRef')">取 消</el-button>
        <el-button type="primary" @click="submitForm('createRefundFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { refundManage, refundAudit, createRefund } from "@/api/userApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  name: 'userRefund',
  props: {},
  components: {},
  data() {
    return {
      data: [],
      createRefundForm: {
        third_id: null,
        amount: null,
        memo: null,
      },
      batchRefundForm: {
        memo: null,
        status: null,
      },
      editData: null,
      searchForm: {
        userid: null,
        id: null,
        third_id: null,
        group_id: null,
        status: null,
      },
      rules: {
        third_id: [{ required: true, message: "请输入第三方订单号" }],
        amount: [{ required: true, message: "请输入退款金额" }],
        memo: [{ required: true, message: "请输入备注" }],
        status: [{ required: true, message: "请选择" }],
        third_id: [{ required: true, message: "请输入第三方订单号" }],
      },
      multipleSelection: null,
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
      batchRefundDialogVisible: false,
      createRefundDialogVisible: false,
      column: ["记录ID", "大群退款编号", "订单号", "第三方订单号", "充值金额", "退款金额", "充值人", "充值对象", "创建人", "创建时间", "处理人"],
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      console.log("val", val);
      if (val.filter((item) => item["状态"] !== 0).length) {
        // this.$refs.userRefundTableRef.clearSelection();
        val
          .filter((item) => item["状态"] !== 0)
          .forEach((item) => {
            this.$refs.userRefundTableRef.toggleRowSelection(item);
          });
        this.$message("info", "不能选择已经处理过的记录进行操作！");
        // return this.$message('info', '不能选择已经处理过的记录进行操作！')
      }
      this.multipleSelection = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case "batchRefundFormRef":
              this.refundAudit();
              break;
            case "createRefundFormRef":
              this.createRefund();
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async createRefund() {
      try {
        const res = await createRefund(this.createRefundForm);
        console.log("createRefund", res);
        if (res && res.errcode == 0) {
          this.$message("success", "创建成功");
        } else {
          this.$message("error", res.errmsg || "创建退款失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "创建退款失败，请稍后重试！");
      }
    },
    edit(item) {
      console.log("item", item);
      this.batchRefundDialogVisible = true;
      this.editData = item;
    },
    async refundAudit() {
      try {
        let params = { ...this.batchRefundForm };
        params.status = params.status * 1;
        console.log('this.editData["记录ID"]', this.editData);
        if (this.editData && this.editData["记录ID"]) {
          params.id = [this.editData["记录ID"]];
        } else if (this.multipleSelection && this.multipleSelection.length) {
          params.id = this.multipleSelection.map((item) => item["记录ID"]);
        } else {
          return this.$message("error", "请选择要审核的记录");
        }

        const res = await refundAudit(params);
        console.log("refundAudit res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "审核成功！");
          this.resetForm("batchRefundFormRef");
        } else {
          this.$message("error", res.errmsg || "审核失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "审核失败，请稍后重试！");
      }
    },
    onSubmit() {
      let params = clearEmptyObj(this.searchForm);
      this.getData(params);
    },

    async getData(data = {}) {
      try {
        const res = await refundManage(data);
        console.log("refundManage", res);
        if (res && res.errcode == 0) {
          this.data = res.data;
          console.log("first", Object.keys(res.data[0]));
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    resetForm(falname) {
      this.multipleSelection = null;
      this.batchRefundDialogVisible = false;
      this.createRefundDialogVisible = false;
      this.editData = null;
      this.$refs[falname].resetFields();
    },
  },
};
</script>

<style scoped>
.setting {
  /* border: 1px solid red; */
  font-size: 20px;
  color: #d1289c;
}
.imgBox {
  /* border: 1px solid blue; */
  height: 40px;
}
.coverImg {
  /* border: 1px solid red; */
}
</style>
