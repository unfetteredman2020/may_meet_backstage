<!--
 * @Author: unfetteredman weixw2014@qq.com
 * @Date: 2022-07-23 09:48:04
 * @LastEditors: unfetteredman weixw2014@qq.com
 * @LastEditTime: 2022-07-23 09:48:07
 * @FilePath: \may_meet_backstage\src\views\systemSetting\components\backstageAccountManage.vue
-->

<template>
  <div>
    <el-form style="background-color: #eee; padding: 15px 0 0" :inline="true" :model="searchForm" ref="backstageAccountManageSearchFormRef">
      <el-form-item label="誓聊ID：" prop="role_code">
        <el-input v-model="searchForm.role_code" placeholder="请输入角色代码"></el-input>
      </el-form-item>
      <el-form-item label="角色名称：" prop="role_name">
        <el-input v-model="searchForm.role_name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色名称：" prop="mobile">
        <el-input v-model="searchForm.mobile" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('backstageAccountManageSearchFormRef')">查询</el-button>
        <el-button @click="resetForm('backstageAccountManageSearchFormRef')">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCountBtn">创建账号</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" stripe style="width: 100%" max-height="850px">
      <el-table-column prop="创建人" label="创建人"></el-table-column>
      <el-table-column prop="手机号" label="手机号"></el-table-column>
      <el-table-column prop="昵称" label="昵称"></el-table-column>
      <el-table-column prop="真实姓名" label="真实姓名"></el-table-column>
      <el-table-column prop="角色" label="角色"></el-table-column>
      <el-table-column prop="真实姓名" label="真实姓名"></el-table-column>
      <el-table-column prop="誓聊id" label="誓聊id"></el-table-column>
      <el-table-column prop="部门" label="部门"></el-table-column>
      <el-table-column prop="enabled" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row['enabled'] == 0 ? 'danger' : 'success'">{{ scope.row["enabled"] == 0 ? "禁用" : "正常" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="faceimg" label="头像">
        <template slot-scope="scope">
          <!-- vue实例外创建 -->
          <el-avatar size="large" :src="scope.row.faceimg"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <div class="settign" style="display: flex">
            <el-button class="el-icon-edit setBtn" type="primary" @click="editPermission(scope.row)">编辑权限</el-button>
            <el-button class="el-icon-edit setBtn" type="primary" @click="editAccount(scope.row)">编辑角色</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="flag ? '编辑账号' : '新增账号'" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false">
      <el-form :model="editRoleForm" ref="editRoleFormRef" label-position="right" :rules="rules">
        <el-form-item label="誓聊ID：" label-width="100px" prop="userid" v-if="!flag">
          <el-input v-model="editRoleForm.userid" autocomplete="off" style="width: 300px" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" label-width="100px" prop="nickname">
          <el-input v-model="editRoleForm.nickname" autocomplete="off" style="width: 300px" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" label-width="100px" prop="phone">
          <el-input v-model="editRoleForm.phone" autocomplete="off" style="width: 300px" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="部门ID：" label-width="100px" prop="sectionid">
          <el-select v-model="editRoleForm.sectionid" placeholder="请选择团队ID" style="width: 300px">
            <el-option :label="item.name" :value="item.id" v-for="item in departmentList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队ID：" label-width="100px" prop="group_id">
          <el-select v-model="editRoleForm.group_id" placeholder="请选择团队ID" style="width: 300px">
            <el-option :label="item.groupname" :value="item.groupid" v-for="item in recommendList" :key="item.groupid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色代码：" label-width="100px" prop="role_code">
          <el-select v-model="editRoleForm.role_code" placeholder="请选择团队ID" style="width: 300px">
            <el-option :label="item.role_name" :value="item.role_code" v-for="item in roleList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名：" label-width="100px" prop="realname">
          <el-input v-model="editRoleForm.realname" autocomplete="off" style="width: 300px" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editRoleFormRef')">取 消</el-button>
        <el-button type="primary" @click="submitForm('editRoleFormRef')">确 定</el-button>
      </div>
    </el-dialog>
    <editPermissionComponent ref="accountEditPermissionComponentRef" />
  </div>
</template>

