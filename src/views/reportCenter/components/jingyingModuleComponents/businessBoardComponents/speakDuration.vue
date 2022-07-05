<template>
  <div class="first">
    <span>嘉宾发言时长统计</span>
    <div class="searchContainer">
      <div>
        <span>日期选择</span>
        <el-date-picker size="mini" @change="tiemChange" v-model="date" type="daterange" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
import { allPeopleData, peopleOnlineTrend } from "@/api/reportApi.js";
export default {
  props: {},
  components: {},
  data() {
    return {
      date: "",
      select: "",
      options: [
        { label: "全部", value: "" },
        { label: "新男", value: "" },
        { label: "新女", value: "" },
        { label: "老男", value: "" },
        { label: "老女", value: "" },
      ],
      newOrOldPeople: [],
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let params = {
          starttime: "2022-06-01",
          endtime: "2022-07-04",
        };
        const res = await allPeopleData(params);
        console.log("res", res);
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
    },
    selectChange(value) {
      console.log("value", value);
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
