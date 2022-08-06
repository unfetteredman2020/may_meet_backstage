<template>
  <div class="boxs">
    <el-table :data="data" max-height="695" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for="item in columns" :key="item" :label="item" :prop="item"></el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteReport(scope.row)" type="text" size="small">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button class="el-icon-s-check" type="primary" @click="auditDialogFormVisible = true">审核</el-button>
      <el-button class="el-icon-s-opportunity" type="primary" @click="playerRewardsDialogVisible = true">玩家奖励</el-button>
      <el-button class="el-icon-minus" type="primary" @click="revokeRewardDialogVisible = true">扣除奖励</el-button>
    </div>
    <el-dialog title="审核" :visible="auditDialogFormVisible">
      <el-form :rules="rules" :model="auditForm" label-width="100px" ref="auditFormRef">
        <el-form-item label="状态：" prop="status">
          <el-select v-model="auditForm.status" placeholder="请选择状态">
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核拒绝" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="memo">
          <el-input type="textarea" style="width: 300px" v-model="auditForm.memo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('auditFormRef')">取 消</el-button>
        <el-button type="primary" @click="validForm('auditFormRef')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="玩家奖励" :visible="playerRewardsDialogVisible">
      <el-form :rules="rules" :model="playerRewardForm" label-width="100px" ref="playerRewardsFormRef">
        <el-form-item label="用户ID：" prop="userid">
          <el-input style="width: 300px" v-model="playerRewardForm.userid" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="礼物ID：" prop="gift_id">
          <el-select v-model="playerRewardForm.gift_id" placeholder="请选择礼物ID">
            <el-option v-for="item in giftList" :key="item.propid" :label="item.title" :value="item.propid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖励数量：" prop="amount">
          <el-input type="number" style="width: 300px" v-model="playerRewardForm.amount" placeholder="请输入奖励数量"></el-input>
        </el-form-item>
        <el-form-item label="有效天数：" prop="day_cnt">
          <el-input type="number" style="width: 300px" v-model="playerRewardForm.day_cnt" placeholder="请输入有效天数"></el-input>
        </el-form-item>
        <el-form-item label="奖励类型：" prop="rewardtype">
          <el-select v-model="playerRewardForm.rewardtype" placeholder="请选择奖励类型">
            <el-option v-for="item in rewardtypeOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加备注：" prop="memo">
          <el-input type="textarea" style="width: 300px" v-model="playerRewardForm.memo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('playerRewardsFormRef')">取 消</el-button>
        <el-button type="primary" @click="validForm('playerRewardsFormRef')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="撤销奖励" :visible="revokeRewardDialogVisible">
      <el-form :rules="rules" :model="revokeRewardForm" label-width="100px" ref="revokeRewardsFormRef">
        <el-form-item label="用户ID：" prop="userid">
          <el-input style="width: 300px" v-model="revokeRewardForm.userid" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="扣除数量：" prop="amount" :rules="[{ validator: checkAcount, trigger: 'blur' }]">
          <el-input type="number" style="width: 300px" v-model.number="revokeRewardForm.amount" placeholder="请输入奖励数量"></el-input>
        </el-form-item>
        <el-form-item label="奖励类型：" prop="rewardtype">
          <el-select v-model="revokeRewardForm.rewardtype" placeholder="请选择奖励类型">
            <el-option v-for="item in rewardRewardtypeOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加备注：" prop="memo">
          <el-input type="textarea" style="width: 300px" v-model="revokeRewardForm.memo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('revokeRewardsFormRef')">取 消</el-button>
        <el-button type="primary" @click="validForm('revokeRewardsFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAuditManage, audit, addReward, revokeReward } from "@/api/userApi.js";
