<template>
  <div>
    <el-dialog title="封禁账号" :visible.sync="visible" width="50%">
      <el-form :model="lockAccountForm" :rules="lockAccountRules" ref="lockAccountForm" label-width="140px" class="demo-lockAccountForm">
        <el-form-item label="封禁时间" prop="days">
          <el-select v-model="lockAccountForm.days" placeholder="请选择活封禁时间">
            <el-option label="一天" value="1"></el-option>
            <el-option label="三天" value="3"></el-option>
            <el-option label="七天" value="7"></el-option>
            <el-option label="永久" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="违规场景" prop="scene">
          <el-select v-model="lockAccountForm.scene" placeholder="请选择违规场景">
            <el-option label="私信" value="0"></el-option>
            <el-option label="动态" value="1"></el-option>
            <el-option label="家族" value="2"></el-option>
            <el-option label="音视频通话" value="3"></el-option>
            <el-option label="个人资料" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="违反平台规范X类" prop="reason">
          <el-select v-model="lockAccountForm.reason" placeholder="请选违反平台规范X类">
            <el-option v-for="(item, index) in violationCategory" :key="index" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="违反平台规范X条" prop="sub_reason">
          <el-select v-model="lockAccountForm.sub_reason" placeholder="请选违反平台规范X条">
            <el-option v-for="(item, index) in violationCategory[lockAccountForm.reason * 1].children" :key="index" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封禁图片" prop="image_url">
          <el-upload class="avatar-uploader customUpload" ref="upload" action="string" accept="image/jpeg,image/png,image/jpg" list-type="picture-card" :before-upload="onBeforeUploadImage" :http-request="UploadImage" :on-change="fileChange" :file-list="fileList">
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过10M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('lockAccountForm')" size="mini">取消</el-button>
        <el-button type="primary" @click="submitForm('lockAccountForm')" size="mini">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFiles } from "@/utils/upload.js";
import { lockAccount, lockDevice } from "@/api/userApi.js";

export default {
  props: {
    lockVisible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    }, // 'account' or 'device'
    userInfo: {
      type: Object,
      default: {},
    },
  },
  components: {},
  data() {
    return {
      newUserInfo: {},
      fileList: [],
      lockAccountForm: {
        days: "",
        scene: "",
        reason: "",
        sub_reason: "",
        image_url: [],
      },
      violationCategory: [
        {
          text: "传播淫秽色情内容",
          value: "0",
          children: [
            {
              text: "在平台以不正当目的公布私人联系方式（微信、QQ、手机号、抖音、微博等）传播淫秽色情内容",
              value: "0",
            },
            {
              text: "上传违规昵称、违规头像和封面图",
              value: "1",
            },
            {
              text: "发布色情招嫖文字、提供色情服务的内容",
              value: "2",
            },
            {
              text: "发布软色情及性暗示言论",
              value: "3",
            },
            {
              text: "带有娇喘、性暗示的语音及行为",
              value: "4",
            },
          ],
        },
        {
          text: "存在骗取钱财、信息为目的的欺诈性社交行为",
          value: "1",
          children: [
            {
              text: "以提供联系方式为理由诱导用户消费",
              value: "0",
            },
            {
              text: "冒充自己或谎称朋友是平台工作人员，造成不良影响的行为",
              value: "1",
            },
            {
              text: "以线下见面为由引导用户消费，未履行承诺",
              value: "2",
            },
            {
              text: "使用虚假信息和承诺诱骗对方消费",
              value: "3",
            },
          ],
        },
        {
          text: "宣传、售卖为导向的广告行为",
          value: "2",
          children: [
            {
              text: "发布广告信息相关信息，如：赚钱的找我、消费返现、加我有福利、进群有福利等",
              value: "0",
            },
            {
              text: "发布会员招募、人员招聘、兼职等内容",
              value: "1",
            },
            {
              text: "向其他平台引流的广告内容，如加微信、加QQ、关注公众号、看直播等内容",
              value: "2",
            },
          ],
        },
        {
          text: "存在不良社交行为",
          value: "3",
          children: [
            {
              text: "视频聊天不露脸、语音不出声",
              value: "0",
            },
            {
              text: "恶意举报他人等行为",
              value: "1",
            },
            {
              text: "恶意辱骂他人、发布低俗言论",
              value: "2",
            },
            {
              text: "威胁、污蔑、诽谤、曝光他人隐私、使用他人信息进行攻击的行为",
              value: "3",
            },
            {
              text: "恶意扰乱平台秩序，影响平台环境",
              value: "4",
            },
          ],
        },
        {
          text: "违反国家现行法律法规、侵害就聊合法权益",
          value: "4",
          children: [
            {
              text: "发表反党反政府的言论或作出侮辱诋毁党和国家的行为，及任何违反法律的行为",
              value: "0",
            },
            {
              text: "发布、使用、恶搞就聊已有知识产权内容相同/相似的字样，或容易与就聊产品设计主题、外观等相混淆的内容",
              value: "1",
            },
            {
              text: "批量发布买卖就聊账号的内容，使用外观或其他恶意对就聊政策运营造成影响的行为",
              value: "2",
            },
          ],
        },
      ],
      lockAccountRules: {
        days: [{ required: true, message: "请选择封禁时间", trigger: "blur" }],
        scene: [{ required: true, message: "请选择违规场景", trigger: "blur" }],
        reason: [{ required: true, message: "请选择违反平台规范x类", trigger: "blur" }],
        sub_reason: [{ required: true, message: "请选择违反平台规范X条", trigger: "blur" }],
        image_url: [{ required: true, message: "请选择封禁图片", trigger: "blur" }],
      },
    };
  },
  computed: {
    visible: {
      get() {
        return this.lockVisible;
      },
      set(value) {
        this.$parent.closeDialog();
      },
    },
  },
  mounted() {
    console.log("this.props", this.userInfo);
  },
  watch: {
    userInfo(newValue, oldValue) {
      console.log("newValue", newValue);
      this.newUserInfo = newValue;
    },
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
      this.lockAccountForm.image_url = param.file;
    },
    fileChange(file) {
      this.$refs.upload.clearFiles(); //清除文件对象
      this.logo = file.raw; // 取出上传文件的对象，在其它地方也可以使用
      this.fileList = [{ name: file.name, url: file.url }]; // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
    async submit() {
      try {
        const file = this.lockAccountForm.image_url;
        const filePath = `${this.userInfo.userid}/lockAccountImage/${file.name}`;
        const imgRes = await uploadFiles(file, filePath);
        let params = { ...this.lockAccountForm, userid: this.userInfo.userid, image_url: imgRes.name };
        params.days = params.days * 1;
        params.scene = params.scene * 1;
        params.reason = params.reason * 1;
        params.sub_reason = params.sub_reason * 1;
        let func = {
          account: (data) => lockAccount(data),
          device: (data) => lockDevice(data),
        };
        console.log("params", params);
        const res = await func[this.type](params);
        if (res && res.errcode == 0) {
          this.$alert("修改成功！", "成功提示");
        }
        console.log("submit res", res);
        // this.resetForm("lockAccountForm");
      } catch (error) {
        console.log("submit error", error);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$parent.closeDialog();
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
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
.footer {
  /* border: 1px solid red; */
  display: flex;
  justify-content: end;
}
</style>
