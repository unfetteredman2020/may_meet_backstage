<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
      class="abnormalTab"
    >
      <el-tab-pane name="moneyChange">
        <span slot="label"><i class="el-icon-money"></i>零钱异动</span>
        <MoneyChange ref="moneyChange"/>
      </el-tab-pane>
      <el-tab-pane name="propsChange">
        <span slot="label"><i class="el-icon-coin"></i>属性异动 </span>
        <PropsChange ref="propsChange"/>
      </el-tab-pane>
      <!-- <el-tab-pane name="serviceChange">
        <span slot="label"><i class="el-icon-sold-out"></i>业务异动</span>
        <ServiceChange ref="ServiceChange"/>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import ServiceChange from "./abnormalComponents/serviceChange.vue";
import MoneyChange from "./abnormalComponents/moneyChange.vue";
import PropsChange from "./abnormalComponents/propsChange.vue";
export default {
  name: 'userAbnormalRecord',
  components: {
    ServiceChange: ServiceChange,
    MoneyChange: MoneyChange,
    PropsChange: PropsChange,
  },
  props: {},
  data() {
    //这⾥存放数据
    return {
      activeName: "moneyChange",
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getData(data) {
      this.$refs[this.activeName].getData(data)
    }
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
<style scoped>
.abnormalTab {
  /* border: 1px solid red; */
}
</style>
