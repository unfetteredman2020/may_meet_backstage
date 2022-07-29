<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :inline="true" :model="searchForm" ref="reportManageSearchFormRef">
      <el-form-item label="举报用户ID：" prop="userid">
        <el-input v-model="searchForm.userid" placeholder="团队ID" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="违规类型：" prop="type">
        <el-select clearable v-model="searchForm.type" placeholder="请选择违规类型" style="width: 150px">
          <el-option v-for="item in violationType" :key="item.label" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投诉状态：" prop="status">
        <el-select clearable v-model="searchForm.status" placeholder="请选择投诉状态" style="width: 150px">
          <el-option v-for="item in reportStatus" :key="reportStatus[item]" :label="reportStatus[item]" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="追回状态：" prop="back_status">
        <el-select clearable v-model="searchForm.back_status" placeholder="请选择追回状态" style="width: 150px">
          <el-option v-for="item in recoverStatus" :key="recoverStatus[item]" :label="recoverStatus[item]" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" style="width: 290px" :clearable="false" v-model="searchForm.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" fit max-height="810px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important', wordWrap: 'none;' }" stripe :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px', wordWrap: 'none' }">
      <el-table-column v-for="item in column" :key="item.label" :label="item.label" :prop="item.value"></el-table-column>
      <el-table-column label="举报时间" prop="inserttime" width="90"></el-table-column>
      <el-table-column label="举报状态" prop="state" width="90">
        <template slot-scope="scope">
          {{ reportStatus[scope.row["state"]] }}
        </template>
      </el-table-column>
      <el-table-column label="追回的类型" prop="zh_type">
        <template slot-scope="scope">
          {{ scope.row["zh_type"] == 1 ? "金币" : "现金" }}
        </template>
      </el-table-column>
      <el-table-column label="实际追回充值金币" prop="zh_gold"></el-table-column>
      <el-table-column label="待追货赠送金币总额" prop="zh_gift_freegold"></el-table-column>
      <el-table-column label="嘉宾返利追回数量" prop="zh_rebate"></el-table-column>
      <el-table-column label="被投诉者的超推" prop="invite_userid"></el-table-column>
      <el-table-column label="超推的返利追回数量" prop="zh_invite_rebate"></el-table-column>
      <el-table-column label="客户端确认时间" prop="zh_inserttime" width="140"></el-table-column>
      <el-table-column label="状态更新时间" prop="updatetime" width="140"></el-table-column>
      <el-table-column label="追回状态" prop="zh_state">
        <template slot-scope="scope">
          {{ recoverStatus[scope.row["zh_state"]] }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-popconfirm :title="'确认将推荐团队' + scope.row['推荐团队名称'] + '状态更改为失效吗？失效后无法重新启用，请谨慎操作！'" @confirm="changeStatus(scope.row)">
            <i slot="reference" class="el-icon-s-tools setting"></i>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getReportManageList, changeStatus } from "@/api/safeApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      searchForm: {
        userid: null,
        date: null,
        type: null,
        status: null,
        back_status: null,
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
      column: [
        { label: "记录ID", value: "id" },
        { label: "投诉者id", value: "userid" },
        { label: "投诉者昵称", value: "nickname" },
        { label: "被投诉者昵称", value: "dst_userid" },
        { label: "投诉类型", value: "label" },
        { label: "投诉内容文本", value: "context" },
        { label: "动态id", value: "postid" },
        { label: "投诉者联系电话", value: "phone" },
        { label: "处理结果", value: "handle_result" },
      ],
      violationType: [
        { label: "骗取礼物", value: "0" },
        { label: "涉黄信息", value: "1" },
        { label: "广告骚扰", value: "2" },
        { label: "违法信息", value: "3" },
        { label: "人身攻击", value: "4" },
        { label: "其他违规", value: "5" },
      ],
      reportStatus: {
        0: "等待处理",
        1: "处理中",
        2: "礼物追回中",
        3: "礼物追回超时",
        4: "用户取消",
        5: "处理完成",
        6: "无效举报",
      },
      recoverStatus: {
        0: "待处理",
        1: "待确认数量",
        2: "不满意",
        3: "已确认数量",
        4: "打款中",
        5: "打款成功",
        6: "取消追回",
      },
    };
  },
  computed: {
    height() {
      return `${window.screen.height - 130}px`;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSelectChange(value) {
      console.log("handleSelectChange", value);
    },
    async changeStatus(item) {
      try {
        console.log("item", item);
        const res = await changeStatus({ group_id: item["推荐团队id"] });
        if (res && res.errcode == 0) {
          this.$message("success", "修改成功！");
        } else {
          this.$message("error", res.errmsg || "修改失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "修改失败，请稍后重试！");
      }
    },
    onSubmit() {
      let params = clearEmptyObj(this.searchForm);
      const { date, ...res } = params;
      let data = res;
      date && ((data.starttime = date[0]), (data.endtime = date[1]));
      this.getData(data);
    },

    async getData(data = {}) {
      try {
        const res = await getReportManageList(data);
        console.log("getReportManageList", res);
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
      this.$refs.reportManageSearchFormRef.resetFields();
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
  /* word-wrap: none; */
}
</style>
