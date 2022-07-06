<template>
  <div class="customSelect">
    <el-button size="mini" type="primary" @click="dialogVisible = true">筛选</el-button>
    <el-dialog :show-close="false" :close-on-click-modal="false" custom-class="customDialog" title="筛选" :visible.sync="dialogVisible" style="min-width: 1250px">
      <div class="times">
        <span>请选日期：</span>
        <el-date-picker :clearable="false" v-model="date" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="left">
        <div class="first">
          <span>媒体列表：</span>
          <el-select clearable @change="mediaHandleChange" v-model="mediaid" placeholder="请选择媒体" size="mini" style="width: 160px">
            <el-option v-for="item in mediaList" :key="item.mediaid" :label="item.name" :value="item.mediaid"></el-option>
          </el-select>
        </div>
        <div class="second">
          <span>投放公司列表：</span>
          <el-select clearable @change="companyHandleChange" v-model="corpid" placeholder="请选择投放公司" size="mini" style="width: 160px">
            <el-option v-for="item in companyList" :key="item.marketagentid" :label="item.name" :value="item.marketagentid"></el-option>
          </el-select>
        </div>
      </div>
      <div class="right">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          size="mini"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['待选', '已选择']"
          :props="{
            key: 'channelid',
            label: 'marketstaffname',
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
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirm">筛选</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMediaList, getLaunchCompany, getReleaseAccountList } from "@/api/reportApi.js";
import { getDate } from "@/utils/date";

export default {
  props: {},
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
      console.log("this.date", this.date);
      console.log("this.value", this.value);
      let obj = {};
      this.mediaid && (obj.media_id = this.mediaid);
      this.corpid && (obj.corp_id = this.corpid);
      this.value.length && (obj.acc_id = this.value);
      console.log("obj", obj);
      this.$parent.getData({ starttime: this.date[0], endtime: this.date[1] }, obj);
      this.dialogVisible = false
    },
    mediaHandleChange(value) {
      this.getCompany(value);
      console.log("mediaHandleChange", value);
      console.log("this.corpid", this.corpid);
      this.corpid && this.getCompanyCount(value, this.corpid);
    },
    companyHandleChange(value) {
      console.log("companyHandleChange", value);
      console.log("this.mediaid", this.mediaid);
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
        this.$message("error", "获取数据失败，请稍后重试！");
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
        this.$message("error", "获取数据失败，请稍后重试！");
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
        this.$message("error", "获取数据失败，请稍后重试！");
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
</style>
