<template>
  <div class="activePlatformBox">
    <header class="customHeader">
      <span style="font-size: 12px">业务看板</span>
      <el-button  class="el-icon-refresh" type="primary" @click="refresh" :loading="loading">refresh</el-button>
    </header>
    <main>
      <allPeopleBusinessData />
      <peopleOnlineTrend ref="peopleOnlineTrend" />
      <div class="speakTimeAndCount">
        <speakTimes :id="'getSpeakTimes'" ref="speakTimes" :config="speakTime" />
        <speakCount :id="'getSpeakCount'" ref="speakCount" :config="speakCount" />
      </div>
      <speakDuration />
    </main>
  </div>
</template>

<script>
import allPeopleBusinessData from "./businessBoardComponents/allPeopleBusinessData.vue";
import peopleOnlineTrend from "./businessBoardComponents/peopleOnlineTrend.vue";
// import speakTimes from "./businessBoardComponents/speak.vue";
// import speakCount from "./businessBoardComponents/speak.vue";
const speakCount = () => import("./businessBoardComponents/speak.vue");
const speakTimes = () => import("./businessBoardComponents/speak.vue");
import speakDuration from "./businessBoardComponents/speakDuration.vue";
import { speakPersonTimes, speakPersonCount } from "@/api/reportApi.js";
export default {
  props: {},
  components: { allPeopleBusinessData, peopleOnlineTrend, speakTimes, speakDuration, speakCount },
  data() {
    return {
      loading: false,
      speakTime: {
        id: "speakTimes",
        subText: "发言次数",
        data: [],
        methodName: "getSpeakTimes",
      },
      speakCount: {
        id: "speakCount",
        subText: "发言人数",
        data: [],
        methodName: "getSpeakCount",
      },
    };
  },
  computed: {},
  mounted() {
    this.getSpeakTimes();
    this.getSpeakCount();
  },
  methods: {
    refresh() {
      this.loading = true;
      this.getSpeakTimes();
      this.getSpeakCount();
      this.$refs.peopleOnlineTrend.getData();
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    async getSpeakTimes(date) {
      try {
        let params = {
          starttime: "2022-06-01",
          endtime: "2022-07-04",
        };
        const res = await speakPersonTimes(date || params);
        console.log("speakTimes", res);
        if (res && res.errcode == 0) {
          this.speakTime.data = res.data || [];
          this.$refs.speakTimes.init(res.data);
        } else {
                    this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("speakTimes error", error);
        this.$message("error", "获取数据失败，请稍后重试");
      }
    },
    async getSpeakCount(date) {
      try {
        let params = {
          starttime: "2022-06-01",
          endtime: "2022-07-04",
        };
        const res = await speakPersonCount(date || params);
        console.log("speakPersonCount", res);
        if (res && res.errcode == 0) {
          this.speakCount.data = res.data || [];
          this.$refs.speakCount.init(res.data);
        } else {
                    this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("speakPersonCount error", error);
        this.$message("error", "获取数据失败，请稍后重试");
      }
    },
    async getBusinessData() {
      try {
        let params = {
          starttime: "2022-06-01",
          endtime: "2022-07-04",
        };
        const res = await allPeopleData(params);
        console.log("res", res);
        if (res && res.errcode == 0) {
          this.newOrOldPeople = res.data || [];
        } else {
                    this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg ||  "获取数据失败，请稍后重试！");
      }
    },

    search() {
      console.log("this.select", this.select);
      console.log("this.input3", this.input3);
    },
    tiemChange(value) {
      console.log("value", value);
    },
    selectChange(value) {
      console.log("value", value);
    },
  },
};
</script>

<style scoped>
.activePlatformBox {
  padding: 0 10px 10px;
  background-color: #f2f3f4;
  height: calc(100vh - 70px - 55px - 10px);
  overflow: scroll;
  /* border: 1px solid red; */
  box-sizing: border-box;
}
.customHeader {
  display: flex;
  justify-content: space-between;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  width: 300px;
  background-color: #fff;
}
.searchContainer {
  display: flex;
  margin: 20px 0;
}
.searchContainer > div {
  margin: 0 10px;
  display: flex;
  /* border: 1px solid red; */
  /* align-items: center; */
  justify-content: flex-start;
  flex-direction: column;
}
.searchContainer > div > span {
  font-size: 10px;
  color: #051c32;
}
.speakTimeAndCount {
  margin: 10px 0;
  /* border: 2px solid orange; */
  display: flex;
  justify-content: space-between;
}
</style>
