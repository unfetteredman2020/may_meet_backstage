<template>
  <div class="customSelect">
    <el-dialog width="40%" :show-close="false" :close-on-click-modal="false" custom-class="customDialog" :title="editData['渠道名称'] ? '编辑渠道' : '添加渠道'" :visible.sync="dialogVisible" style="min-width: 1250px">
      <el-form label-position="right" label-width="125px" :rules="rules" :model="searchForm" size="mini" ref="channelListRef">
        <el-form-item label="系统：" prop="os" v-if="!editData['渠道名称']">
          <el-select clearable v-model="searchForm.os" placeholder="请选择系统" size="mini" style="width: 300px">
            <el-option label="苹果" value="2"></el-option>
            <el-option label="安卓" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道名称：" prop="chan_name">
          <el-input v-model="searchForm.chan_name" style="width: 300px" placeholder="请输入渠道名称"></el-input>
        </el-form-item>
        <el-form-item label="投放媒体列表：" prop="media_id">
          <el-select clearable @change="mediaHandleChange" v-model="searchForm.media_id" placeholder="请选择投放媒体" size="mini" style="width: 300px">
            <el-option v-for="item in mediaList" :key="item.mediaid" :label="item.name" :value="item.mediaid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投放公司列表：" prop="corp_id">
          <el-select clearable @change="companyHandleChange" v-model="searchForm.corp_id" placeholder="请选择投放公司" size="mini" style="width: 300px">
            <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.marketagentid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投放账户列表：" prop="acc_id">
          <el-select clearable v-model="searchForm.acc_id" placeholder="请选择投放账户" size="mini" style="width: 300px">
            <el-option v-for="item in companyCountList" :key="item.channelid" :label="item.name" :value="item.acc_id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resetForm('channelListRef')">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirm('channelListRef')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMediaList, getLaunchCompany, getReleaseAccountList } from "@/api/reportApi.js";
import { addChannel, editChannel } from "@/api/channelApi.js";
import { getDate } from "@/utils/date";
import { retry } from "ali-oss/lib/common/utils/retry";

export default {
  props: {
    customConfig: {
      type: Object,
      default: function () {
        return { isShowTransfer: true };
      },
    },
  },
  components: {},
  data() {
    return {
      date: [getDate("2022-01-01").fullDate, getDate().fullDate],
      dialogVisible: false,
      searchForm: {
        chan_name: null,
        os: null,
        media_id: "",
        corp_id: "",
        acc_id: "",
      },
      rules: {
        chan_name: [{ required: true, message: "请输入渠道名称" }],
        os: [{ required: true, message: "请选择系统类型" }],
        media_id: [{ required: true, message: "请选择投放媒体" }],
        corp_id: [{ required: true, message: "请旋选择投放公司" }],
        acc_id: [{ required: true, message: "请选择投放账户" }],
      },
      value: [],
      mediaid: "",
      corpid: "",
      mediaList: [],
      companyList: [],
      companyCountList: [],
      editData: {},
    };
  },
  computed: {},
  mounted() {
    this.getMedia();
    this.getCompany();
  },
  methods: {
    open(item) {
      console.log("open", item);
      this.dialogVisible = true;
      if (item) {
        this.editData = item;
        this.searchForm.media_id = item.media_id;
        this.searchForm.acc_id = item.acc_id;
        this.searchForm.corp_id = item.corp_id;
        this.searchForm.chan_name = item["渠道名称"];
        this.mediaHandleChange(item.media_id);
        this.companyHandleChange(item.media_id, item.corp_id);
      }
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('this.editData', this.editData)
          console.log("first1", Object.keys(this.editData));
          if (Object.keys(this.editData).length) {
            console.log("edit");
            this.editChannels();
          } else {
            this.addChannels();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    mediaHandleChange(value) {
      console.log("value", value);
      console.log("first", this.searchForm.media_id);
      this.getCompany(this.searchForm.media_id);
    },
    companyHandleChange(value) {
      this.getCompanyCount(this.searchForm.mediaid, this.searchForm.corp_id);
    },
    async addChannels() {
      try {
        let params = { ...this.searchForm };
        params.os = params.os * 1;
        const res = await addChannel(params);
        console.log("addChannel res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "添加渠道成功！");
          this.resetForm("channelListRef");
        } else {
          this.$message("error", res.errmsg || "添加渠道失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "添加渠道失败，请稍后重试！");
      }
    },
    async editChannels() {
      try {
        const { os, ...nl } = this.searchForm;
        let params = { ...nl, id: this.editData.id };
        console.log("params", params);
        const res = await editChannel(params);
        console.log("addChannel res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "编辑成功！");
          this.resetForm('channelListRef')
        } else {
          this.$message("error", res.errmsg || "添加渠道失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "添加渠道失败，请稍后重试！");
      }
    },
    async getMedia() {
      try {
        const res = await getMediaList();
        console.log("getMediaList res", res);
        if (res && res.errcode == 0) {
          this.mediaList = res.data || [];
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    async getCompany(id) {
      try {
        const res = await getLaunchCompany({ id });
        if (res && res.errcode == 0) {
          this.companyList = res.data || [];
        }
        console.log("getLaunchCompany", res);
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    async getCompanyCount(mediaid = null, corpid = null) {
      try {
        let obj = { corpid: corpid * 1 };
        mediaid && (obj.mediaid = mediaid * 1);
        console.log("obj", obj);
        const res = await getReleaseAccountList(obj);
        console.log("getReleaseAccountList", res);
        if (res && res.errcode == 0) {
          this.companyCountList = res.data || [];
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    resetForm(formName) {
      this.dialogVisible = false;
      this.editData = {};
      this.$refs[formName].resetFields();
      this.$parent.getData()
    },
  },
};
</script>

<style scoped>
.customSelect {
  margin: 10px 0;
}
.left {
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
}
.left > div {
  margin: 10px 50px 10px 0;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
}

.left > div > span {
  font-weight: 600;
  font-size: 12px;
  display: inline-block;
  /* border: 1px solid blue; */
}
.right {
  text-align: center;
  /* border: 1px solid red; */
}
.times {
  /* border: 1px solid red; */
  font-weight: 600;
  font-size: 12px;
}
</style>
