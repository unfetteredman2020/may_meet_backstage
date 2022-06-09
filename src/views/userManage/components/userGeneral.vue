<template>
  <div class="userGeneral">
    <div class="seatch">
      <el-form
        :rules="rules"
        :inline="true"
        :model="searchForm"
        class="userGeneralForm"
        ref="searchForm"
      >
        <el-form-item label="可遇ID" prop="id">
          <el-input
            size="mini"
            v-model="searchForm.id"
            placeholder="可遇ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="SerialNumber">
          <el-input
            size="mini"
            v-model="searchForm.SerialNumber"
            placeholder="流水号"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="selectTime">
          <el-date-picker
            size="mini"
            v-model="searchForm.selectTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini"
            >查询</el-button
          >
          <el-button @click="resetForm('searchForm')" size="mini"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="settingBox">
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick"
        style="margin: 0; padding: 0"
      >
        <el-tab-pane name="allInfo">
          <span slot="label"><i class="el-icon-user"></i> 综合信息</span>
          <AllInfo />
        </el-tab-pane>
        <el-tab-pane name="rechargeRecord">
          <span slot="label"><i class="el-icon-coin"></i> 充值记录</span>
          <RechargeRecord />
        </el-tab-pane>
        <el-tab-pane name="consumeRecord">
          <span slot="label"><i class="el-icon-sold-out"></i>消费记录</span>
          <ConsumeRecord />
        </el-tab-pane>
        <el-tab-pane name="abnormalRecord">
          <span slot="label"><i class="el-icon-set-up"></i>异动记录</span>
          <AbnormalRecord />
        </el-tab-pane>
        <el-tab-pane name="logRecord">
          <span slot="label"> <i class="el-icon-notebook-1"></i> 日志记录</span>
          <LogRecord />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AllInfo from "./userGeneralComponents/allInfo.vue";
import RechargeRecord from "./userGeneralComponents/rechargeRecord.vue";
import LogRecord from "./userGeneralComponents/logRecord.vue";
import AbnormalRecord from "./userGeneralComponents/abnormalRecord.vue";
import ConsumeRecord from "./userGeneralComponents/consumeRecord.vue";

export default {
  components: {
    AllInfo: AllInfo,
    RechargeRecord: RechargeRecord,
    LogRecord: LogRecord,
    AbnormalRecord: AbnormalRecord,
    ConsumeRecord: ConsumeRecord,
  },
  props: {},
  data() {
    //这⾥存放数据
    return {
      activeName: "abnormalRecord",
      searchForm: {
        selectTime: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
  border: 1px solid red;
  width: 100%;
  height: calc(100vh - 70px);
  overflow: hidden;
}
.seatch {
  width: 100%;
  min-width: 1160px;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
}
.settingBox {
  padding: 20px 20px;
  margin: 8px 0 0 0;
  height: calc(100vh - 150px);
  border: 1px solid blue;
  background-color: #ffffff;
}
.userGeneralForm {
  box-sizing: border-box;
  margin-top: 27px;
}
</style>
