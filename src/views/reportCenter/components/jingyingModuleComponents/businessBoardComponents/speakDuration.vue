<template>
  <div class="first">
    <span>嘉宾发言时长统计</span>
    <div class="searchContainer">
      <div>
        <span>日期选择</span>
        <el-date-picker size="mini" @change="tiemChange" v-model="date" type="daterange" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
    </div>
    <el-table :row-style="{ height: '20px', border: '1px solid red' }" max-height="320px" :cell-style="{ padding: '0 10px', 'font-size': '12px' }" :data="newOrOldPeople" stripe style="width: 100%" :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }">
      <el-table-column v-for="item in tableOption" :key="item" :prop="item" :label="item == 'date' ? '日期' : item"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { guestSpeakDuration } from "@/api/reportApi.js";
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
      tableOption: ["date", "S级发言次数", "A级发言次数", "B级发言次数", "C级发言次数", "D级发言次数", "S级发言人数", "A级发言人数", "B级发言人数", "C级发言人数", "D级发言人数", "S级在线时长", "A级在线时长", "B级在线时长", "C级在线时长", "D级在线时长", "S级社交收益", "A级社交收益", "B级社交收益", "C级社交收益", "D级社交收益"],
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
          starttime: "2022-06-01",
          endtime: "2022-07-04",
        };
        const res = await guestSpeakDuration(data || params);
        console.log("guestSpeakDuration res", res);
        if (res && res.errcode == 0) {
          this.newOrOldPeople = res.data || [];
        } else {
                    this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || errormsg ||  "获取数据失败，请稍后重试！");
      }
    },

    search() {
      console.log("this.select", this.select);
      console.log("this.input3", this.input3);
    },
    tiemChange(value) {
      console.log("value", value);
      this.getData(value && {
          starttime: value[0],
          endtime: value[1],
        } || null)
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
