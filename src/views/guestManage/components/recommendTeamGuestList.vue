<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm" size="mini" ref="recommendTeamGuestListRef">
      <el-form-item label="嘉宾ID：" prop="guest_id">
        <el-input v-model="searchForm.guest_id" placeholder="嘉宾ID"></el-input>
      </el-form-item>
      <el-form-item label="推荐团队ID：" prop="group_id">
        <el-input v-model="searchForm.group_id" placeholder="嘉宾ID"></el-input>
      </el-form-item>
      <el-form-item label="时间：" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="searchForm.date" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table @expand-change="expandChange" :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="创建时间" prop="创建时间"></el-table-column>
      <el-table-column label="代理人" prop="代理人"></el-table-column>
      <el-table-column label="代理分成" prop="代理分成"></el-table-column>
      <el-table-column label="嘉宾头像" prop="faceimg">
        <template slot-scope="scope">
          <div class="imgBox">
            <el-image style="width: 40px; hfeight: 40px" :src="BASE_CDN_DOMAIN + scope.row['faceimg']" :preview-src-list="[BASE_CDN_DOMAIN + scope.row['faceimg']]"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否真人" prop="是否真人">
        <template slot-scope="scope">
          <span>{{ scope.row["是否真人"] == 0 ? "否" : "是" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="嘉宾昵称" prop="嘉宾昵称"></el-table-column>

      <el-table-column label="所属推荐团队" prop="所属推荐团队"></el-table-column>
      <el-table-column label="语音签名是否通过" prop="语音签名是否通过">
        <template slot-scope="scope">
          <span>{{ scope.row["语音签名是否通过"] == 0 ? "否" : "是" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="嘉宾ID" prop="嘉宾ID"></el-table-column>
      <el-table-column label="嘉宾分成" prop="嘉宾分成"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-s-tools setting" @click="set(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRecommendTeamGuestList, setRecommendRole } from "@/api/guestApi.js";
import { isTimeOut } from "@/utils/date";
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
        const { date, ...rs } = data;
        let params = rs || {};
        date && ((params.starttime = date[0]), (params.endtime = date[1]));
        const res = await getRecommendTeamGuestList(params);
        console.log("getRecommendTeamGuestList", res);
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
      this.$refs.recommendTeamGuestListRef.resetFields();
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
