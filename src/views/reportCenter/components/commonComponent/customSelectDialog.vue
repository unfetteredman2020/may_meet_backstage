<template>
  <div class="customSelect">
    <div class="reportSearchBox">
      <span style="font-size: 14px; font-weight: 800">{{ text }}</span>
      <div class="second">
        <div class="msg">
          <el-button type="info">查看报表说明</el-button>
          <p style="font-size: 12px; margin: 5px 10px; font-weight: 600">数据源：誓聊只读库</p>
        </div>
        <div class="form">
          <el-button type="primary" @click="dialogVisible = true">筛选</el-button>
        </div>
      </div>
    </div>
    <el-dialog :show-close="false" :close-on-click-modal="false" custom-class="customDialog" title="筛选" :visible.sync="dialogVisible" style="min-width: 1250px">
      <div class="times">
        <span>请选日期：</span>
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="left">
        <div class="first">
          <span>媒体列表：</span>
          <el-select clearable @change="mediaHandleChange" v-model="mediaid" placeholder="请选择媒体" style="width: 160px">
            <el-option v-for="item in mediaList" :key="item.mediaid" :label="item.name" :value="item.mediaid"></el-option>
          </el-select>
        </div>
        <div class="second">
          <span>投放公司列表：</span>
          <el-select clearable @change="companyHandleChange" v-model="corpid" placeholder="请选择投放公司" style="width: 160px">
            <el-option v-for="item in companyList" :key="item.marketagentid" :label="item.name" :value="item.marketagentid"></el-option>
          </el-select>
        </div>
      </div>
      <div class="right" v-if="customConfig.isShowTransfer">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          filterable
          :titles="['待选', '已选择']"
          :props="{
            key: 'acc_id',
            label: 'name',
          }"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }"
          @change="handleChange"
          :data="companyCountList"
        ></el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">筛选</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMediaList, getLaunchCompany, getReleaseAccountList } from "@/api/reportApi.js";
import { getDate } from "@/utils/date";

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    customConfig: {
      type: Object,
      default: function () {
        return { isShowTransfer: true };
      },
    },
  },
  components: {},
  data() {
    return {
      date: [getDate("2022-01-01").fullDate, getDate().fullDate],
      dialogVisible: false,
      value: [],
      mediaid: "",
      corpid: "",
      mediaList: [],
      companyList: [],
      companyCountList: [],
    };
  },
  computed: {},
  mounted() {
    this.getMedia();
    this.getCompany();
  },
  methods: {
    confirm() {
      let obj = {};
      this.mediaid && (obj.media_id = this.mediaid);
      this.corpid && (obj.corp_id = this.corpid);
      this.value.length && (obj.acc_id = this.value);
      console.log("obj", obj);
      this.$parent.getData({ starttime: this.date[0], endtime: this.date[1] }, obj);
      this.dialogVisible = false;
    },
    mediaHandleChange(value) {
      this.getCompany(value);
      this.corpid && this.getCompanyCount(value, this.corpid);
    },
    companyHandleChange(value) {
      this.getCompanyCount(this.mediaid, value);
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    async getMedia() {
      try {
        const res = await getMediaList();
        console.log("getMediaList res", res);
        if (res && res.errcode == 0) {
          this.mediaList = res.data || [];
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    async getCompany(id) {
      try {
        const res = await getLaunchCompany(id);
        if (res && res.errcode == 0) {
          this.companyList = res.data || [];
        }
        console.log("getLaunchCompany", res);
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    async getCompanyCount(mediaid = null, corpid = null) {
      try {
        let obj = { corpid };
        mediaid && (obj.mediaid = mediaid);
        console.log("obj", obj);
        const res = await getReleaseAccountList(obj);
        console.log("getReleaseAccountList", res);
        if (res && res.errcode == 0) {
          this.companyCountList = res.data || [];
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
  },
};
</script>

<style scoped>
.customSelect {
  margin: 10px 0;
}
.left {
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
}
.left > div {
  margin: 10px 50px 10px 0;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
}

.left > div > span {
  font-weight: 600;
  font-size: 12px;
  display: inline-block;
  /* border: 1px solid blue; */
}
.right {
  text-align: center;
  /* border: 1px solid red; */
}
.times {
  /* border: 1px solid red; */
  font-weight: 600;
  font-size: 12px;
}
.reportSearchBox {
  padding-left: 10px;
}
.second {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.msg {
  width: 500px;
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: nowrap;
}
.form {
  /* border: 1px solid blue; */
  flex: 1;
}
</style>
