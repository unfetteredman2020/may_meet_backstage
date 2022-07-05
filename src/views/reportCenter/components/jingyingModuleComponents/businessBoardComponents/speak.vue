<template>
  <div class="first">
    <span>新老男女业务数据</span>
    <div class="searchContainer">
      <div>
        <span>日期选择</span>
        <el-date-picker size="mini" @change="tiemChange" v-model="date" type="daterange" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
    </div>
    <div id="speakTimes" class="speakTimes"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { BarChart, LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { speakTimes, peopleOnlineTrend } from "@/api/reportApi.js";
var chartDom = null;
var myChart = null;
var option;

export default {
  props: {},
  components: {},
  data() {
    return {
      date: "",
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
        const res = await speakTimes(params);
        console.log("speakTimes", res);
        if (res && res.errcode == 0) {
          this.newOrOldPeople = res.data || [];
          this.init(res.data);
        } else {
          this.$message("error", "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取数据失败，请稍后重试");
      }
    },
    tiemChange(value) {
      console.log("value", value);
    },
    init(list) {
      let keys = [...new Set(list.map((item) => item["用户类型"]))];
      console.log("keys", keys);
      echarts.use([ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer, UniversalTransition]);

      chartDom = document.getElementById("speakTimes");
      myChart = echarts.init(chartDom);
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["新男", "新女", "老男", "老女"],
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisPointer: {
            type: "shadow",
            
          },
        },
        yAxis: {
          type: "value",
          name: "",
          min: "0",
          max: "dataMax",
          axisLabel: {
            color: "#444343",
          },
          nameTextStyle: {
            align: "center",
          },
        },
        series: [
          {
            name: "新男",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          },
          {
            name: "新女",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
          },
          {
            name: "老男",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
          {
            name: "老女",
            type: "line",
            yAxisIndex: 1,
            data: [1.0, 5.2, 3.3, 9.5, 22.3, 12.2, 20.3, 23.4, 19.0, 16.5, 22.0, 19.2],
          },
        ],
      };

      option && myChart.setOption(option);
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
.speakTimes {
  width: 100%;
  height: 300px;
  border: 1px solid red;
}
</style>
