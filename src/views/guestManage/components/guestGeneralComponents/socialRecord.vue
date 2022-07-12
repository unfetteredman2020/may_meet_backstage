<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin: 0; padding: 0">
      <el-tab-pane name="chatInfo">
        <span slot="label">
          <i class="el-icon-s-comment"></i>
          聊天信息
        </span>
        <chatInfo ref="chatInfo" />
      </el-tab-pane>
      <el-tab-pane name="callLog">
        <span slot="label">
          <i class="el-icon-s-order"></i>
          通话记录
        </span>
        <callLog ref="callLog" />
      </el-tab-pane>
      <el-tab-pane name="receiveGiftInfo">
        <span slot="label">
          <i class="el-icon-s-finance"></i>
          收礼信息
        </span>
        <receiveGiftInfo ref="receiveGiftInfo" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const callLog = () => import("./socialRecordComponents/callLog.vue");
const chatInfo = () => import("./socialRecordComponents/chatInfo.vue");
const receiveGiftInfo = () => import("./socialRecordComponents/receiveGiftInfo.vue");

export default {
  props: {},
  components: {
    callLog,
    chatInfo,
    receiveGiftInfo,
  },
  data() {
    return {
      activeName: "chatInfo",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getData(){
      this.$refs[this.activeName].getData()
    }
  },
};
</script>

<style scoped></style>
