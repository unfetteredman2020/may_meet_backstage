<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm" size="mini" ref="operateRelationsshipRef">
      <el-form-item label="推荐人ID：" prop="inviteid">
        <el-input v-model="searchForm.inviteid" placeholder="请输入运营ID"></el-input>
      </el-form-item>
      <el-form-item label="运营ID：" prop="serviceid">
        <el-select v-model="searchForm.serviceid" placeholder="请选择推荐人ID">
          <el-option v-for="item in selectOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%" max-height="800px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="公会ID" prop="公会id"></el-table-column>
      <el-table-column label="公会名称" prop="公会名称"></el-table-column>
      <el-table-column label="商务ID" prop="商务id"></el-table-column>
      <el-table-column label="商务昵称" prop="商务昵称"></el-table-column>
      <el-table-column label="推荐人ID" prop="推荐人id"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOperateRelationship, setRecommendRole } from "@/api/recommendApi.js";
import { getOperatingList } from "@/api/baseInfoApi.js";
import { isTimeOut } from "@/utils/date";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        inviteid: null,
        serviceid: null,
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
        const res = await getOperatingList();
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
      this.$refs["operateRelationsshipRef"].validate((valid) => {
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
        const res = await getOperateRelationship(params);
        console.log("getOperateRelationship", res);
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
      this.$refs.operateRelationsshipRef.resetFields();
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
