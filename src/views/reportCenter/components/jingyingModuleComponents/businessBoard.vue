<template>
  <div class="activePlatformBox">
    <header class="customHeader">
      <span style="font-size: 12px">业务看板</span>
      <el-button size="mini" class="el-icon-refresh">refresh</el-button>
    </header>
    <main>
      <allPeopleBusinessData />
      <peopleOnlineTrend />
      <speakTimes/>
      <speakDuration/>
    </main>
  </div>
</template>

<script>
import allPeopleBusinessData from "./businessBoardComponents/allPeopleBusinessData.vue";
import peopleOnlineTrend  from './businessBoardComponents/peopleOnlineTrend.vue'
import speakTimes from './businessBoardComponents/speak.vue'
import speakDuration from './businessBoardComponents/speakDuration.vue'
export default {
  props: {},
  components: { allPeopleBusinessData, peopleOnlineTrend, speakTimes,speakDuration },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
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
          this.$message("error", "获取数据失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", "获取数据失败，请稍后重试！");
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
</style>
