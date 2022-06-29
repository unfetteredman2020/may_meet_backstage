<template>
  <div>
    <div :id="id" class="liniChart"></div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <div id="dialogBox"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close">关闭</el-button>
      </span>
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
    };
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    async download() {
      try {
        console.log('this.downloadData',{...this.downloadData} )
        await export_json_to_excel({...this.downloadData});
      } catch (error) {
        console.log("error", error);
      }
    },
    async init() {
      try {
        const that = this;
        console.log('that.props', that)
        echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition]);
        this.chartDom = echarts.init(document.getElementById(this.id));
        let option = {
          title: {
            text: "",
            textStyle: {
              fontSize: 10,
            },
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [],
            bottom: "0",
            ...this.legend,
          },
          grid: {
            left: "3%",
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
                onclick: function () {
                  that.dialogVisible = true;
                  that.show("测试");
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
            // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
            name: "总充值金额（累计）",
            min: "dataMin",
            max: "dataMax",
            axisLabel: {
              color: "#444343",
              formatter: function (value, index) {
                // value大于1000时除以1000并拼接k，小于1000按原格式显示
                if (value >= 1000000) {
                  value = value / 1000000 + "M";
                } else if (value < 1000000) {
                  value;
                }
                return value;
              },
            },
          },
          series: [
            {
              name: "当日",
              type: "line",
              showSymbol: false,
              stack: "Total",
              data: this.series[0].data,
            },
            {
              name: "昨日",
              type: "line",
              stack: "Total",
              showSymbol: false,
              data: this.series[1].data,
            },
            {
              showSymbol: false,
              name: "前天",
              type: "line",
              stack: "Total",
              data: this.series[2].data,
            },
          ],
        };

        option && this.chartDom.setOption(option);
        this.option = option;
      } catch (error) {
        console.log("error", error);
      }
    },
    show(title, a, id) {
      // title：弹出框 标题说明
      let val = this.option;
      console.log("val", val);
      this.dialogVisible = true;
      this.title = title;
      this.$nextTick(() => {
        let divBox = document.getElementById("dialogBox");
        this.dialogCharts = echarts.init(divBox);
        val.toolbox.feature.myTool.show = false;
        this.dialogCharts.setOption(val);
        //图表大小自适应
        window.addEventListener("resize", () => {
          this.dialogCharts.resize();
        });
      });
    },
    close() {
      console.log('close')
      this.dialogVisible = false;
      this.dialogCharts.dispose();
    },
    destroyed() {
      
    },
  },
};
</script>

<style scoped>
.liniChart {
  width: 500px;
  border: 1px solid blue;
  height: 200px;
}
.showBox {
  border: 1px solid red;
  width: 100px;
  height: 500px;
}
#dialogBox {
  /* border: 1px solid blue; */
  height: 300px;
}
#dialogBox > div {
  width: 100%;
  height: 300px;
}
</style>
