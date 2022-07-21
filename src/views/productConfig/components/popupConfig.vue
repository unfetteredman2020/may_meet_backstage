<template>
  <div class="" style="background-color: #fff; height: 100%">
    <div class="box" style="background-color: #eee">
      <el-form style="background-color: #eee; padding: 15px 0 0" :inline="true" :model="searchForm"  ref="popupConfigSearchRef">
        <el-form-item label="消息标题：" prop="title">
          <el-input v-model="searchForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm('popupConfigSearchRef')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button class="el-icon-plus" type="primary"  @click="dialogVisible = true">新建弹窗</el-button>
    </div>

    <el-table :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="ID" prop="id" width="70"></el-table-column>
      <el-table-column label="标题" prop="标题"></el-table-column>
      <el-table-column label="跳转页面" prop="topage"></el-table-column>
      <el-table-column label="生效时间" prop="生效时间" width="100"></el-table-column>
      <el-table-column label="失效时间" prop="失效时间" width="100"></el-table-column>
      <el-table-column label="弹窗图片" prop="imageurl" width="100">
        <template slot-scope="scope">
          <div class="imgBox">
            <el-image style="width: 40px; height: 40px"  :src="BASE_CDN_DOMAIN + scope.row['imageurl']" :preview-src-list="[BASE_CDN_DOMAIN + scope.row['imageurl']]"></el-image>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-popconfirm :title="'暂无功能'" @confirm="changeStatus(scope.row)">
            <i slot="reference" class="el-icon-s-tools setting"></i>
          </el-popconfirm>
        </template>
      </el-table-column> -->
    </el-table>

    <el-dialog title="新建弹窗" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="publishNewsForm" :rules="rules" ref="publishNewsFormRef" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="标题:" prop="title">
          <el-input v-model.number="publishNewsForm.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="跳转页面:" prop="topage">
          <el-select v-model="publishNewsForm.topage" placeholder="请选择跳转页面">
            <el-option v-for="item in selectOptions" :key="item.topageid" :label="item.describe" :value="item.topageid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过期天数:" prop="expire">
          <el-input type="number" v-model.number="publishNewsForm.expire" placeholder="请输入过期天数"></el-input>
        </el-form-item>
        <el-form-item label="弹窗图片:" prop="imageurl">
          <el-upload :before-remove="clearFiles" class="avatar-uploader customUpload" ref="upload" action="string" accept="image/jpeg,image/png,image/jpg" list-type="picture-card" :before-upload="onBeforeUploadImage" :http-request="UploadImage" :on-change="fileChange" :file-list="fileList">
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过10M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述:" prop="describe">
          <el-input type="textarea" v-model="publishNewsForm.describe" placeholder="请输入描述，最多可输入256个字符"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="resetForm('publishNewsFormRef')">重置</el-button>
        <el-button  @click="dialogVisible = false">取 消</el-button>
        <el-button  type="primary" @click="submitForm('publishNewsFormRef')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPopupConfig, createPopup } from "@/api/productApi.js";
import { getJumpPagePath } from "@/api/baseInfoApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";
import { uploadFiles } from "@/utils/upload.js";
import { getFileType } from '@/utils/fileType.js'

export default {
  props: {},
  components: {},
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
        title: null,
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
        console.log('file', file)
        const filePath = `productConfig/${file.name}`;
        const imgRes = await uploadFiles(file, filePath);
        console.log('imgRes', imgRes)
        let params = this.publishNewsForm;
        params.imageurl = imgRes.name;
        const res = await createPopup(params);
        console.log('createPopup res', res)
        if (res && res.errcode == 0) {
          this.resetForm('publishNewsFormRef')
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
    async changeStatus(item) {
      try {
        console.log("item", item);
        // const res = await changeStatus({ group_id: item["推荐团队id"] });
        // if (res && res.errcode == 0) {
        //   this.$message("success", "修改成功！");
        // } else {
        //   this.$message("error", res.errmsg || "修改失败，请稍后重试！");
        // }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "修改失败，请稍后重试！");
      }
    },
    onSubmit() {
      let params = clearEmptyObj(this.searchForm);
      this.getData(params);
    },

    async getData(data = {}) {
      try {
        const res = await getPopupConfig(data);
        console.log("getPopupConfig", res);
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
      this.clearFiles()
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
