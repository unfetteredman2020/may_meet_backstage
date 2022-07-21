<template>
  <div class="first">
    <span>男女同时在线趋势</span>
    <div class="searchContainer">
      <div>
        <span>日期选择</span>
        <el-date-picker  @change="tiemChange" v-model="date" type="datetimerange" value-format="yyyy-MM-dd HH:MM:SS" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
    </div>
    <div id="onlineBox" class="onlineBox"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { DatasetComponent, TitleComponent, TooltipComponent, GridComponent, TransformComponent, LegendComponent, ToolboxComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { peopleOnlineTrend } from "@/api/reportApi.js";
import { getDate } from "@/utils/date";
import axios from "axios";
var chartDom = null;
var myChart = null;
var option;

export default {
  props: {},
  components: {},
  data() {
    return {
      date: null,
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
          starttime: "2022-01-01 00:01:01",
          endtime: `${getDate().fullDate} 00:01:01`,
        };
        this.date && ((params.starttime = this.date[0]), (params.endtime = this.date[1]));
        console.log("params ", params);
        const onlineRes = await peopleOnlineTrend(data || params);
        console.log("peopleOnlineTrend ", onlineRes);
        if (onlineRes && onlineRes.errcode == 0) {
          this.init(onlineRes.data);
          this.newOrOldPeople = onlineRes.data || [];
        } else {
                    this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg ||  "获取数据失败，请稍后重试！");
      }
    },
    tiemChange(value) {
      console.log("value", value);
      this.getData(
        (value && {
          starttime: value[0],
          endtime: value[1],
        }) ||
          null
      );
    },
    async init(data) {
      let date = [...new Set(data.map((item) => item.date))].sort();
      // console.log("date", date);
      echarts.use([DatasetComponent, TitleComponent, TooltipComponent, GridComponent, TransformComponent, LineChart, CanvasRenderer, LabelLayout, UniversalTransition, LegendComponent, ToolboxComponent]);
      chartDom = document.getElementById("onlineBox");
      myChart = echarts.init(chartDom);

      option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["男性在线人数", "男付费在线人数", "女性在线人数", "嘉宾S在线人数", "嘉宾在线人数", "嘉宾A在线人数", "嘉宾B在线人数"],
          bottom: 0,
          // itemStyle: "inherit",
          // ...this.legend,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
        },
        toolbox: {
          show: true,
          // orient: "vertical",
          // left: "right",
          // top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: date,
          splitLine: {
            show: false,
          },
          axisLabel: {
            rotate: 77,
            fontStyle: "oblique",
            fontSize: 11,
            hideOverlap: true,
            rich: {
              yearStyle: {
                // 让年度信息更醒目
                color: "#000",
                fontWeight: "bold",
              },
              monthStyle: {
                color: "#999",
              },
            },
          },
        },
        yAxis: {
          type: "value",
          // splitNumber: 8,
        },
        series: [
          {
            name: "女性在线人数",
            type: "line",
            symbol: "none",
            // stack: "Total",
            data: data.map((item) => item["女性在线人数"]),
          },
          {
            name: "嘉宾S在线人数",
            type: "line",
            symbol: "none",
            // stack: "Total",
            data: data.map((item) => item["嘉宾S在线人数"]),
          },
          {
            name: "嘉宾A在线人数",
            type: "line",
            symbol: "none",
            // stack: "Total",
            data: data.map((item) => item["嘉宾A在线人数"]),
          },
          {
            name: "嘉宾B在线人数",
            type: "line",
            symbol: "none",
            // stack: "Total",
            data: data.map((item) => item["嘉宾B在线人数"]),
          },
          {
            name: "男性在线人数",
            type: "line",
            symbol: "none",
            showSymbol: false,
            // stack: "Total",
            data: data.map((item) => item["男性在线人数"]),
          },
          {
            name: "嘉宾在线人数",
            type: "line",
            symbol: "none",
            showSymbol: false,
            // stack: "Total",
            data: data.map((item) => item["嘉宾在线人数"]),
          },
          {
            name: "男付费在线人数",
            type: "line",
            symbol: "none",
            showSymbol: false,
            // stack: "Total",
            data: data.map((item) => item["男付费在线人数"]),
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", this.resize);
    },
    resize() {
      myChart.resize();
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
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
.onlineBox {
  width: 100%;
  height: 300px;
}
</style>
