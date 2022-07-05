
<template>
  <div class="jingyingshujuzongbiao">
    <Search :text="'每日活跃用户统计'" />
    <SelectTableColumn :tableList="list" :customProps="customProps" />
  </div>
</template>

<script>
import Search from "../commonComponent/searchComponent.vue";
import SelectTableColumn from "../commonComponent/customTable.vue";
import { dayActiveUser } from "@/api/reportApi.js";
import { getDate } from "@/utils/date";
import tableConfig from "../tableConfig/mrhyyhtj_table_config.js"; // 公用头条 安卓新增付费用户table 配置

export default {
  props: {},
  components: {
    Search: Search,
    SelectTableColumn: SelectTableColumn,
  },
  data() {
    return {
      list: [],
      customProps: {
        tableName: "dayActiveUserTableConfig", // tableName： table标识，用来做table的key
        tableConfig, //table 每一列数据的key-value对应关系的Object；{key：value}；key指绑定column的英文名称，value指每一列的中文名称，不可为空
      },
    };
  },
  computed: {},
  mounted() {
    this.getTableData();
  },
  methods: {
    async getTableData(data) {
      try {
        let params = {
          starttime: getDate("2022-01-02").fullDate,
          endtime: getDate().fullDate,
        };
        const res = await dayActiveUser(data || params);
        console.log("dayActiveUser res", res);
        if (res && res.errcode == 0) {
          this.list = res.data;
        } else {
          this.$message("error", "获取列表失败，请稍后重试");
        }
      } catch (error) {
        this.$message("error", "获取列表失败，请稍后重试");
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
</style>
