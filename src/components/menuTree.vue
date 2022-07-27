<template>
  <fragment>
    <template v-for="(menu) in menuData">
      <el-submenu :key="menu.path" :index="menu.path" v-if="menu.children" >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </template>
        <MenuTree :menuData="menu.children"></MenuTree>
      </el-submenu>
      <el-menu-item :key="menu.path" :index="menu.path" v-else >
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  name: "MenuTree",
  components: {},
  props: {
    menuData: {
      type: Array,
      default: ()=> []
    }
  },
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

</style>
