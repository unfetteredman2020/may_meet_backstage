<template>
  <div>
    <el-tabs v-model="activeName" type="card" style="margin: 0; padding: 0">
      <el-tab-pane name="systemInfo">
        <span slot="label">
          <i class="el-icon-news"></i>
          系统消息
        </span>
        <systemInfo ref="systemInfo" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const systemInfo = () => import("./operateInfoModule/systemInfo.vue");
export default {
  props: {},
  components: {
    systemInfo,
  },
  data() {
    return {
      activeName: 'systemInfo'
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
