<template>
  <div class="" style="background-color: #fff; height: 100%">
    <div class="box" style="background-color: #eee">
      <el-form style="background-color: #eee; padding: 15px 0 0" :inline="true" :model="searchForm"  ref="channelListRef">
        <el-form-item label="渠道ID：" prop="chan_id">
          <el-input v-model="searchForm.chan_id" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="渠道名称：" prop="chan_name">
          <el-input v-model="searchForm.chan_name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-select v-model="searchForm.state" placeholder="请选择">
            <el-option label="正常" value="1"></el-option>
            <el-option label="冻结" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm('channelListRef')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button  @click="edit(null)" type="primary" class="el-icon-plus">添加渠道</el-button>
    </div>

    <el-table :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="一级" prop="一级"></el-table-column>
      <el-table-column label="二级" prop="二级"></el-table-column>
      <el-table-column label="三级" prop="三级"></el-table-column>
      <el-table-column label="渠道代码" prop="渠道代码"></el-table-column>
      <el-table-column label="渠道名称" prop="渠道名称"></el-table-column>
      <el-table-column label="状态" prop="enable">
        <template slot-scope="scope">
          <el-tag  :type="scope.row['enable'] == 1 ? 'success' : 'danger'" effect="dark">
            {{ scope.row["enable"] == 1 ? "正常" : "冻结" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <i slot="reference" class="el-icon-edit setting" @click="edit(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <selectMediaAndCompanyAndAccount ref="selectMediaAndCompanyAndAccountRef" />
  </div>
</template>

<script>
import selectMediaAndCompanyAndAccount from "@/views/channelManage/components/commonComponents/selectMediaAndCompanyAndAccount.vue";
import { getChannelList } from "@/api/channelApi.js";
import { getJumpPagePath } from "@/api/baseInfoApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";
import { uploadFiles } from "@/utils/upload.js";
import { getFileType } from "@/utils/fileType.js";

export default {
  props: {},
  components: { selectMediaAndCompanyAndAccount },
  data() {
    return {
      fileList: [],
      data: [],
      publishNewsForm: {
        title: "",
        topage: "",
        expire: "",
        describe: "",
        imageurl: null,
      },
      searchForm: {
        state: null,
        chan_id: null,
        chan_name: null,
      },
      rules: {
        title: [{ required: true, message: "标题不能为空" }],
        topage: [{ required: true, message: "跳转页面不能为空" }],
        expire: [{ required: true, message: "过期天数不能为空" }],
        describe: [{ required: true, message: "描述不能为空" }],
        imageurl: [{ required: true, message: "弹窗图片不能为空" }],
      },
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      coverPreview: [],
      dialogVisible: false,
      selectOptions: [],
    };
  },
  computed: {},
  mounted() {
    this.getData();
    this.getPagePath();
  },
  methods: {
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 10;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return isIMAGE && isLt1M;
    },
    // 上传图片
    UploadImage(param) {
      this.publishNewsForm.imageurl = param.file;
    },
    fileChange(file) {
      console.log("file", file);
      this.$refs.upload.clearFiles(); //清除文件对象
      this.logo = file.raw; // 取出上传文件的对象，在其它地方也可以使用
      this.fileList = [{ name: file.name, url: file.url }]; // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
    clearFiles(e) {
      this.publishNewsForm.imageurl = null;
    },
    async getPagePath() {
      try {
        const res = await getJumpPagePath();
        console.log("getPagePath res", res);
        if (res && res.errcode == 0) {
          this.selectOptions = res.data;
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.creatPopup();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async creatPopup() {
      try {
        const file = this.publishNewsForm.imageurl;
        console.log("file", file);
        const filePath = `productConfig/${file.name}`;
        const imgRes = await uploadFiles(file, filePath);
        console.log("imgRes", imgRes);
        let params = this.publishNewsForm;
        params.imageurl = imgRes.name;
        const res = await createPopup(params);
        console.log("createPopup res", res);
        if (res && res.errcode == 0) {
          this.resetForm("publishNewsFormRef");
          this.getData();
          this.$message("success", "添加成功！");
          this.dialogVisible = false;
        } else {
          this.$message("error", res.errmsg || "发布消息失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "发布消息失败，请稍后重试！");
      }
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    edit(item) {
      console.log("item", item);
      this.$refs.selectMediaAndCompanyAndAccountRef.open(item || '');
    },
    onSubmit() {
      let params = clearEmptyObj(this.searchForm);
      this.getData(params);
    },

    async getData(data = {}) {
      try {
        const res = await getChannelList(data);
        console.log("getChannelList", res);
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
      this.clearFiles();
      this.$refs.upload.clearFiles();
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.setting {
  /* border: 1px solid red; */
  font-size: 20px;
  color: #d1289c;
}
.imgBox {
  /* border: 1px solid blue; */
  height: 40px;
}
.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.customUpload /deep/ .el-upload--picture-card {
  width: 100px !important;
  height: 100px !important;
  line-height: 100px;
}
.customUpload /deep/.el-upload-list--picture-card .el-upload-list__item-action {
  width: 100px !important;
  height: 100px !important;
}
.customUpload /deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 100px !important;
  height: 100px !important;
}
</style>