import { getGiftList } from "@/api/baseInfoApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";
export default {
  props: {},
  inject: ["searchData"],
  components: {},
  data() {
    var checkAcount = (rule, value, callback) => {
      console.log("value", value);
      if (!value) {
        return callback(new Error("数量不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入正整数"));
      }
      callback();
    };
    return {
      checkAcount,
      data: [],
      giftList: [],
      auditForm: {
        status: null,
        memo: null,
      },
      playerRewardForm: {
        userid: null,
        amount: null,
        rewardtype: null,
        day_cnt: null,
        memo: null,
        gift_id: null,
      },
      revokeRewardForm: {
        userid: null,
        amount: null,
        rewardtype: null,
        memo: null,
      },
      multipleSelection: [], //已经选中的行数据
      auditDialogFormVisible: false,
      playerRewardsDialogVisible: false,
      revokeRewardDialogVisible: false,
      rewardtypeOption: [
        { label: "赠送金币", value: "0" },
        { label: "充值金币", value: "1" },
        { label: "零钱", value: "2" },
        { label: "社交礼物", value: "3" },
        { label: "社交道具", value: "4" },
      ],
      rewardRewardtypeOption: [
        { label: "赠送金币", value: "0" },
        { label: "充值金币", value: "1" },
        { label: "零钱", value: "2" },
      ],
      rules: {
        id: [{ required: true, message: "请输入用户ID" }],
        status: [{ required: true, message: "请选择状态" }],
        memo: [{ required: true, message: "请输入备注" }],
        userid: [{ required: true, message: "请输入用户ID" }],
        amount: [{ required: true, message: "请输入礼物数量" }],
        rewardtype: [{ required: true, message: "请选择礼物类型" }],
        day_cnt: [{ required: true, message: "请输入有效天数" }],
        gift_id: [{ required: true, message: "请选择礼物" }],
        amount: [{ required: true, message: "请输入礼物数量" }],
      },
      columns: ["id", "发放类型", "用户id", "用户昵称", "奖励内容", "奖励估值", "创建人", "创建时间", "奖励代码", "失效时间", "奖励备注"], // table 每一列数据
    };
  },
  computed: {},
  mounted() {
    this.getGiftLists();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    validForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          switch (formName) {
            case "revokeRewardsFormRef":
              this.revokeReward();
              break;
            case "playerRewardsFormRef":
              this.addReward();
              break;
            case "auditFormRef":
              this.addAudit();
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async deleteReport(item) {
      try {
        const res = await revokeReward({ id: item.id });
        console.log("revokeReward res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "撤销成功！");
          const { date, ...pms } = clearEmptyObj(this.searchData);
          let params = pms || {};
          params.starttime = date[0];
          params.endtime = date[1];
          this.getData(params);
        } else {
          this.$message("error", res.errmsg || "撤销失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "撤销失败，请稍后重试！");
      }
    },
    async revokeReward() {
      try {
        let params = { ...this.revokeRewardForm };
        params.amount = `-${params.amount}` * 1;
        params.rewardtype = params.rewardtype * 1;
        const res = await addReward(params);
        console.log("revokeReward res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "扣除奖励成功！");
          this.resetForm("revokeRewardsFormRef");
        } else {
          this.$message("error", res.errmsg || "扣除失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "扣除失败，请稍后重试！");
      }
    },
    // 添加奖励
    async addReward() {
      try {
        let params = { ...this.playerRewardForm };
        params.rewardtype = params.rewardtype * 1;
        params.amount = params.amount * 1;
        params.day_cnt = params.day_cnt * 1;
        const res = await addReward(params);
        console.log("addReward res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "添加奖励成功！");
          this.resetForm("playerRewardsFormRef");
        } else {
          this.$message("error", res.errmsg || "审核失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "审核失败，请稍后重试！");
      }
    },
    async addAudit() {
      try {
        if (!this.multipleSelection.length) {
          return this.$message("error", "请选择要审核的记录");
        }
        let params = { ...this.auditForm };
        params.id = this.multipleSelection.map((item) => item.id);
        console.log("params", params);
        const res = await audit(params);
        console.log("res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "审核成功！");
          this.resetForm("auditFormRef");
        } else {
          this.$message("error", res.errmsg || "审核失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "审核失败，请稍后重试！");
      }
    },

    async getData(data = {}) {
      try {
        const res = await getAuditManage(data);
        console.log("getAuditManage res", res);
        if (res && res.errcode == 0) {
          this.data = res.data || [];
          // this.data = [].concat(res.data, res.data)
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    async getGiftLists() {
      try {
        const res = await getGiftList();
        console.log("getGiftList res", res);
        if (res && res.errcode == 0) {
          this.giftList = res.data || [];
        } else {
          this.$message("error", res.errmsg || "获取礼物列表失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取礼物列表失败，请稍后重试！");
      }
    },
    resetForm(formName) {
      this.playerRewardsDialogVisible = false;
      this.auditDialogFormVisible = false;
      this.revokeRewardDialogVisible = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.boxs {
  /* border: 1px solid red; */
  height: calc(100vh - 70px - 115px);
  position: relative;
}
.footer {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  padding-left: 20px;
  background-color: #eee;
}
</style>
