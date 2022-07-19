<template>
  <div class="" style="background-color: #fff; height: 100%">
    <div class="box" style="background-color: #eee">
      <el-form style="background-color: #eee; padding: 15px 0 0" :inline="true" :model="searchForm" size="mini" ref="systemInfoRef">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="searchForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm('systemInfoRef')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button class="el-icon-plus" type="primary" size="mini" @click="dialogVisible = true">发布消息</el-button>
    </div>

    <el-table :data="data" style="width: 100%" max-height="750px" border :header-cell-style="{ height: '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px', height: '20px' }">
      <el-table-column label="记录id" prop="记录id" width="70"></el-table-column>
      <el-table-column label="消息类型" prop="消息类型" width="100">
        <template slot-scope="scope">
          {{ scope.row["消息类型"] == 1 ? "系统消息" : "未知消息" }}
        </template>
      </el-table-column>
      <el-table-column label="发送者" prop="发送者" width="70"></el-table-column>
      <el-table-column label="接受者" prop="接受者" width="70"></el-table-column>
      <el-table-column label="标题" prop="标题"></el-table-column>
      <el-table-column label="内容" prop="内容"></el-table-column>
      <el-table-column label="跳转页面" prop="跳转页面"></el-table-column>
      <el-table-column label="发送时间" prop="发送时间"></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-popconfirm :title="'暂无功能'" @confirm="changeStatus(scope.row)">
            <i slot="reference" class="el-icon-s-tools setting"></i>
          </el-popconfirm>
        </template>
      </el-table-column> -->
    </el-table>

    <el-dialog title="发布消息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="publishNewsForm" :rules="rules" ref="publishNewsFormRef" label-width="100px" class="demo-ruleForm" size="mini">
        <el-form-item label="标题:" prop="title">
          <el-input v-model.number="publishNewsForm.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="跳转页面:" prop="topage">
          <el-select v-model="publishNewsForm.topage" placeholder="请选择跳转页面">
            <el-option v-for="item in selectOptions" :key="item.topageid" :label="item.describe" :value="item.topageid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户id数组:" prop="dst_userid">
          <el-input class="warm" v-model="publishNewsForm.dst_userid" placeholder="如需输入多个id，请用英文&符号隔开"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <el-input type="textarea" v-model="publishNewsForm.content" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resetForm('publishNewsFormRef')">重置</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm('publishNewsFormRef')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSystemInfo, publicMsg } from "@/api/productApi.js";
import { getJumpPagePath } from "@/api/baseInfoApi.js";
import { clearEmptyObj } from "@/utils/formatData.js";
import { isTimeOut } from "@/utils/date";

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      publishNewsForm: {
        title: "",
        topage: "",
        dst_userid: "",
        content: "",
      },
      searchForm: {
        title: null,
      },
      rules: {
        title: [{ required: true, message: "标题不能为空" }],
        topage: [{ required: true, message: "跳转页面不能为空" }],
        dst_userid: [{ required: true, message: "用户ID不能为空" }],
        content: [{ required: true, message: "内容不能为空" }],
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
          console.log("publishNewsForm.", this.publishNewsForm);
          let params = this.publishNewsForm;
          params.dst_userid = params.dst_userid.split("&");
          console.log("params", params);
          this.publicMsgs(params);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async publicMsgs(data) {
      try {
        const res = await publicMsg(data);
        if (res && res.errcode == 0) {
          this.selectOptions = res.data;
          this.$message("success", "发布成功！");
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
        const res = await getSystemInfo(data);
        console.log("getSystemInfo", res);
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

.warm /deep/.el-input__inner {
  &::placeholder {
    color: rgb(230, 110, 110);
    // font-size: 12px;
  }
}
// 不同浏览器样式兼容
.warm .el-input input::-webkit-input-placeholder {
  color: #aeabab;
}
.warm .el-input input::-moz-input-placeholder {
  color: #aeabab;
}
.warm .el-input input::-ms-input-placeholder {
  color: #aeabab;
}
.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
