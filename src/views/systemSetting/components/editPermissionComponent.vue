<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
      <el-tree v-model="selectedKeys" v-if="dialogVisible" :default-checked-keys="defaultCheckedKeys" node-key="id" ref="tree" accordion @check-change="handleCheckChange" :data="data" show-checkbox :props="defaultProps"></el-tree>
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
      allItems: [],
      selectedKeys: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    getCheckedKeys() {
      // 获取选中的子节点
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      console.log("checkedKeys", checkedKeys);
      // 获取选中的父节点
      let hafCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      console.log("hafCheckedKeys", hafCheckedKeys);
      // 合并
      let allCheckList = checkedKeys.concat(hafCheckedKeys);
      console.log("allCheckList", allCheckList);
      // this.permissions = allCheckList;
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
      if (!visible) {
        this.defaultCheckedKeys = [];
        this.allItems = [];
        this.data = [];
      }
    },
    async confirm() {
      // 获取选中的子节点
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      console.log("checkedKeys", checkedKeys);
      // 获取选中的父节点
      let hafCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      console.log("hafCheckedKeys", hafCheckedKeys);
      // 合并
      let allCheckList = checkedKeys.concat(hafCheckedKeys);
      console.log("allCheckList", allCheckList);
      this.$parent.confirm(allCheckList);
    },
    async getPermission(role_code) {
      try {
        const res = await getPermissions({ role_code });
        console.log("getPermissions res", res.data[0].cms);
        if (res && res.errcode == 0) {
          this.data = res.data[0].cms;
          const arr = this.doObj(res.data[0].cms);
          let a = this.allItems.filter((item) => item.status == 1);
          let keys = Array.from(new Set(a.map((item) => item.id)));
          this.setCheckedItem(keys);
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
          console.log(
            "ids",
            this.allItems.map((item) => item.id).sort((a, b) => a - b)
          );
          const aab = this.refrain(this.allItems.map((item) => item.id));
          console.log("aab", aab);
          let a = this.allItems.filter((item) => item.status === 1);
          console.log("A", a);
          let keys = Array.from(new Set(a.map((item) => item.id)));
          console.log("keys", keys);
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys([]);
            keys.forEach((i) => {
              // 根据id 拿到 Tree 组件中的node的所有信息
              let node = this.$refs.tree.getNode(i);
              // node.isLeaf：判断当前节点是否为子节点
              if (node.isLeaf) {
                //如果是子节点，就把状态设置成选中
                this.$refs.tree.setChecked(node, true);
              }
            });
          });
        } else {
          this.$message("error", "获取角色权限失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取角色权限失败，请稍后重试！");
      }
    },
    refrain(arr) {
      var tmp = [];
      if (Array.isArray(arr)) {
        arr
          .concat()
          .sort()
          .sort(function (a, b) {
            if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
          });
      }
      return tmp;
    },
    setCheckedItem(keys) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
        keys.forEach((i) => {
          // 根据id 拿到 Tree 组件中的node的所有信息
          let node = this.$refs.tree.getNode(i);
          // node.isLeaf：判断当前节点是否为子节点
          if (node.isLeaf) {
            //如果是子节点，就把状态设置成选中
            this.$refs.tree.setChecked(node, true);
          }
        });
      });
    },
    doObj(datas) {
      let keys = [];
      datas.forEach((item, index) => {
        let a = this.allItems.filter((i) => i.id == item.id);
        if (a && a.length) {
          console.log("-item-", item);
          console.log("-index-", index);
        }
        this.allItems = [].concat(this.allItems, [item]);
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
