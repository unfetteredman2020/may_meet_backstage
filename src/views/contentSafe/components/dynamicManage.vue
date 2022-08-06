<template>
  <div class="" style="background-color: #fff; height: 100%">
    <el-form style="background-color: #eee; padding: 10px 0 0" :rules="rules" :inline="true" :model="searchForm" ref="voiceSignatureSearchFormRef">
      <el-form-item label="誓聊ID：" prop="userid">
        <el-input v-model="searchForm.userid" placeholder="团队ID" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select clearable v-model="searchForm.status" placeholder="请选择追回状态" style="width: 150px">
          <el-option label="一审失败" value="102"></el-option>
          <el-option label="二审通过" value="201"></el-option>
          <el-option label="二审失败" value="202"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间：" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" style="width: 290px" :clearable="false" v-model="searchForm.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('voiceSignatureSearchFormRef')">查询</el-button>
        <el-button @click="resetForm('voiceSignatureSearchFormRef')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" fit max-height="850px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important', wordWrap: 'none;' }" stripe :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px', wordWrap: 'none' }">
      <el-table-column label="昵称" prop="nickname" width="180"></el-table-column>
      <el-table-column label="誓聊ID" prop="userid" width="90"></el-table-column>
      <el-table-column label="性别" prop="sex" width="60">
        <template slot-scope="scope">
          {{ scope.row["sex"] == 0 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" width="100">
        <template slot-scope="scope">
          {{ auditStatus[scope.row["state"]] || "暂无状态" }}
        </template>
      </el-table-column>
      <el-table-column label="头像" prop="头像">
        <template slot-scope="scope">
          <div class="imgBox">
            <el-image @click="setPreview(scope.row.image, index)" v-for="(item, index) in scope.row.image" :key="index" :preview-src-list="previewList" style="width: 40px; height: 40px; margin: 0 5px 0 0" :src="`${BASE_CDN_DOMAIN + item}`" fit="fill"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="inserttime" width="150"></el-table-column>
      <el-table-column label="内容简介" prop="text"></el-table-column>
      <el-table-column label="原因" prop="reason"></el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <i slot="reference" class="el-icon-s-tools setting" @click="edit(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="动态审核" class="dialogs" :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false">
      <el-form :model="settingForm" label-position="right" label-width="100px" :rules="rules" ref="voiceSignatureChangeRef">
        <el-form-item label="审核结果：" prop="result">
          <el-select v-model="settingForm.result" placeholder="请选择">
            <el-option label="通过" value="PASS"></el-option>
            <el-option label="拒绝" value="REJECT"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原因：" prop="reason">
          <el-input type="textarea" v-model="settingForm.reason" placeholder="失败原因" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('voiceSignatureChangeRef')">取 消</el-button>
        <el-button type="primary" @click="submitForm('voiceSignatureChangeRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDynamicManageList, changeDynamicManageHandle } from "@/api/safeApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      previewList: [],
      searchForm: {
        userid: null,
        date: ["2022-01-01", "2023-01-01"],
        status: null,
      },
      voiceurl: null,
      settingForm: {
        userid: null,
        eventid: null,
        recid: null,
        examine_id: null,
        reason: null,
        result: null,
      },
      rules: {
        reason: [{ required: true, message: "请输入原因" }],
        date: [{ required: true, message: "请选择时间" }],
        memo: [{ required: true, message: "请输入备注" }],
        result: [{ required: true, message: "请选择结果" }],
      },
      dialogFormVisible: false,
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,

      violationType: [
        { label: "骗取礼物", value: "0" },
        { label: "涉黄信息", value: "1" },
        { label: "广告骚扰", value: "2" },
        { label: "违法信息", value: "3" },
        { label: "人身攻击", value: "4" },
        { label: "其他违规", value: "5" },
      ],
      auditStatus: {
        102: "一审失败",
        103: "一审失败",
        201: "二审通过",
        202: "二审失败",
      },
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case "voiceSignatureSearchFormRef":
              this.onChange();
              break;
            case "voiceSignatureChangeRef":
              this.changeStatus();
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setPreview(image, index) {
      let origin = image;
      let before = origin.slice(index);
      let after = origin.slice(0, index);
      let newArr = new Array().concat(before, after);
      let a = [];
      newArr.forEach((item) => a.push(`${this.BASE_CDN_DOMAIN + item}`));
      this.previewList = a;
    },
    edit(item) {
      console.log("item", item);
      this.voiceurl = item.voiceurl;
      (this.settingForm = {
        userid: item.userid,
        eventid: item.eventid,
        recid: item.rec_id,
        examine_id: item.examine_id,
        reason: item.reason,
        result: null,
      }),
        (this.dialogFormVisible = true);
    },
    async changeStatus() {
      try {
        let params = { ...this.settingForm };
        console.log("this.settingForm", params);
        const res = await changeDynamicManageHandle(params);
        console.log("changeDynamicManageHandle res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改成功！");
          this.resetForm("voiceSignatureChangeRef");
        } else {
          this.$message("error", res.errmsg || "修改失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "修改失败，请稍后重试！");
      }
    },
    onChange() {
      let params = clearEmptyObj(this.searchForm);
      const { date, ...res } = params;
      let data = res;
      date && ((data.starttime = date[0]), (data.endtime = date[1]));
      this.getData(data);
    },

    async getData(data = {}) {
      try {
        const res = await getDynamicManageList(data);
        console.log("getDynamicManageList", res);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
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
  display: flex;
  /* word-wrap: none; */
}
.title {
  box-sizing: border-box;
  font-weight: 700;
  padding: 0 0 0 12px;
  height: 35px;
  line-height: 35px;
  background-color: #e2e3e4;
  margin: 10px 0;
  font-size: 14px;
}
.dialogTitle {
  /* margin: 20px 0 20px 20px; */
  border: 1px solid red;
  /* margin: 20px 0 10px 20px; */
}
.dialogs /deep/ .el-dialog > .el-dialog__body {
  padding: 0 0 !important;
}
.customAudio {
  /* width: 200px; */
  height: 30px;
  vertical-align: middle;
}
.voice {
  margin: 10px 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
}
</style>
