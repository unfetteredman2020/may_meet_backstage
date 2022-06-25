<template>
  <div class="jingyingshujuzongbiao">
    <Search />
    <SelectTableColumn :tableList="list" :customProps="customProps" />
  </div>
</template>

<script>
import Search from "../commonComponent/searchComponent.vue";
import SelectTableColumn from "../commonComponent/customTable.vue";
import { firstPayUser } from "@/api/reportApi.js";
import { getDate } from "@/utils/date";
import tableConfig from "../tableConfig/scffyhlc_table_config";
let customLoading = null;
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
        tableName: "firstPayUserTableConfig", // tableName： table标识，用来做table的key
        tableConfig, //table 每一列数据的key-value对应关系的Object；{key：value}；key指绑定column的英文名称，value指每一列的中文名称，不可为空
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
        const res = await firstPayUser(data || params);
        console.log("firstPayUser res", res);
        if (res && res.errcode == 0) {
          customLoading = this.$loading({
            lock: true,
            text: "加载1123",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          this.formatColum(res.data);
        }else {
          this.$message('error', '获取列表失败，请稍后重试')
        }
      } catch (error) {
        console.log("error", error);
        this.$message('error', '获取列表失败，请稍后重试')
      }
    },
    formatColum(data) {
      new Promise((resolve, reject) => {
        let column = [...data];
        for (let index = 0; index < 1050; index++) {
          column = [].concat(column, data);
        }
        column.forEach((item) => {
          const { shou_ci_fu_fei_ren_shu, date, ...days } = item;
          let values = this.sum(Object.values(days));
          item.zong_liu_cun_lv = values;
        });
        resolve(column);
      }).then((res) => {
        // console.log("res---", res);
        customLoading.close();
        this.list = res;
      });
    },
    sum(arr) {
      return eval(arr.join("+"));
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
