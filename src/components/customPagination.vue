<!--
 * @Author: unfetteredman weixw2014@qq.com
 * @Date: 2022-08-06 14:54:28
 * @LastEditors: unfetteredman weixw2014@qq.com
 * @LastEditTime: 2022-08-06 16:48:07
 * @FilePath: \may_meet_backstage\src\components\customPagination.vue
-->
<template>
  <div class="pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[20, 30, 50, 100, 150]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total"></el-pagination>
    <!-- <el-select @change="handleSizeChange" v-model="pageSize" placeholder="请选择" style="width: 100px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left" :disabled="currentPage<=0" @click="before">上一页</el-button>
      <el-button type="primary" class="el-icon-arrow-right el-icon--right" :disabled="last" @click="next">下一页</el-button>
    </el-button-group> -->
  </div>
</template>

<script>
export default {
  name: "customPagination",
  props: {
    tt: {
      type: Number,
      default: 0,
    },
    // last: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  components: {},
  data() {
    return {
      options: [
        { label: "20条/页", value: 20 },
        { label: "40条/页", value: 40 },
        { label: "60条/页", value: 60 },
      ],
      currentPage: 1,
      pageSize: 30,
    };
  },
  computed: {
    total() {
      console.log("this.tt", this.tt);
      return this.tt;
    },
  },
  mounted() {},
  methods: {
    // next() {
    //   this.currentPage++
    //   this.getData()
    // },
    // before() {
    //   console.log('before')
    //   this.currentPage--
    //   this.getData()
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getData(val, this.currentPage);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getData(this.pageSize, val);
    },
    getData(pageSize, currentPage) {
      this.$parent.setPagination(pageSize, currentPage - 1);
    },
  },
};
</script>

<style scoped>
.pagination {
  /* border: 1px solid red; */
  display: flex;
  padding: 5px 5px;
  /* margin: 2px 0; */
  justify-content: flex-end;
}
</style>
