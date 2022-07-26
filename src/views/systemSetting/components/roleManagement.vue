<!--
 * @Author: unfetteredman weixw2014@qq.com
 * @Date: 2022-07-23 09:47:49
 * @LastEditors: unfetteredman weixw2014@qq.com
 * @LastEditTime: 2022-07-23 09:47:52
 * @FilePath: \may_meet_backstage\src\views\systemSetting\components\roleManagement.vue
-->
<template>
  <div>
    <el-form style="background-color: #eee; padding: 15px 0 0" :inline="true" :model="searchForm" ref="roleManageSearchFormRef">
      <el-form-item label="角色代码：" prop="role_code">
        <el-input v-model="searchForm.role_code" placeholder="请输入角色代码"></el-input>
      </el-form-item>
      <el-form-item label="角色名称：" prop="role_name">
        <el-input v-model="searchForm.role_name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('roleManageSearchFormRef')">查询</el-button>
        <el-button @click="resetForm('roleManageSearchFormRef')">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRoleBtn">新增角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" stripe style="width: 100%" max-height="850px">
      <el-table-column prop="inserttime" label="创建时间"></el-table-column>
      <el-table-column prop="创建人" label="创建人"></el-table-column>
      <el-table-column prop="角色名称" label="角色名称"></el-table-column>
      <el-table-column prop="角色代码" label="角色代码"></el-table-column>
      <el-table-column prop="状态" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row['状态'] == 0 ? 'danger' : 'success'">{{ scope.row["状态"] == 0 ? "禁用" : "正常" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="角色描述" label="角色描述"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <div class="settign" style="display: flex">
            <el-button class="el-icon-edit setBtn" type="primary" @click="editPermissions(scope.row)">编辑权限</el-button>
            <el-button class="el-icon-edit setBtn" type="primary" @click="editRole(scope.row)">编辑角色</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="flag ? '编辑角色' : '新增角色'" :visible.sync="dialogVisible">
      <el-form :model="editRoleForm" ref="editRoleFormRef" label-position="right" :rules="rules">
        <el-form-item label="角色代码：" label-width="100px" prop="role_code">
          <el-input v-model="editRoleForm.role_code" autocomplete="off" style="width: 300px" placeholder="请输入角色代码"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" label-width="100px" prop="role_name">
          <el-input v-model="editRoleForm.role_name" autocomplete="off" style="width: 300px" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="状态：" label-width="100px" prop="status">
          <el-select v-model="editRoleForm.status" placeholder="请选择状态" style="width: 300px">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" label-width="100px" prop="memo">
          <el-input type="textarea" v-model="editRoleForm.memo" style="width: 300px" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editRoleFormRef')">取 消</el-button>
        <el-button type="primary" @click="submitForm('editRoleFormRef')">确 定</el-button>
      </div>
    </el-dialog>
    <editPermissionComponent ref="editPermissionComponentRef" />
  </div>
</template>

<script>
import { getRoleList, editRole, addRole , changePermission} from "@/api/systemApi.js";
const editPermissionComponent = () => import("./editPermissionComponent.vue");
export default {
  props: {},
  components: { editPermissionComponent },
  data() {
    return {
      list: [],
      dialogVisible: false,
      editRoleForm: {
        role_code: null,
        role_name: null,
        memo: null,
        status: null,
      },
      searchForm: {
        role_code: null,
        role_name: null,
      },
      rules: {
        role_code: [{ required: true, message: "请输入角色代码" }],
        role_name: [{ required: true, message: "请输入角色名称" }],
        memo: [{ required: true, message: "请输入备注" }],
        status: [{ required: true, message: "请选择状态" }],
      },
      editItem:null,
      flag: false,
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    editPermissions(item) {
      console.log("editPermissions", item);
      this.editItem = item
      this.$refs.editPermissionComponentRef.openOrClose(true, item)
    },
    editRole(item) {
      this.flag = true;
      console.log("editRole", item);
      this.editRoleForm = {
        role_code: item["角色代码"],
        role_name: item["角色名称"],
        memo: item["角色描述"],
        status: item["状态"] + "",
      };
      this.dialogVisible = true;
    },
    addRoleBtn() {
      this.flag = false;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case "roleManageSearchFormRef":
              this.getData();
              break;
            case "editRoleFormRef":
              this.flag ? this.editRoles() : this.addRoles();
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
        const res = await changePermission({ role_code: this.editItem["角色代码"], permission });
        console.log("changePermission res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改权限成功！");
          this.$refs.editPermissionComponentRef.openOrClose(false, null)
        } else {
          this.$message("error", "编辑权限失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "编辑权限失败，请稍后重试！");
      }
    },
    async addRoles() {
      try {
        const res = await addRole(this.editRoleForm);
        console.log("editRole res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "添加角色成功！");
          this.getData();
          this.resetForm("editRoleFormRef");
        } else {
          this.$message("error", "添加角色失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "添加角色失败，请稍后重试！");
      }
    },
    async editRoles() {
      try {
        const res = await editRole(this.editRoleForm);
        console.log("editRole res", res);
        if (res && res.errcode == 0) {
          this.$message("success", "修改角色成功！");
          this.getData();
          this.resetForm("editRoleFormRef");
        } else {
          this.$message("error", "修改角色失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "修改角色失败，请稍后重试！");
      }
    },
    async getData(data = {}) {
      try {
        const res = await getRoleList(data);
        console.log("getRoleList res", res);
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