<script>
import { getBackStageAccountManage, editAccounts, addCount, editAccountsPermission } from "@/api/systemApi.js";
import { getDepartmentList, getRecommendTeam, getRoleList } from "@/api/baseInfoApi.js";
const editPermissionComponent = () => import("./editPermissionComponent.vue");
export default {
  props: {},
  components: { editPermissionComponent },
  data() {
    return {
      list: [],
      BASE_CDN_DOMAIN: `${process.env.VUE_APP_CDN_DOMAIN}`,
      dialogVisible: false,
      editRoleForm: {
        realname: null,
        nickname: null,
        sectionid: null,
        phone: null,
        role_code: null,
        group_id: null,
      },
      searchForm: {
        userid:null,
        mobile: null,
        role_code: null,
        role_name: null,
      },
      rules: {
        userid: [{ required: true, message: "请输入誓聊ID" }],
        role_code: [{ required: true, message: "请输入角色代码" }],
        role_name: [{ required: true, message: "请输入角色名称" }],
        realname: [{ required: true, message: "请输入真实姓名" }],
        nickname: [{ required: true, message: "请输入昵称" }],
        sectionid: [{ required: true, message: "请选择团队ID" }],
        phone: [{ required: true, message: "请输入手机号" }],
        group_id: [{ required: true, message: "请选择团队ID" }],
      },
      flag: false,
      departmentList: [], //部门列表
      recommendList: [], //推荐团队列表
      roleList: [], //角色列表
      editItem: null,
    };
  },
  computed: {},
  mounted() {
    this.getData();
    this.getBaseInfo();
  },
  methods: {
    editPermission(item) {
      console.log("editPermission", item);
      this.editItem = item
      item['角色代码'] = item.adminid 
      this.$refs.accountEditPermissionComponentRef.openOrClose(true, item, true);
    },
    editAccount(item) {
      console.log("editAccount", item);
      this.flag = true;
      this.editItem = item;
      let departmentId = this.departmentList.filter((i) => i.name == item["部门"]);
      let roleId = this.roleList.filter((i) => i.role_name == item["角色"]);
      console.log("roleId", roleId);
      this.editRoleForm = {
        realname: item["真实姓名"],
        nickname: item["昵称"],
        sectionid: departmentId.length ? departmentId[0].id : "", //部门id
        phone: item["手机号"],
        role_code: roleId.length ? roleId[0].role_code : null, //角色
        group_id: null,
      };
      this.dialogVisible = true;
    },
    addCountBtn() {
      this.flag = false;

      this.dialogVisible = true;
    },
    submitForm(formName) {
      console.log("formName", formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case "backstageAccountManageSearchFormRef":
              this.getData();
              break;
            case "editRoleFormRef":
              this.flag ? this.editAccounts() : this.addAccount();
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交编辑权限
    async confirm(permission) {
      try {
        const res = await editAccountsPermission({ userid: this.editItem["誓聊id"], permission });
        console.log("editAccountsPermission res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改权限成功！");
          this.$refs.accountEditPermissionComponentRef.openOrClose(false, null);
        } else {
          this.$message("error", "编辑权限失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "编辑权限失败，请稍后重试！");
      }
    },
    async addAccount() {
      try {
        const res = await addCount(this.editRoleForm);
        console.log("addCount res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "添加账号成功！");
          this.getData();
          this.resetForm("editRoleFormRef");
        } else {
          this.$message("error", "添加账号失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "添加账号失败，请稍后重试！");
      }
    },
    async editAccounts() {
      try {
        let params = { ...this.editRoleForm };
        params.userid = this.editItem["誓聊id"];
        const res = await editAccounts(params);
        console.log("editAccounts res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改账号成功！");
          this.getData();
          this.resetForm("editRoleFormRef");
        } else {
          this.$message("error", "修改账号失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "修改账号失败，请稍后重试！");
      }
    },
    async getBaseInfo() {
      try {
        const res = await getDepartmentList();
        const res2 = await getRecommendTeam();
        const res3 = await getRoleList();
        console.log("getDepartmentList res", res);
        console.log("getRecommendTeam res", res2);
        console.log("getRoleList res", res3);
        if (res3 && res3.errcode == 0) {
          this.roleList = res3.data || [];
        } else {
          this.$message("error", "获取推荐团队数据失败，请稍后重试！");
        }
        if (res2 && res2.errcode == 0) {
          this.recommendList = res2.data || [];
        } else {
          this.$message("error", "获取推荐团队数据失败，请稍后重试！");
        }
        if (res && res.errcode == 0) {
          this.departmentList = res.data || [];
        } else {
          this.$message("error", "获取推荐团队数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取部门数据失败，请稍后重试！");
      }
    },
    async getData(data = {}) {
      try {
        let arr = []
        for (let index = 1; index < 314; index++) {
          arr.push(index)
          
        }
        console.log('arr', arr)
        const res = await getBackStageAccountManage(data);
        console.log("getBackStageAccountManage res", res);
        if (res && res.errcode == 0) {
          this.list = res.data || [];
        } else {
          this.$message("error", "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取数据失败，请稍后重试！");
      }
    },
    resetForm(formName) {
      this.flag = false;
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.setBtn {
  font-size: 10px;
  /* width: 60px; */
  padding: 5px 8px;
}
</style>
