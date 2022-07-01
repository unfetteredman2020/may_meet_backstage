<template>
  <div class="chartContainer">
    <header class="headers">
      <el-button size="mini" @click="getDate">
        <i class="el-icon-refresh active"></i>
        刷新
      </el-button>
    </header>
    <div class="topChart">
      <customChat v-for="(item, index) in chartConfig" :key="index" :id="item.id" :series="item.series" :legend="item.legend" :downloadData="item.downloadData" :formatter="item.formatter" :xAxis="item.xAxis" :yAxis="item.yAxis" />
    </div>
    <customChat :width="'100%'" :id="'laston'" :series="lastChartConfig.series" :legend="lastChartConfig.legend" :downloadData="lastChartConfig.downloadData" :formatter="lastChartConfig.formatter" :xAxis="lastChartConfig.xAxis" :yAxis="lastChartConfig.yAxis" />
  </div>
</template>

<script>
import { thridDayBusinessCompare } from "@/api/reportApi.js";
import customChat from "@/components/lineCharts.vue";
import { getDate } from "@/utils/date.js";
export default {
  props: {},
  components: { customChat },
  data() {
    return {
      chartConfig: [
        {
          id: "seconde",
          series: [{ data: [] }, { data: [] }, { data: [] }],
          legend: { data: ["当日", "昨日", "前天"] },
          downloadData: {
            header: ["日期", "周期", "时间", "金额", "累计金额"],
            data: [],
            filename: "总充值金额累计",
          },
          formatter: (value, index) => {
            // value大于1000时除以1000并拼接k，小于1000按原格式显示
            if (value >= 1000000) {
              value = value / 1000000 + "M";
            } else if (value < 1000000) {
              value;
            }
            return value;
          },
        },
      ],
      lastChartConfig: {},
    };
  },
  computed: {},
  mounted() {
    this.getDate();
  },
  methods: {
    async getDate() {
      try {
        const { data } = await thridDayBusinessCompare();
        console.log("data", data);
        this.format(data[0], data[1]);
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取数据失败，请稍后重试！");
      }
    },
    format(list, lastList) {
      const loading = this.$loading({
        lock: true,
        text: "正在加载数据，请稍后.....",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log("list", list);
      // 每一个Excel导出的数据
      let excleConfig = {
        总客ARPU: { header: ["项目", "周期", "时间", "值"], data: [] },
        总充值金额_时段: { header: ["项目", "周期", "时间", "值"], data: [] },
        总客ARPPU: { header: ["项目", "周期", "时间", "值"], data: [] },
        活跃付费人数_累计: { header: ["项目", "周期", "时间", "值"], data: [] },
        活跃付费ARPU: { header: ["项目", "周期", "时间", "值"], data: [] },
        老客ARPU: { header: ["项目", "周期", "时间", "值"], data: [] },
        老客付费金额_时段: { header: ["项目", "周期", "时间", "值"], data: [] },
        老客ARPPU: { header: ["项目", "周期", "时间", "值"], data: [] },
        新客ARPU: { header: ["项目", "周期", "时间", "值"], data: [] },
        当日新增付费金额_时段: { header: ["项目", "周期", "时间", "值"], data: [] },
        新课ARPPU: { header: ["项目", "周期", "时间", "值"], data: [] },
        有效注册人数_时段: { header: ["项目", "周期", "时间", "值"], data: [] },
        付费转化率: { header: ["项目", "周期", "时间", "值"], data: [] },
        当日新增付费留存率: { header: ["项目", "周期", "时间", "值"], data: [] },
        头条安卓当日新增付费转化: { header: ["项目", "周期", "时间", "值"], data: [] },
        快手安卓当日新增付费用户留存: { header: ["项目", "周期", "时间", "值"], data: [] },
        IOS当日新增付费用户留存: { header: ["项目", "周期", "时间", "值"], data: [] },
        活跃用户数_累计: { header: ["项目", "周期", "时间", "累计人数"], data: [] },
        老客付费金额_累计: { header: ["项目", "周期", "时间", "累计金额"], data: [] },

        总充值金额_累计: { header: ["日期", "周期", "时间", "金额", "累计金额"], data: [] },
        有效注册人数_累计: { header: ["日期", "周期", "时间", "有效注册", "累计有效注册"], data: [] },
        当日新增付费金额_累计: { header: ["日期", "周期", "时间", "金额", "金额", "累计金额"], data: [] },
      };
      // 先获取哪三天的日期
      let date = Array.from(new Set(list.map((item) => item.date)));

      // ----------------------------最后一个表格start----------------------------
      let d1 = lastList.filter((item) => item.date.split(" ")[0] == date[0]);
      let d2 = lastList.filter((item) => item.date.split(" ")[0] == date[1]);
      let d3 = lastList.filter((item) => item.date.split(" ")[0] == date[2]);
      let xAxisData = [...new Set(lastList.map((item) => item.date.split(" ")[1]))].sort();
      console.log("xAxisData", xAxisData);
      let downData = lastList.map((item) => [item.date.split(" ")[0] == date[0] ? "当日" : item.date.split(" ")[0] == date[1] ? "昨天" : "前天", item.date.split(" ")[1], item["在线人数"]]);
      console.log("downData", downData);
      console.log("d1", d1);
      let obj = {
        id: "last",
        series: [{ data: d1.map((item) => item["在线人数"]) }, { data: d2.map((item) => item["在线人数"]) }, { data: d3.map((item) => item["在线人数"]) }],
        legend: { data: ["当日", "昨日", "前天"] },
        downloadData: {
          header: ["日期", "时间", "在线数"],
          data: downData,
          filename: "同时在线人数",
        },
        xAxis: {
          data: xAxisData,
        },
        yAxis: {
          name: "同时在线人数",
        },
        formatter: (value, index) => {
          // value大于1000时除以1000并拼接k，小于1000按原格式显示
          if (value >= 1000000) {
            value = value / 1000000 + "M";
          } else if (value < 1000000) {
            value;
          }
          return value;
        },
      };
      this.lastChartConfig = obj;
      // ----------------------------最后一个表格end------------------------------

      let keys = Object.keys(list[0]);
      console.log("keys", keys);

      let data = {
        day1: {
          老客付费金额_累计: [[], [], []], // ....一天包含每一个key
        },
        day2: {
          老客付费金额_累计: [[], [], []],
        },
        day3: {
          老客付费金额_累计: [[], [], []],
        },
      };

      // 3天的数据
      const oneDay = list.filter((item) => item.date == date[0]);
      const twoDay = list.filter((item) => item.date == date[1]);
      const thirdDay = list.filter((item) => item.date == date[2]);

      const day1Hour = oneDay.map((item) => item.hour);
      const day2Hour = twoDay.map((item) => item.hour);
      const day3Hour = thirdDay.map((item) => item.hour);

      //截取index
      let smallLength = Math.min(day1Hour.length, day2Hour.length, day3Hour.length);

      let aAxisData = [...new Set([].concat(day1Hour, day2Hour, day3Hour))].slice(0, smallLength).map((item) => item + "h");
      console.log("smallLength", smallLength);

      data.day1 = this.getItemData(oneDay, keys, smallLength);
      data.day2 = this.getItemData(twoDay, keys, smallLength);
      data.day3 = this.getItemData(thirdDay, keys, smallLength);
      console.log("oneDay", oneDay);
      console.log("twoDay", twoDay);
      console.log("thirdDay", thirdDay);

      for (const item in excleConfig) {
        excleConfig[item].data = this.getDownloadData(item, date, list, smallLength);
      }

      let allItem = [];
      let itemKeys = Object.keys(data.day1);

      console.log("itemKeys", itemKeys);
      console.log("-data-", data);
      console.log("excleConfig", excleConfig);

      for (let index = 0; index < 22; index++) {
        let chartItem = {
          id: "seconde" + index,
          series: [{ data: data.day1[itemKeys[index]] }, { data: data.day2[itemKeys[index]] }, { data: data.day3[itemKeys[index]] }],
          legend: {
            data: ["当日", "昨日", "前天"],
          },
          xAxis: {
            data: aAxisData,
          },
          yAxis: {
            name: itemKeys[index],
          },
          downloadData: {
            header: excleConfig[itemKeys[index]].header,
            data: excleConfig[itemKeys[index]].data,
            filename: `${itemKeys[index]}_${getDate().completeDate}`,
          },
          formatter: (value, dx) => {
            // value大于1000时除以1000并拼接k，小于1000按原格式显示
            if (value >= 10000) {
              value = value / 10000 + "W";
            } else if (value < 10000) {
              value;
            }
            return value;
          },
        };
        allItem.push(chartItem);
      }
      loading.close();
      console.log("allItem", allItem);
      this.chartConfig = allItem;
    },
    // 获取每一天中所有key的value
    getItemData(arr, keys, sliceInd) {
      let obj = {};
      // 生成每一项所以item的key的Object对象
      keys.forEach((item) => (item !== "date" || item !== "hour") && (obj[item] = []));
      // 为每个key获取对应的数据
      for (const key in obj) {
        obj[key] = arr.map((item) => item[key]).slice(0, sliceInd);
      }
      const { date, hour, ...res } = obj;
      return res;
    },
    getDownloadData(name, date, arr, smallLength) {
      let a = [];
      arr.forEach((item, index) => {
        let dateStatus = item.date == date[0] ? "当日" : item.date == date[1] ? "昨天" : "前天";
        let temp = [];
        let sum = index == 0 ? item[name] : item[name] + a[index - 1][a[index - 1].length - 1];
        switch (name) {
          case "总充值金额_累计" || "有效注册人数_累计" || "当日新增付费金额_累计":
            console.log("name", name);
            temp = [name, dateStatus, item.hour, item[name], sum];
            break;
          default:
            temp = [name, dateStatus, item.hour, item[name]];
            break;
        }
        a.push(temp);
      });
      return a.slice(0, smallLength);
    },
  },
};
</script>

<style scoped>
.chartContainer {
  background-color: #f2f3f4;
  /* border: 1px solid red; */
  max-height: 800px;
  padding: 0 50px;
  overflow-y: scroll;
}
.topChart {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.headers {
  margin: 10px 0;
  /* border: 1px solid red; */
  display: flex;
  justify-content: flex-end;
}
.active {
  animation: fadenum 1s linear;
}
@keyframes fadenum {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
