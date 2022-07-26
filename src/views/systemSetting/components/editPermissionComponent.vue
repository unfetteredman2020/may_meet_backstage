<template>
  <div>
    <el-dialog title="提示"  :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
      <el-tree v-if="dialogVisible"  :default-checked-keys="defaultCheckedKeys" node-key="id" ref="tree" accordion @check-change="handleCheckChange" :data="data" show-checkbox :props="defaultProps"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openOrClose(false, null)">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissions, getAccountPermission } from "@/api/systemApi.js";
let allItems = [];
export default {
  props: {},
  components: {},
  data() {
    return {
      editItem: {},
      dialogVisible: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      keys: [],
      defaultCheckedKeys: [],
      permissions: [], // 已经选中的权限
      allItems: []
    };
  },
  computed: {},
  mounted() {},
  methods: {
    getCheckedKeys() {
      let a = Array.from(new Set(this.$refs.tree.getCheckedKeys()));
      console.log(
        "a",
        a.sort((a, b) => a - b)
      );
      this.permissions = a;
    },
    handleCheckChange(data, checked, indeterminate) {
      this.getCheckedKeys();
      console.log(data, checked, indeterminate);
    },
    openOrClose(visible, item, isAccount) {
      this.dialogVisible = visible;
      visible && (this.editItem = item);
      if (isAccount) {
        visible && this.getAccountPermissions(item["角色代码"]);
      } else {
        visible && this.getPermission(item["角色代码"]);
      }
      if(!visible) {
        this.defaultCheckedKeys = [];
        this.data = []
      }
    },
    async confirm() {
      this.$parent.confirm(this.permissions);
    },
    async getPermission(role_code) {
      try {
        const res = await getPermissions({ role_code });
        console.log("getPermissions res", res.data[0].cms);
        if (res && res.errcode == 0) {
          this.data = res.data[0].cms;
          const arr = this.doObj(res.data[0].cms);
          let a = this.allItems.filter((item) => item.status == 1);
          console.log(
            "权限列表",
            a.map((item) => item.id)
          );
          this.defaultCheckedKeys = a.map((item) => item.id);
        } else {
          this.$message("error", "获取角色权限失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取角色权限失败，请稍后重试！");
      }
    },
    async getAccountPermissions(adminid) {
      try {
        const res = await getAccountPermission({ adminid });
        console.log("getAccountPermission res", res.data[0].cms);
        if (res && res.errcode == 0) {
          this.data = res.data[0].cms;
          const arr = this.doObj(res.data[0].cms);
          let a = this.allItems.filter((item) => item.status == 1);
          console.log(
            "权限列表",
            a.map((item) => item.id)
          );
          let keys = Array.from(new Set(a.map((item) => item.id)))
          console.log('keys', keys)
          this.defaultCheckedKeys = keys ;
        } else {
          this.$message("error", "获取角色权限失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取角色权限失败，请稍后重试！");
      }
    },
    doObj(datas) {
      let keys = [];
      datas.forEach((item, index) => {
        this.allItems = [].concat(this.allItems, [item])
        if (item.children && item.children.length) {
          this.doObj(item.children);
        }
        if (item.status == 1) {
          keys.push(item.id);
          this.keys = [].concat(this.keys, keys);
        }
        return;
      });
    },
  },
};
</script>

<style scoped></style>
