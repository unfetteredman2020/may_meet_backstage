<template>
  <div class="jingyingshujuzongbiao">
    <div class="reportSearchBox">
      <span style="font-size: 14px; font-weight: 800">{{ "各时段注册数" }}</span>
      <div class="second">
        <div class="msg">
          <el-button  type="info">查看报表说明</el-button>
          <p style="font-size: 12px; margin: 5px 10px; font-weight: 600">数据源：誓聊只读库</p>
        </div>
        <div class="form">
          <el-date-picker @change="dateChange" v-model="date"  type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <el-select style="width: 85px; margin: 0 10px" clearable  v-model="sex" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search"  @click="search">查询</el-button>
        </div>
      </div>
    </div>
    <SelectTableColumn :tableList="list" :customProps="customProps" />
  </div>
</template>

<script>
import Search from "../commonComponent/searchComponent.vue";
import SelectTableColumn from "../commonComponent/customTable.vue";
import { registCount } from "@/api/reportApi.js";
import { getDate } from "@/utils/date";
import tableConfig from "../tableConfig/gsdzcs_table_config.js"; // 公用头条 安卓新增付费用户table 配置

export default {
  props: {},
  components: {
    Search: Search,
    SelectTableColumn: SelectTableColumn,
  },
  data() {
    return {
      list: [],
      sex: "",
      options: [
        { label: "所有", value: "2" },
        { label: "男", value: "0" },
        { label: "女", value: "1" },
      ],
      date: [new Date("2022-01-01"), new Date()],
      customProps: {
        tableName: "registCountTableConfig", // tableName： table标识，用来做table的key
        tableConfig, //table 每一列数据的key-value对应关系的Object；{key：value}；key指绑定column的英文名称，value指每一列的中文名称，不可为空
      },
    };
  },
  computed: {},
  mounted() {
    this.getTableData();
  },
  methods: {
    dateChange(value) {
      console.log("value", value);
      setTimeout(() => {
        console.log("this.date", this.date);
      }, 2000);
    },
    search() {
      // console.log('e', this.date)
      const starttime = getDate(this.date[0]).fullDate;
      const endtime = getDate(this.date[1]).fullDate;
      let url = `starttime=${starttime}&endtime=${endtime}`;
      this.sex && (url = url + `&sex=${this.sex}`);
      this.getTableData(url);
    },
    async getTableData(url) {
      try {
        let starttime = getDate("2022-01-02").fullDate,endtime = getDate().fullDate;
        const res = await registCount(url || `starttime=${starttime}&endtime=${endtime}`);
        console.log("registCount res", res);
        if (res && res.errcode == 0) {
          this.list = res.data;
        } else {
          this.$message("error", res.errmsg || "获取列表失败，请稍后重试");
        }
      } catch (error) {
        this.$message("error", error.errmsg || "获取列表失败，请稍后重试");
        console.log("error", error);
      }
    },
  },
};
</script>

<style scoped>
.jingyingshujuzongbiao {
  box-sizing: border-box;
  /* border: 1px solid red; */
}
.reportSearchBox {
  /* display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column; */
  padding-left: 10px;
}
.second {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.msg {
  width: 500px;
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: nowrap;
  margin: 15px 0;
}
.form {
  /* border: 1px solid blue; */
  flex: 1;
}
</style>
