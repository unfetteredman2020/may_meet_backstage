<template>
  <div>
    <el-popover placement="right" width="400" trigger="hover">
      <div class="settingBox">
        <el-button type="primary" @click="configCheckBox" class="el-icon-s-data">表格配置</el-button>
        <download-excel class="downloadStyle" :fields="exportDataStandard" :data="exportData" type="xls" :name="exportName" :header="exportHeader" :footer="exportFooter" :defaultValue="exportDefaultValue" :fetch="createExportData" :before-generate="startDownload" :before-finish="finishDownload" worksheet="导出信息">
          <el-button type="primary" class="el-icon-download">下载</el-button>
        </download-excel>
      </div>
      <div slot="reference" class="setBtn">操作</div>
    </el-popover>

    <!-- 表格  -->
    <div class="wrapper">
      <el-table :show-summary="customProps.show_summary || false" :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" border stripe :data="showList" style="width: 100%" max-height="100%" class="customTableStyle wrapper" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px' }">
        <el-table-column label-class-name="labelClass" class-name="columnClass" min-width="150px" sortable v-for="item in column" :key="item.value" :prop="item.value" :label="item.text"></el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    <!-- 弹框 -->
    <el-dialog title="提示" :visible.sync="selectTableColumnVisible" width="70%">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0"></div>
      <el-checkbox-group v-model="checkedItem" @change="handleCheckedChange" class="checkboxGroup">
        <el-checkbox style="min-width: 20%" v-for="item in config" :label="item.text" :key="item.value">
          {{ item.text }}
          <!-- <el-input-number  v-model="item.width" style="width: 100px" controls-position="right" :min="10" :max="300"></el-input-number> -->
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
import { getDate } from "@/utils/date";

export default {
  props: {
    tableList: {
      type: Array,
      default: () => [],
    },
    customProps: {
      type: Object,
      required: true,
      validator: function (value) {
        //自定义验证函数
        if (!(value.tableName && value.tableConfig)) {
          throw Error("请检查props中customProps字段是否传入");
        }
        return value;
      },
    },
  },
  components: {},
  data() {
    return {
      isLoading: true,
      checkAll: false, // 是否全选
      checkedItem: [], // CheckBox 选中的数据
      column: [], //要展示的列配置数据
      config: [], //全部字段配置 [{text: '', value: '', width: ''},.....]
      isIndeterminate: true,
      showList: [], //每一页的数据，前端分页
      list: [], // 后端接口全部list数据
      currentPage: 1, //分页当前页
      total: 0, //总数
      pageSize: 50, //每一页数据
      selectTableColumnVisible: false,
      exportDataStandard: {}, //导出数据表头配置
      exportData: [], // 导出数据
      exportName: `报表数据${getDate().fullDate}-${getDate().fullTime}`, // 导出文件名字
      exportHeader: [getDate().fullDateType], //页头
      exportFooter: [""],
      exportDefaultValue: "没有数据", // 每一列没有数据填充文字
      tableHeight: 0,
    };
  },
  computed: {},
  mounted() {
    let platformTableConfig = JSON.parse(localStorage.getItem(this.customProps.tableName));
    platformTableConfig && (this.column = platformTableConfig);
    this.formatTableConfig(!platformTableConfig);
  },
  watch: {
    tableList(newValue, oldValue) {
      console.log("newValue", newValue);
      this.total = newValue.length;
      this.list = newValue || [];
      this.showList = newValue.slice(0, this.pageSize);
    },
    // 解决一些场景数据获取不到问题
    customProps(newValue, oldValue) {
      this.formatTableConfig(true);
    },
  },
  methods: {
    // 表格配置
    configCheckBox() {
      this.selectTableColumnVisible = true;
      this.handleSelectedTableColumn();
    },
    // CheckBox Dialog确认表头配置
    comfirm() {
      const { checkedItem } = this;
      if (!checkedItem.length) {
        return this.$message("error", "请至少选择一项展示数据");
      }
      this.handleFilterSelectColumn();
      this.selectTableColumnVisible = false;
    },
    handleClose() {},
    // 全选
    handleCheckAllChange(val) {
      let arr = [];
      val && (arr = this.config.map((item) => item.text));
      this.checkedItem = arr;
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.column.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.column.length;
    },
    // 修改每一页的展示数据条数
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
    // 选择某一页
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
      localStorage.setItem(this.customProps.tableName, JSON.stringify(arr));
    },
    // 下载之前构造所需的表头和table数据
    createExportData() {
      // 点击导出按钮之后,开始导出数据之前的执行函数,返回值为需要下载的数据
      // TODO:构造需要下载的数据返回
      /***
       * 点击导出按钮之后,开始导出数据之前的执行函数,返回值为需要下载的数据
       * TODO:
       * 1,处理表头数据
       * 2，返回当前表格的数据
       */
      let obj = {};
      this.column.forEach((item) => {
        obj[item.text] = item.value;
      });
      this.exportDataStandard = obj;
      return this.showList || [];
    },
    startDownload() {
      console.log("数据开始");
    },
    finishDownload() {
      console.log("数据下载完成");
    },
    formatTableConfig(bool) {
      let revers = [];
      let tableConfig = this.customProps.tableConfig;
      for (const key in tableConfig) {
        revers.push({
          text: tableConfig[key],
          value: key,
          width: "100",
        });
      }

      bool && (this.column = revers);
      this.config = revers;
    },
  },
  destroyed() {},
};
</script>

<style scoped>
.setBtn {
  z-index: 100;
  position: fixed;
  top: 140px;
  right: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  /* border: 1px solid red; */
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-image: linear-gradient(to right, rgba(38, 36, 195, 0.607), rgb(20, 211, 218));

  border-radius: 50%;
}
.el-main {
  line-height: 50px;
}
.downloadStyle {
  margin: 0 10px;
  /* border: 1px solid red; */
  display: inline;
  /* width: 100px;s */
}
.wrapper {
  height: calc(100vh - 250px);
  min-height: calc(100vh - 200px);
}
.customTableStyle /deep/ .cell {
  white-space: nowrap;
}

.checkboxGroup {
  /* border: 1px solid blue; */
  display: flex;
  flex-wrap: wrap;
}
.columnClass {
  border: 1px solid blue !important;
}
.labelClass {
  border: 1px solid orchid;
}
</style>
