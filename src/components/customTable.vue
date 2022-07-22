<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" :max-height="tableConfig.maxHeight" border :header-cell-style="{background: '#f2f3f4',border:'1px solid #fff', height: '35px', 'line-height': '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px' }">
      <el-table-column v-for="item in tableConfig.column" :prop="item.value" :label="item.label" :key="item.value"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableConfig: {
      type: Object,
      default: function () {
        return { data: [], column: [], maxHeight: '750px' };
      },
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    list() {
      return this.tableConfig.data
    }
  },
  mounted() {
    
  },
  methods: {},
};
</script>

<style scoped></style>
