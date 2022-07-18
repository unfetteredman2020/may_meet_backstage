<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm" size="mini" ref="listOfAgentsRef">
      <el-form-item label="团队ID：" prop="group_id">
        <el-input v-model="searchForm.group_id" placeholder="团队ID"></el-input>
      </el-form-item>
      <el-form-item label="团队名称：" prop="group_name">
        <el-input v-model="searchForm.group_name" placeholder="团队名称"></el-input>
      </el-form-item>
      <el-form-item label="代理人ID：" prop="proxy_id">
        <el-input v-model="searchForm.proxy_id" placeholder="代理人ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="推荐团队id" prop="推荐团队id"></el-table-column>
      <el-table-column label="推荐团队名称" prop="推荐团队名称"></el-table-column>
      <el-table-column label="推荐人" prop="推荐人"></el-table-column>
      <el-table-column label="包体" prop="包体"></el-table-column>
      <el-table-column label="创建时间" prop="创建时间"></el-table-column>
      <el-table-column label="状态" prop="状态">
        <template slot-scope="scope">
          <el-tag size="mini" :type="isLockAccount(scope.row['状态']) ? 'success' : 'danger'" effect="dark">
            {{ isLockAccount(scope.row["状态"]) ? "正常" : "封禁" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-popconfirm :title="'确认将推荐团队'+scope.row['推荐团队名称']+ '状态更改为失效吗？失效后无法重新启用，请谨慎操作！'" @confirm="changeStatus(scope.row)">
            <i slot="reference" class="el-icon-s-tools setting"></i>
          </el-popconfirm>
        </template>
      </el-table-column>    
    </el-table>
  </div>
</template>

<script>
import { getRecommendList, changeStatus } from "@/api/recommendApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";
import { isTimeOut } from "@/utils/date";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        group_id: null,
        group_name: null,
        proxy_id: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    isLockAccount(userInfo) {
      const { frozen } = userInfo;
      if (userInfo.frozen && frozen.expiretime) {
        return isTimeOut(frozen.expiretime);
      } else {
        return true;
      }
    },
    async changeStatus(item) {
      try {
        console.log('item', item)
        const res = await changeStatus({group_id: item['推荐团队id']})
        if(res && res.errcode == 0) {
          this.$message('success', '修改成功！')
        }else {
          this.$message("error", res.errmsg || "修改失败，请稍后重试！");
        }
      } catch (error) {
        console.log('error', error)
        this.$message("error", error.errmsg || "修改失败，请稍后重试！");
      }
    },
    onSubmit() {
      let params = clearEmptyObj(this.searchForm);
      this.getData(params);
    },
   
    async getData(data = {}) {
      try {
        const res = await getRecommendList(data);
        console.log("getRecommendList", res);
        if (res && res.errcode == 0) {
          this.data = res.data;
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    resetForm() {
      this.$refs.listOfAgentsRef.resetFields();
    },
  },
};
</script>

<style scoped>
.setting {
  /* border: 1px solid red; */
  font-size: 20px;
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
