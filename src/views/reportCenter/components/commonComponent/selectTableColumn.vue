<template>
  <div>
    <el-button size="mini" type="primary" @click="configCheckBox" class="el-icon-s-data">表格配置</el-button>
    <download-excel class="downloadStyle" :fields="exportDataStandard" :data="exportData" type="xls" :name="exportName" :header="exportHeader" :footer="exportFooter" :defaultValue="exportDefaultValue" :fetch="createExportData" :before-generate="startDownload" :before-finish="finishDownload" worksheet="导出信息">
      <el-button size="mini" type="primary" class="el-icon-download">下载</el-button>
    </download-excel>
    <!-- 表格  -->
    <el-table border stripe :data="showList" style="width: 100%" max-height="670px" class="customTableStyle">
      <el-table-column min-width="150px" sortable v-for="item in column" :key="item.value" :prop="item.value" :label="item.text"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    <!-- 弹框 -->
    <el-dialog title="提示" :visible.sync="selectTableColumnVisible" width="70%">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0"></div>
      <el-checkbox-group v-model="checkedItem" @change="handleCheckedChange" class="checkboxGroup">
        <el-checkbox style="min-width: 20%" v-for="item in config" :label="item.text" :key="item.value">
          {{ item.text }}
          <!-- <el-input-number size="mini" v-model="item.width" style="width: 100px" controls-position="right" :min="10" :max="300"></el-input-number> -->
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectTableColumnVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sumTableOfPlatformOpration } from "@/api/reportApi.js";
import config from "./tableConfig.js";
const { columms, mockList, ChineseKeys } = config;
console.log("ChineseKeys", ChineseKeys);
import { getDate } from "@/utils/date";
export default {
  props: {},
  components: {},
  data() {
    return {
      checkAll: false, // 是否全选
      checkedItem: [], // CheckBox 选中的数据
      column: columms, //要展示的列配置数据
      config: columms, //全部字段配置 [{text: '', value: '', width: ''},.....]
      isIndeterminate: true,
      showList: [], //每一页的数据，前端分页
      list: [], // 后端接口全部list数据
      currentPage: 1, //分页当前页
      total: 0, //总数
      pageSize: 10, //每一页数据
      selectTableColumnVisible: false,
      exportDataStandard: {}, //导出数据表头配置
      exportData: mockList, // 导出数据
      exportName: `报表数据${getDate().fullDate}-${getDate().fullTime}`, // 导出文件名字
      exportHeader: ["平台经营数据总表"], //页头
      exportFooter: [""],
      exportDefaultValue: "没有数据", // 每一列没有数据填充文字
    };
  },
  computed: {},
  mounted() {
    let platformTableConfig = JSON.parse(localStorage.getItem("platformTableConfig"));
    platformTableConfig && (this.column = platformTableConfig);
    this.handleSelectedTableColumn();
    this.getTableData();
    // 先解绑事件，再绑定，避免多次触发绑定的事件
    this.$eventBus.$off("reportSearch");
    this.$eventBus.$on("reportSearch", this.getTableData);
  },
  methods: {
    configCheckBox() {
      this.selectTableColumnVisible = true;
      this.handleSelectedTableColumn();
    },
    async getTableData(data) {
      try {
        let params = {
          starttime: getDate("2022-01-02").fullDate,
          endtime: getDate().fullDate,
        };
        const res = await sumTableOfPlatformOpration(data || params);
        if (res && res.errcode == 0) {
          this.total = res.data.length;
          this.list = res.data;
          this.showList = res.data.slice(0, 20);
        }
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    },
    comfirm() {
      const { checkedItem } = this;
      if (!checkedItem.length) {
        return this.$message("error", "请至少选择一项展示数据");
      }
      this.handleFilterSelectColumn();
      this.selectTableColumnVisible = false;
    },
    handleClose() {},
    handleCheckAllChange(val) {
      console.log("val", val);
      let arr = [];
      val && (arr = this.config.map((item) => item.text));
      console.log("arr", arr);
      this.checkedItem = arr;
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.column.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.column.length;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
      const current = this.currentPage;
      const list = this.list;
      const total = this.total;
      const pageSize = val;
      const count = parseInt((total + pageSize - 1) / pageSize); //总页数
      let arr = list.slice(0, val);
      this.showList = arr;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      const list = this.list;
      const pageSize = this.pageSize;
      const start = (val - 1) * pageSize;
      const end = val * pageSize;
      this.showList = list.slice(start, end);
    },
    // 根据table数据计算checkBox要选中的列数据配置
    handleSelectedTableColumn() {
      this.checkedItem = this.column.map((item) => item.text);
    },
    // 根据配置获取要展示的列数据
    handleFilterSelectColumn() {
      let arr = [];
      this.checkedItem.forEach((key) => {
        let item = this.config.filter((item) => item.text == key);
        item && arr.push(item[0]);
      });
      this.column = arr;
      localStorage.setItem("platformTableConfig", JSON.stringify(arr));
    },
    createExportData() {
      // 点击导出按钮之后,开始导出数据之前的执行函数,返回值为需要下载的数据
      // TODO:构造需要下载的数据返回
      let obj = {};
      this.column.forEach((item) => {
        obj[item.text] = item.value;
      });
      console.log("arr", obj);
      this.exportDataStandard = obj;
      return this.showList;
    },
    startDownload() {
      console.log("数据开始");
    },
    finishDownload() {
      console.log("数据下载完成");
    },
  },
  destroyed() {
    this.$eventBus.$off("reportSearch");
  },
};
</script>

<style scoped>
.downloadStyle {
  margin: 0 10px;
  /* border: 1px solid red; */
  display: inline;
  /* width: 100px;s */
}
.customTableStyle /deep/ .cell {
  white-space: nowrap;
}
.customTableStyle /deep/ th {
  width: 2300px !important;
}
.checkboxGroup {
  /* border: 1px solid blue; */
  display: flex;
  flex-wrap: wrap;
}
</style>
