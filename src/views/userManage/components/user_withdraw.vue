
<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
      style="margin: 0; padding: 0"
    >
      <el-tab-pane name="allAuditList">
        <span slot="label"><i class="el-icon-s-grid"></i>全部</span>
        <AllAuditList />
      </el-tab-pane>
      <el-tab-pane name="waitAuditList">
        <span slot="label"><i class="el-icon-s-check"></i>等待预审</span>
        <WaitAuditList />
      </el-tab-pane>
      <el-tab-pane name="manageAudit">
        <span slot="label"><i class="el-icon-s-custom"></i>副总审核</span>
        <ManageAudit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AllAuditList from "./userWithdrawComponents/allAuditList.vue";
import ManageAudit from "./userWithdrawComponents/manageAudit.vue";
import WaitAuditList from "./userWithdrawComponents/waitAuditList.vue";

export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {
    AllAuditList: AllAuditList,
    ManageAudit: ManageAudit,
    WaitAuditList: WaitAuditList,
  },
  props: {},
  data() {
    //这⾥存放数据
    return {
      activeName: 'allAuditList'
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期，挂载完成（可以访问dom元素）
  mounted() {},
  beforeCreate() {}, //⽣命周期-创建之前
  beforeMount() {}, //⽣命周期 - 挂载之前
  beforeUpdate() {}, //⽣命周期 - 更新之后
  updated() {}, //⽣命周期 - 更新之后
  beforeDestroy() {}, //⽣命周期 - 销毁之前
  destroy() {}, //⽣命周期 - 销毁完成
  activated() {}, //如果页⾯有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped></style>
