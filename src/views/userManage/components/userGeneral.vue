<template>
  <div class="userGeneral">
    <div class="seatch">
      <el-form :rules="rules" :inline="true" :model="searchForm" class="userGeneralForm" ref="searchForm">
        <el-form-item label="可遇ID" prop="userid">
          <el-input  v-model="searchForm.userid" placeholder="可遇ID"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="tradeno">
          <el-input  v-model="searchForm.tradeno" placeholder="流水号"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="selectTime">
          <el-date-picker value-format="yyyy-MM-dd"  v-model="searchForm.selectTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" >查询</el-button>
          <el-button @click="resetForm('searchForm')" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="settingBox">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin: 0; padding: 0" >
        <el-tab-pane name="allInfo">
          <span slot="label">
            <i class="el-icon-user"></i>
            综合信息
          </span>
          <AllInfo ref="allInfo" />
        </el-tab-pane>
        <el-tab-pane name="rechargeRecord">
          <span slot="label">
            <i class="el-icon-coin"></i>
            充值记录
          </span>
          <RechargeRecord ref="rechargeRecord" />
        </el-tab-pane>
        <el-tab-pane name="consumeRecord">
          <span slot="label">
            <i class="el-icon-sold-out"></i>
            消费记录
          </span>
          <ConsumeRecord ref="consumeRecord" />
        </el-tab-pane>
        <el-tab-pane name="abnormalRecord">
          <span slot="label">
            <i class="el-icon-set-up"></i>
            异动记录
          </span>
          <AbnormalRecord ref="abnormalRecord" />
        </el-tab-pane>
        <!-- <el-tab-pane name="logRecord">
          <span slot="label">
            <i class="el-icon-notebook-1"></i>
            日志记录
          </span>
          <LogRecord ref="logRecord" />
        </el-tab-pane> -->
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
import { getDate } from "@/utils/date.js";
import draggable from "@/directive/draggable.js";
import { mapState } from "vuex";

export default {
  directives: {
    draggable,
  },
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
      activeName: "allInfo",
      searchForm: {
        selectTime: [getDate('2022-01-01').fullDate, getDate().fullDate],
        userid: "",
        tradeno: "",
      },
      rules: {
        userid: [{ required: true, message: "请输入可遇ID" }],
      },
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {
    ...mapState(["storeUserInfo"]),
  },
  //⽅法集合
  methods: {
    onSubmit() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          let { selectTime, userid, tradeno } = this.searchForm;
          let starttime = getDate(selectTime[0]).fullDate;
          let endtime = getDate(selectTime[1]).fullDate;
          let params = {};
          userid && Object.assign(params, { userid });
          starttime && Object.assign(params, { starttime });
          endtime && Object.assign(params, { endtime });
          tradeno && Object.assign(params, { tradeno });
          this.$refs[this.activeName].getData(params);
        } else {
          return false;
        }
      });
    },
    handleClick(tab, event) {
      // console.log(tab.name);
      this.activeName = tab.name;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    keyUpEvent(e) {
      if(e.keyCode == 13) {
        this.onSubmit()
      }
    }
  },
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期，挂载完成（可以访问dom元素）
  mounted() {
    document.addEventListener('keyup', this.keyUpEvent)
  },
  beforeCreate() {}, //⽣命周期-创建之前
  beforeMount() {}, //⽣命周期 - 挂载之前
  beforeUpdate() {}, //⽣命周期 - 更新之后
  updated() {}, //⽣命周期 - 更新之后
  beforeDestroy() {}, //⽣命周期 - 销毁之前
  destroy() {
    document.removeEventListener('keyup', this.keyUpEvent)
  }, //⽣命周期 - 销毁完成
  activated() {}, //如果页⾯有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.userGeneral {
  box-sizing: border-box;
  /* border: 1px solid rgb(17, 255, 0); */
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
  /* border: 2px solid red; */
  box-sizing: border-box;
  padding: 20px 0 0;
  margin: 8px 0 0 0;
  height: calc(100vh - 140px);
  /* border: 1px solid blue; */
  background-color: #ffffff;
}
.userGeneralForm {
  box-sizing: border-box;
  margin-top: 27px;
}
</style>
