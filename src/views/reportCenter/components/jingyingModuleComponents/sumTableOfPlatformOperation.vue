<template>
  <div class="jingyingshujuzongbiao">
    <Search :text="'平台经营数据总表'"/>
    <SelectTableColumn :tableList="list" :customProps="customProps" />
  </div>
</template>

<script>
import Search from "../commonComponent/searchComponent.vue";
import SelectTableColumn from "../commonComponent/customTable.vue";
import { sumTableOfPlatformOpration } from "@/api/reportApi.js";
import { getDate } from "@/utils/date";
import tableConfig from "../tableConfig/ptjysjzb_table_config.js";
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
        tableName: "platformTableConfig", // tableName： table标识，用来做table的key
        tableConfig //table 每一列数据的key-value对应关系的Object；{key：value}；key指绑定column的英文名称，value指每一列的中文名称，不可为空
      },
    };
  },
  computed: {},
  mounted() {
    this.getTableData();
    console.log("customProps---", this.customProps);
  },
  methods: {
    async getTableData(data) {
      try {
        let params = {
          starttime: getDate("2022-01-02").fullDate,
          endtime: getDate().fullDate,
        };
        const res = await sumTableOfPlatformOpration(data || params);
        console.log(" sumTableOfPlatformOpration res", res);
        if (res && res.errcode == 0) {
          this.list = res.data;
        }else{
          this.$message('error', '获取列表失败，请稍后重试')
        }
      } catch (error) {
        console.log("error", error);
        this.$message('error', '获取列表失败，请稍后重试')
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
