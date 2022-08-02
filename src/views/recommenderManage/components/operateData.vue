<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm" ref="operateRef">
      <el-form-item label="推荐团队：" prop="group_id" :rules="[{ required: true, message: '请选择推荐团队' }]">
        <el-select v-model="searchForm.group_id" placeholder="请选择推荐团队">
          <el-option v-for="item in selectOption" :key="item.value" :label="item.groupname" :value="item.groupid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间：" prop="date" :rules="[{ required: true, message: '请选择时间' }]">
        <el-date-picker value-format="yyyy-MM-dd" :clearable="false" v-model="searchForm.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="850px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="日期" prop="日期"></el-table-column>
      <el-table-column label="推荐团队id" prop="groupid"></el-table-column>
      <el-table-column label="其他收益" prop="其他收益"></el-table-column>
      <el-table-column label="嘉宾收益" prop="嘉宾收益"></el-table-column>
      <el-table-column label="推荐团队" prop="推荐团队"></el-table-column>
      <el-table-column label="推荐团队收益金额" prop="推荐团队收益金额"></el-table-column>
      <el-table-column label="礼物收益" prop="礼物收益"></el-table-column>
      <el-table-column label="私信收益" prop="私信收益"></el-table-column>
      <el-table-column label="音视频收益" prop="音视频收益"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOperateData, setRecommendRole } from "@/api/recommendApi.js";
import { getRecommendTeam } from "@/api/baseInfoApi.js";
import { isTimeOut } from "@/utils/date";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        group_id: null,
        date: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
      selectOption: [],
    };
  },
  computed: {},
  mounted() {
    this.getRecommendTeamList();
  },
  methods: {
    async getRecommendTeamList() {
      try {
        const res = await getRecommendTeam();
        console.log("getRecommendTeam res", res);
        if (res && res.errcode == 0) {
          this.selectOption = res.data;
        } else {
          this.$message("error", res.errmsg || "修改失败，请稍后重试");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "修改失败，请稍后重试");
      }
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
      this.$refs["operateRef"].validate((valid) => {
        if (valid) {
          this.getData(clearEmptyObj(this.searchForm));
        } else {
          return false;
        }
      });
      this.for;
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
          this.$message("error", res.errmsg || "修改失败，请稍后重试");
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
        const res = await getOperateData(params);
        console.log("getOperateData", res);
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
      this.$refs.operateRef.resetFields();
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
