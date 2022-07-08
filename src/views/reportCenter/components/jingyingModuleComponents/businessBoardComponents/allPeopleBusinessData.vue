<template>
  <div class="first">
    <span>新老男女业务数据</span>
    <div class="searchContainer">
      <div>
        <span>日期选择</span>
        <el-date-picker size="mini" @change="tiemChange" v-model="date" type="daterange" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
      <div>
        <span>用户类型选择</span>
        <el-select style="width: 85px" size="mini" @change="selectChange" v-model="select" placeholder="请选择">
          <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <el-table :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px' }" :data="newOrOldPeople" stripe style="width: 100%" max-height="300px" :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }">
      <el-table-column prop="日期" label="日期"></el-table-column>
      <el-table-column prop="性别" label="性别"></el-table-column>
      <el-table-column prop="用户类型" label="用户类型"></el-table-column>
      <el-table-column prop="DAU" label="DAU"></el-table-column>
      <el-table-column prop="ARPPU" label="ARPPU"></el-table-column>
      <el-table-column prop="DAU减ARPU" label="DAU减ARPU" width="120"></el-table-column>
      <el-table-column prop="APP在线人均分钟数" label="APP在线人均分钟数" width="150"></el-table-column>
      <el-table-column prop="聊天率" label="聊天率"></el-table-column>
      <el-table-column prop="音视频率" label="音视频率"></el-table-column>
      <el-table-column prop="送礼率" label="送礼率"></el-table-column>
      <el-table-column prop="付费率" label="付费率"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allPeopleData } from "@/api/reportApi.js";
import { getDate } from "@/utils/date";
export default {
  props: {},
  components: {},
  data() {
    return {
      date: null,
      select: null,
      options: [
        { label: "全部", value: "4" },
        { label: "新男", value: "0" },
        { label: "新女", value: "1" },
        { label: "老男", value: "2" },
        { label: "老女", value: "3" },
      ],
      newOrOldPeople: [],
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    async getData(data) {
      try {
        let params = {
          starttime: "2022-01-01",
          endtime: getDate().fullDate,
        };
        this.date && ((params.starttime = this.date[0]), (params.endtime = this.date[1]));
        console.log("this.select", this.select);
        this.select && this.select == 4 ? null : (params.type = this.select);
        const res = await allPeopleData(data || params);
        console.log("allPeopleData res ", res);
        if (res && res.errcode == 0) {
          this.newOrOldPeople = res.data || [];
        } else {
          this.$message("error", "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取数据失败，请稍后重试！");
      }
    },

    search() {
      console.log("this.select", this.select);
      console.log("this.input3", this.input3);
    },
    tiemChange(value) {
      console.log("value", value);
      let params = {
        starttime: "2022-01-01",
        endtime: getDate().fullDate,
      };
      value && ((params.starttime = value[0]), (params.endtime = value[1]));
      console.log("this.select", this.select);
      this.select && (this.select == 4 ? "" : (params.type = this.select));
      console.log("params", params);
      this.getData(params);
    },
    selectChange(value) {
      console.log("this.date", this.date);
      console.log("value", value);
      let params = {
        starttime: "2022-01-01",
        endtime: getDate().fullDate,
      };
      this.date && ((params.starttime = this.date[0]), (params.endtime = this.date[1]));
      value == 4 ? null : (params.type = value);
      // console.log("params", params);
      this.getData(params);
    },
  },
};
</script>

<style scoped>
.searchContainer {
  display: flex;
  margin: 20px 0;
}
.searchContainer > div {
  margin: 0 10px;
  display: flex;
  /* border: 1px solid red; */
  /* align-items: center; */
  justify-content: flex-start;
  flex-direction: column;
}
.searchContainer > div > span {
  font-size: 10px;
  color: #051c32;
}
.first {
  padding: 20px 0;
  background-color: #fff;
}
</style>
