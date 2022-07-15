<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm" size="mini" ref="violateGuestRef">
      <el-form-item label="用户ID：" prop="guest_id">
        <el-input v-model="searchForm.guest_id" placeholder="嘉宾ID"></el-input>
      </el-form-item>
      <el-form-item label="时间：" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="searchForm.date" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="记录id" prop="记录id"></el-table-column>
      <el-table-column label="用户昵称" prop="用户昵称"></el-table-column>
      <el-table-column label="用户头像" prop="faceimg">
        <template slot-scope="scope">
          <div class="imgBox">
            <el-image style="width: 40px; hfeight: 40px" :src="BASE_CDN_DOMAIN + scope.row['faceimg']" :preview-src-list="[BASE_CDN_DOMAIN + scope.row['faceimg']]"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="处理原因" prop="处理原因">
        <template slot-scope="scope">
          <div>
            {{ scope.row["处理原因"] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="解除时间" prop="解除时间"></el-table-column>
      <el-table-column label="创建时间" prop="创建时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getViolateGuest, setRecommendRole } from "@/api/guestApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        guest_id: null,
        group_id: null,
        date: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit() {
      this.getData(clearEmptyObj(this.searchForm));
    },
    async getData(data = {}) {
      try {
        const { date, ...rs } = data;
        let params = rs || {};
        date && ((params.starttime = date[0]), (params.endtime = date[1]));
        const res = await getViolateGuest(params);
        console.log("getViolateGuest", res);
        if (res && res.errcode == 0) {
          this.data = res.data;
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg ||  "获取数据失败，请稍后重试！");
      }
    },
    resetForm() {
      this.$refs.violateGuestRef.resetFields();
    },
  },
};
</script>

<style scoped>
.setting {
  /* border: 1px solid red; */
  font-size: 25px;
  color: #d1289c;
}
.imgBox {
  /* border: 1px solid blue; */
  height: 40px;
}
.coverImg {
  /* border: 1px solid red; */
}
</style>
