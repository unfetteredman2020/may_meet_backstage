<template>
  <div class="chatItemBox">
    <div v-if="yAxis.name" :style="{ width: width }" :id="id" class="liniChart"></div>
    <el-dialog width="90%" :title="this.downloadData.filename" :visible.sync="dialogVisible" v-if="dialogVisible" close="dialog" :before-close="beforClose">
      <div id="dialogBox" style="width: 100%; height: 400px"></div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts/core";

import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { export_json_to_excel } from "@/utils/Export2Excel.js";
import Chart from "@/mixin/chart.js";
let divBox = null;
let myChart = null;
let id = null;
let count = 0;
export default {
  mixins: [Chart],
  props: {},
  components: {},
  data() {
    return {
      list: [],
      dialogCharts: null,
      dialogVisible: false,
      full: require("@/assets/full.png"),
      saveIcon: require("@/assets/save.png"),
      count: 0,
    };
  },
  methods: {
    async download() {
      try {
        console.log("this.downloadData", this.downloadData);
        await export_json_to_excel({ ...this.downloadData });
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "下载失败，请稍后重试！");
      }
    },
    async init() {
      try {
        const that = this;
        echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition]);
        this.chartDom = echarts.init(document.getElementById(this.id));
        let option = {
          // color: ["#5470c6", "#91cc75", "#fac858"],
          title: {
            text: " ",
            textStyle: {
              fontSize: 14,
            },
            subtextStyle: {
              fontSize: 12,
            },
            subtext: this.yAxis?.name,
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [],
            bottom: "0",
            // itemStyle: "inherit",
            ...this.legend,
          },
          grid: {
            left: "5%",
            right: "4%",
            bottom: "15%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
              myTool: {
                show: true,
                title: "全屏查看",
                icon: `image://${this.full}`,
                onclick: function (e) {
                  console.log("e.getOption()", e.getOption());
                  that.dialogVisible = true;
                  // console.log("this.$parent", this.$parent);
                  that.show(that.downloadData.filename, e.getOption());
                },
              },
              myTool2: {
                show: true,
                title: "下载当前图表数据",
                icon: `image://${this.saveIcon}`,
                onclick: function () {
                  that.download();
                },
              },
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#444343",
              formatter: "{value}",
            },
            ...this.xAxis,
          },
          yAxis: {
            type: "value",
            name: "",
            min: "0",
            max: "dataMax",
            axisLabel: {
              color: "#444343",
              formatter: (value, index) => that.formatter && that.formatter(value, index),
            },
            nameTextStyle: {
              align: "center",
            },
          },
          series: [
            {
              colorBy: "data",
              name: "当日",
              type: "line",
              showSymbol: false,
              // stack: "Total",
              data: this.series[0]?.data,
              itemStyle: {
                color: "#ee6666",
              },
            },
            {
              colorBy: "data",
              name: "昨日",
              type: "line",
              // stack: "Total",
              showSymbol: false,
              data: this.series[1]?.data,
              itemStyle: {
                color: "#73c0de",
              },
            },
            {
              colorBy: "data",
              showSymbol: false,
              name: "前天",
              type: "line",
              // stack: "Total",
              data: this.series[2]?.data,
              itemStyle: {
                color: "#fac858",
              },
            },
          ],
        };
        this.option = option;
        option && this.chartDom.setOption(option);
        window.addEventListener("resize", this.resize);
      } catch (error) {
        console.log("error", error);
      }
    },
    show(title, option) {
      // title：弹出框 标题说明
      let val = option;
      console.log("val", val);
      this.dialogVisible = true;
      this.title = title;
      this.$nextTick(() => {
        const divBox = document.getElementById("dialogBox");
        if (myChart != null && myChart != "" && myChart != undefined) {
          console.log("dispose");
          myChart.dispose(divBox);
        }
        myChart = echarts.init(document.getElementById("dialogBox"));
        val.toolbox[0].feature.myTool.show = false;
        myChart.setOption(val);
        //图表大小自适应
        window.addEventListener("resize", this.resize);
      });
    },
    resize() {
      this.chartDom && this.chartDom.resize();
      myChart && myChart.resize();
    },
    beforClose(done) {
      this.dialogVisible = false;
      done();
    },
    destroyed() {
      window.removeEventListener("resize", this.resize);
      myChart.dispose();
      this.chartDom.dispose();
    },
  },
};
</script>

<style scoped>
.liniChart {
  width: 700px;
  /* border: 1px solid blue; */
  height: 200px;
}
.showBox {
  /* border: 1px solid red; */
  width: 100px;
  height: 500px;
}

#dialogBox {
  /* border: 1px solid blue; */
  height: 300px;
  overflow-x: scroll;
}
#dialogBox > div {
  width: 100%;
  height: 300px;
}
#parent {
  display: block;
}
.chatItemBox {
  margin-bottom: 20px;
  background-color: #fff;
  /* '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc' */
  /* color: #5470c6;
  color: #91cc75;
  color: #fac858;
  color: #ee6666;
  color: #73c0de;
  color: #3ba272;
  color: #fc8452;
  color: #9a60b4;
  color: #ea7ccc; */
}
</style>
