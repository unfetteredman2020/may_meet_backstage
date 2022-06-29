<template>
  <div>
    <div ref="mycharts" id="mycharts" class="mycharts"></div>
    <customChat :id="chartConfig.id" :series="chartConfig.series" :legend="chartConfig.legend" :downloadData="chartConfig.downloadData" />

    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <div id="dialogBox"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { thridDayBusinessCompare } from "@/api/reportApi.js";
import * as echarts from "echarts/core";
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { export_json_to_excel } from "@/utils/Export2Excel.js";
import customChat from "@/components/lineCharts.vue";

let chartDom;
let myChart;
let option;
const paymentStatusMap = ["良好", "正常", "优秀"];
export default {
  props: {},
  components: { customChat },
  data() {
    return {
      chartConfig: {
        id: "seconde",
        series: [],
        legend: {
          data: ["当日", "昨日", "前天"],
        },
        downloadData: {
          header: ["日期", "周期", "时间", "金额", "累计金额"],
          data: [],
          filename: "总充值金额累计",
        },
      },
      list: [],
      dialogVisible: false,
      full: require("@/assets/full.png"),
      saveIcon: require("@/assets/save.png"),
      parasm: [
        {
          sn: "测试单号",
          name: "1",
          status: 1,
          amount: "1111",
          paymentTime: "2020-12-23",
          remark: "备注测试",
          creatorName: "创建人",
        },
        {
          sn: "测试单号",
          name: "1",
          status: 1,
          amount: "1111",
          paymentTime: "2020-12-23",
          remark: "备注测试",
          creatorName: "创建人",
        },
        {
          sn: "测试单号",
          name: "1",
          status: 1,
          amount: "1111",
          paymentTime: "2020-12-23",
          remark: "备注测试",
          creatorName: "创建人",
        },
        {
          sn: "测试单号",
          name: "1",
          status: 1,
          amount: "1111",
          paymentTime: "2020-12-23",
          remark: "备注测试",
          creatorName: "创建人",
        },
      ],
      oneDay: [],
      twoDay: [],
      thirdDay: [],
    };
  },
  computed: {},
  mounted() {
    this.getDate();
    this.$nextTick(() => {
      echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition]);
      chartDom = document.getElementById("mycharts");
      myChart = echarts.init(chartDom);
    });
  },
  methods: {
    async download() {
      try {
        const header = ["缴费单号", "缴费单名称", "状态", "缴费金额", "缴费时间 ", "备注", "创建人", "创建时间", "更新时间"];
        const filterVal = ["sn", "name", "status", "amount", "paymentTime", "remark", "creatorName", "createTime", "updateTime"];
        console.log("header", filterVal);

        const data = Array.from(this.formatJson(filterVal, this.parasm));
        console.log("data", data);
        await export_json_to_excel({ header, data, filename: "测试列表" });
      } catch (error) {
        console.log("error", error);
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "status") {
            return paymentStatusMap[v[j]];
          } else {
            return v[j];
          }
        })
      );
    },
    async init(day1, day2, day3) {
      try {
        const that = this;
        console.log("this.full", this.full);
        option = {
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
            data: ["当日", "昨日", "前天"],
            bottom: "0",
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
                  that.show("ces", {}, "2353");
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
              data: day1,
            },
            {
              name: "昨日",
              type: "line",
              stack: "Total",
              showSymbol: false,

              data: day2,
            },
            {
              showSymbol: false,

              name: "前天",
              type: "line",
              stack: "Total",
              data: day3,
            },
          ],
        };

        option && myChart.setOption(option);
      } catch (error) {
        console.log("error", error);
      }
    },
    show(title, a, id) {
      // title：弹出框 标题说明
      // val：  父组件中 echart的option数据
      // id：   自定义 id
      let val = option;
      console.log("val", val);
      this.dialogVisible = true;
      this.title = title;
      this.$nextTick(() => {
        let divBox = document.getElementById("dialogBox");
        let newCharts = echarts.init(divBox);
        val.toolbox.feature.myTool.show = false;
        newCharts.setOption(val);
        //图表大小自适应
        window.addEventListener("resize", () => {
          newCharts.resize();
        });
      });
    },
    async getDate() {
      try {
        const { data } = await thridDayBusinessCompare();
        let list = data[0];
        this.format(list);

        console.log("-res-", res);
      } catch (error) {}
    },
    format(list) {
      console.log("list", list);

      let date = Array.from(new Set(list.map((item) => item.date)));
      let day1 = { hour: [], 老客付费金额_累计: [] };
      let day2 = { hour: [], 老客付费金额_累计: [] };
      let day3 = { hour: [], 老客付费金额_累计: [] };
      let download = [];

      const oneDay = list.filter((item) => item.date == date[0]);
      const twoDay = list.filter((item) => item.date == date[1]);
      const thirdDay = list.filter((item) => item.date == date[2]);

      // ['日期', '周期', '时间', '时间', '金额', '累计金额']

      list.forEach((item, index) => {
        let sum = index == 0 ? item["老客付费金额_累计"] : item["老客付费金额_累计"] + download[index - 1][4];
        let dateStatus =  item.date == date[0] ? '当日': item.date == date[1] ? '昨日': '前天'
        
        if (item.date == date[0]) {
          day1.hour.push(item.hour);
          day1["老客付费金额_累计"].push(item["老客付费金额_累计"]);
        }
        if (item.date == date[1]) {
          day2.hour.push(item.hour);
          day2["老客付费金额_累计"].push(item["老客付费金额_累计"]);
        }
        if (item.date == date[2]) {
          day3.hour.push(item.hour);
          day3["老客付费金额_累计"].push(item["老客付费金额_累计"]);
        }
        let temp = [item.date, dateStatus , item.hour, item["老客付费金额_累计"], sum];
        download.push(temp)
      });

     console.log('download', download)

      let smallLength = Math.min(day1.hour.length, day2.hour.length, day3.hour.length);

      this.chartConfig.downloadData.data = download;

      day1.hour.length > smallLength ? ((day1.hour = day1.hour.slice(0, smallLength)), (day1["老客付费金额_累计"] = day1["老客付费金额_累计"].slice(0, smallLength))) : "";
      day2.hour.length > smallLength ? ((day2.hour = day2.hour.slice(0, smallLength)), (day2["老客付费金额_累计"] = day2["老客付费金额_累计"].slice(0, smallLength))) : "";
      day3.hour.length > smallLength ? ((day3.hour = day3.hour.slice(0, smallLength)), (day3["老客付费金额_累计"] = day3["老客付费金额_累计"].slice(0, smallLength))) : "";

      console.log("smallLength", smallLength);
      console.log("day1", day1);
      console.log("day2", day2);
      console.log("day3", day3);
      console.log("this", this.oneDay);
      console.log("first", this.twoDay);
      console.log("this.thirdDay", this.thirdDay);

      this.chartConfig.series = [
        { name: "当日", data: day1.老客付费金额_累计 },
        { name: "昨天", data: day2.老客付费金额_累计 },
        { name: "前天", data: day3.老客付费金额_累计 },
      ];
      this.init(day1.老客付费金额_累计, day2.老客付费金额_累计, day3.老客付费金额_累计);
    },
  },
};
</script>

<style scoped>
.mycharts {
  width: 500px;
  border: 1px solid red;
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
