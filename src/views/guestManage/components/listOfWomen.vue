<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm"  ref="womenListRef">
      <el-form-item label="誓聊ID：" prop="userid">
        <el-input v-model="searchForm.userid" placeholder="誓聊ID"></el-input>
      </el-form-item>
      <el-form-item label="是否嘉宾：" prop="guest_flag">
        <el-select v-model="searchForm.guest_flag" placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="不是" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="女用户分级：" prop="level">
        <el-select v-model="searchForm.level" placeholder="请选择">
          <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table @expand-change="expandChange" :data="data" style="width: 100%" max-height="930px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand" style="margin: 0 20px; font-size: 12px">
            <el-form-item label="主页封面:">
              <el-image :preview-src-list="coverPreview" v-for="item in props.row['主页封面']" :key="item.id" style="width: 50px; hfeight: 50px; margin: 0 5px" :src="BASE_CDN_DOMAIN + item.filename"></el-image>
              <span v-if="!props.row['主页封面']">暂无封面图</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="注册时间"></el-table-column>
      <el-table-column label="是否真人" prop="是否真人">
        <template slot-scope="scope">
          {{ scope.row["是否真人"] == 0 ? "否" : "是" }}
        </template>
      </el-table-column>
      <el-table-column label="是否嘉宾" prop="是否嘉宾"></el-table-column>
      <el-table-column label="嘉宾头像" prop="嘉宾头像">
        <template slot-scope="scope">
          <div class="imgBox">
            <el-image style="width: 40px; hfeight: 40px" :src="BASE_CDN_DOMAIN + scope.row['嘉宾头像']" :preview-src-list="[BASE_CDN_DOMAIN + scope.row['嘉宾头像']]"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="状态">
        <template slot-scope="scope">
          <el-tag  :type="isLockAccount(scope.row['状态']) ? 'success' : 'danger'" effect="dark">
            {{ isLockAccount(scope.row["状态"]) ? "正常" : "封禁" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="嘉宾昵称" prop="嘉宾昵称"></el-table-column>

      <el-table-column label="实名" prop="实名"></el-table-column>
      <el-table-column label="女用户分级" prop="女用户分级"></el-table-column>
      <el-table-column label="分成" prop="分成"></el-table-column>
      <el-table-column label="推荐人" prop="推荐人"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-s-tools setting" @click="set(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWomenList, setRecommendRole } from "@/api/guestApi.js";
import { isTimeOut } from "@/utils/date";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        userid: null,
        guest_flag: null,
        level: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      options: [
        // { label: "普通用户", value: "0" },
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
    expandChange(row, a) {
      row["主页封面"] && this.setPreview(row["主页封面"]);
    },
    setPreview(item) {
      console.log("item", item);
      this.coverPreview = item.map((item) => this.BASE_CDN_DOMAIN + item.filename);
    },
    isLockAccount(userInfo) {
      const { frozen } = userInfo;
      if (userInfo.frozen && frozen.expiretime) {
        return isTimeOut(frozen.expiretime);
      } else {
        return true;
      }
    },
    onSubmit() {
      this.getData(clearEmptyObj(this.searchForm));
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
        const res = await getWomenList(data);
        console.log("getWomenList", res);
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
      this.$refs.womenListRef.resetFields();
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
