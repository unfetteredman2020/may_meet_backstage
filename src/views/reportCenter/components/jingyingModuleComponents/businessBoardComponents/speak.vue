<template>
  <div class="first">
    <div class="searchContainer">
      <div>
        <el-tag style="border-radius: none !important" effect="light" size="medium" :hit="true">日期选择：</el-tag>
        <!-- <span>日期选择：</span> -->
        <el-date-picker  @change="tiemChange" v-model="date" type="daterange" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
    </div>
    <div :id="id" class="speakTimes"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, TitleComponent } from "echarts/components";
import { BarChart, LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { speakPersonTimes } from "@/api/reportApi.js";
var chartDom = null;
var myChart = null;
var option;
export default {
  props: {
    id: {
      type: String,
      default: "abc",
    },
    config: {
      type: Object,
      default: function () {
        return {
        id: '',
        subText: '测试',
        data: [],
        methodName: ''
      }
      }
    }
  },
  components: {},
  data() {
    return {
      date: [],
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    tiemChange(value) {
      console.log("value", value);
      this.$parent[this.config.methodName](value&&{starttime:value[0], endtime:value[1] || null})
    },
    init(list) {
      
      let keys = [...new Set(list.map((item) => item["用户类型"]))];
      let date = [...new Set(list.map((item) => item.date))];
      let newWoman = [];
      let newMan = [];
      let oldWoman = [];
      let oldMan = [];
      list.forEach((item) => {
        let count = item[this.config.subText]
        switch (item["用户类型"]) {
          case "新女":
            newWoman.push(count);
            break;
          case "新男":
            newMan.push(count);
            break;
          case "老女":
            oldWoman.push(count);
            break;
          case "老男":
            oldMan.push(count);
            break;
        }
      });
      console.log('first', newWoman,newMan, oldWoman, oldMan )
      console.log("keys ", keys);
      echarts.use([ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer, TitleComponent, LineChart,ToolboxComponent]);
      chartDom = document.getElementById(this.id);
      myChart = echarts.init(chartDom);
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        title: {
          subtext: this.config.subText,
        },
        legend: {
          data: ["新女", "新男", "老女", "老男"],
          bottom: 10,
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
          right: "10%",
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: date,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "新女",
            type: "line",
            barGap: 0,
            showSymbol: false,
            emphasis: {
              focus: "series",
            },
            data: newWoman,
          },
          {
            name: "新男",
            type: "line",
            showSymbol: false,
            emphasis: {
              focus: "series",
            },
            data: newMan,
          },
          {
            name: "老女",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: oldWoman,
          },
          {
            name: "老男",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: oldMan,
          },
        ],
      };

      option && myChart.setOption(option);
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
  background-color: #fff;
}
.searchContainer > div {
  margin: 0 10px;
  display: flex;
  /* border: 1px solid red; */
  /* align-items: center; */
  justify-content: flex-start;
  align-items: center;
  /* flex-direction: column; */
}
.searchContainer > div > span {
  font-size: 10px;
  font-weight: 600;
  /* color: #051c32; */
}
.first {
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  min-width: calc((100vw - 220px - 40px) / 2);
  /* border: 1px solid blue; */
}
.speakTimes {
  /* width: 50%; */
  height: 300px;
  width: calc((100vw - 220px - 150px) / 2);
  /* border: 1px solid red; */
}
</style>
