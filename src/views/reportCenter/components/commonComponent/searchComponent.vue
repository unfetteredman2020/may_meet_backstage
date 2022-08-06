<template>
  <div class="reportSearchBox">
    <span style="font-size: 14px; font-weight: 800">{{ text }}</span>
    <div class="second">
      <div class="msg">
        <el-button type="info">查看报表说明</el-button>
        <p style="font-size: 12px; margin: 5px 10px; font-weight: 600">数据源：誓聊只读库</p>
      </div>
      <div class="form">
        <el-date-picker value-format="yyyy-MM-dd" v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "用户行为记录表格",
    },
  },
  components: {},
  data() {
    return {
      date: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    search() {
      if (!this.date.length) {
        return this.$message("info", "请选择筛选时间");
      }
      this.$parent.getTableData({ starttime: this.date[0], endtime: this.date[1] });
    },
  },
};
</script>

<style scoped>
.reportSearchBox {
  padding-left: 10px;
}
.second {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.msg {
  width: 500px;
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: nowrap;
}
.form {
  /* border: 1px solid blue; */
  flex: 1;
}
</style>
