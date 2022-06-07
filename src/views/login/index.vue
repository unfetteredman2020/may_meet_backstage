<template>
  <div class="loginBox">
    <div class="centerBox">
      <div class="pannel">
        <p>可遇交友</p>
        <p>CONTENT MANAGEMENT SYSTEM</p>
      </div>
    </div>
    <div class="copyRight">©2018- 杭州聚轮网络科技有限公司 版权所有</div>
  </div>
</template>

<script>
//这⾥可以引⼊其他⽂件（⽐如组件，⼯具js，第三⽅插件js，json⽂件，图⽚⽂件等等）
//列如：import <<组件名称>> from '《组件路径》';
export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  props: {},
  data() {
    //这⾥存放数据
    return {};
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {},
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
.loginBox {
  border: 1px solid red;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.centerBox {
  position: absolute;
  border: 1px solid blue;
  width: 300px;
  height: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.copyRight {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  text-align: center;
  font-size: 13px;
  color: #d3c1cc;
  text-align: center;
}
.pannel p:nth-child(1) {
  font-size: 72px;
  font-weight: 300;
  color: #d5007f;
  text-indent: 2px;
  letter-spacing: 2px;
}

.pannel p:nth-child(2) {
  font-size: 17px;
  margin-top: -10px;
  font-family: "Microsoft Yahei";
  color: #555;
}
</style>
