<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm"  ref="listOfAgentsRef">
      <el-form-item label="团队ID：" prop="group_id">
        <el-input v-model="searchForm.group_id" placeholder="团队ID"></el-input>
      </el-form-item>
      <el-form-item label="团队名称：" prop="group_name">
        <el-input v-model="searchForm.group_name" placeholder="团队名称"></el-input>
      </el-form-item>
      <el-form-item label="代理人ID：" prop="proxy_id">
        <el-input v-model="searchForm.proxy_id" placeholder="代理人ID"></el-input>
      </el-form-item>
      <el-form-item label="代理人昵称：" prop="proxy_name">
        <el-input v-model="searchForm.proxy_name" placeholder="代理人昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="代理人ID" prop="代理人ID"></el-table-column>
      <el-table-column label="代理性别" prop="代理性别">
        <template slot-scope="scope">
          {{ scope.row["代理性别"] == 0 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column label="代理昵称" prop="代理昵称"></el-table-column>
      <el-table-column label="分成比例" prop="分成比例"></el-table-column>
      <el-table-column label="嘉宾数量" prop="嘉宾数量"></el-table-column>
      <el-table-column label="嘉宾昵称" prop="嘉宾昵称"></el-table-column>
      <el-table-column label="是否真人" prop="是否真人">
        <template slot-scope="scope">
          {{ scope.row["是否真人"] == 0 ? "否" : "是" }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-s-tools setting" @click="set(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getListOfAgents, setRecommendRole } from "@/api/guestApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";

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
        proxy_name: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      options: [
        { label: "普通用户", value: "0" },
        { label: "嘉宾A", value: "100" },
        { label: "嘉宾B", value: "101" },
        { label: "嘉宾C", value: "102" },
        { label: "嘉宾D", value: "103" },
        { label: "嘉宾S", value: "130" },
        { label: "超级推荐人", value: "200" },
      ],
      column: [
        { label: "userid", value: "userid" },
        { label: "嘉宾昵称", value: "嘉宾昵称" },
        { label: "嘉宾头像", value: "嘉宾头像" },
        { label: "是否真人", value: "是否真人" },
        { label: "状态", value: "状态" },
        { label: "实名", value: "实名" },
        { label: "是否嘉宾", value: "是否嘉宾" },
        { label: "女用户分级", value: "女用户分级" },
        { label: "showrecommend", value: "showrecommend" },
        { label: "分成", value: "分成" },
        { label: "主页封面", value: "主页封面" },
        { label: "注册时间", value: "注册时间" },
        { label: "推荐人", value: "推荐人" },
      ],
      coverPreview: [],
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    onSubmit() {
      let params = clearEmptyObj(this.searchForm);
      this.getData(params);
    },
    set(user) {
      console.log("user", user);
      this.$prompt("请输入备注", "推荐专区权限", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "请输入备注",
        inputValidator: (value) => {
          if (!value || value.replace(/(^s)(s$)/g, "").length == 0) {
            return false;
          }
        },
      })
        .then(({ value }) => {
          console.log("value", value);
          this.setRole(user, value);
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    async setRole(user, value) {
      try {
        const res = await setRecommendRole({ userid: user.userid, memo: value });
        console.log("setRecommendRole res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改成功！");
        } else {
          this.$message("error", "修改失败，请稍后重试");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "修改失败，请稍后重试");
      }
    },
    async getData(data = {}) {
      try {
        const res = await getListOfAgents(data);
        console.log("getListOfAgents", res);
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
      this.$refs.listOfAgentsRef.resetFields();
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
