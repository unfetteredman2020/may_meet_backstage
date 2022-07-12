<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" max-height="700px">
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
        return { data: [], column: [] };
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
