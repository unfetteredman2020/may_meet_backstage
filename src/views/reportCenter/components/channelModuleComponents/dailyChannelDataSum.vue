<template>
  <div>
    <customSelect />
    <customTable  :tableList="list" :customProps="customProps" />
  </div>
</template>

<script>
import customSelect from "../commonComponent/customSelectDialog.vue";
import customTable from '../commonComponent/customTable.vue'
import tableConfig from "../tableConfig/mrqdsjzb_table_config.js"; // 公用头条 安卓新增付费用户table 配置
import { dailyChannelDataSum, getMediaList, getLaunchCompany } from '@/api/reportApi.js'
import { getDate } from "@/utils/date";

export default {
  props: {},
  components: {
    customSelect,
    customTable
  },
  data() {
    return {
      list: [],
      customProps: {
        tableName: "dailyChannelDataSumTableConfig", // tableName： table标识，用来做table的key
        tableConfig, //table 每一列数据的key-value对应关系的Object；{key：value}；key指绑定column的英文名称，value指每一列的中文名称，不可为空
      },
    };
  },
  computed: {},
  mounted() {
    this.getData({starttime:getDate('2022-01-01').fullDate, endtime: getDate().fullDate})
  },
  methods: {
    async getData(time, obj={}) {
      try {
        const companyRes = await getLaunchCompany()
        const mediaRes = await getMediaList();
        time['filter'] = JSON.stringify(obj)
        const res = await dailyChannelDataSum(time)
        console.log('dailyChannelDataSum', res)
        if(res && res.errcode == 0 && companyRes &&companyRes.errcode == 0) {
          let arr = res.data;
          arr.forEach((item) => {
            let medianame = mediaRes.data.filter(i=> i.mediaid == item.media_id)[0].name
            let corpname = companyRes.data.filter((i) => i.marketagentid == item.corp_id)[0].name;
            item.corp_id = corpname || item.corp_id
            item.media_id = medianame || item.media_id
          });
          this.list = arr
        }else {
          this.$message('error', '获取数据失败，请稍后重试！')
        }
      } catch (error) {
        console.log('error', error)
        this.$message('error', '获取数据失败，请稍后重试！')
      }
    },
  },
};
</script>

<style scoped></style>
