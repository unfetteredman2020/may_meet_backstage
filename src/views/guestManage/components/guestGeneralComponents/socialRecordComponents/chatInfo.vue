<template>
  <div>
    <el-table v-loading="loading" :data="data" style="width: 100%" max-height="820px" border :header-cell-style="{ height: '20px', 'line-height': '20px', 'font-size': '12px', 'font-weight': '400', padding: '0!important' }" stripe class="customTableStyle" :row-style="{ height: '20px' }" :cell-style="{ padding: '0px', 'font-size': '12px' }">
      <el-table-column label="创建时间" prop="创建时间"></el-table-column>
      <el-table-column label="关系ID" prop="关系ID"></el-table-column>
      <el-table-column label="发送方" prop="发送方"></el-table-column>
      <el-table-column label="接收方" prop="接收方"></el-table-column>
      <el-table-column label="发送方" prop="发送方"></el-table-column>
      <el-table-column label="消息类型" prop="消息类型"></el-table-column>
      <el-table-column prop="消息内容" label="消息内容" width="350px">
        <template slot-scope="scope">
          <div v-if="scope.row['消息类型'] == 'RC:TxtMsg'">{{ scope.row["消息内容"].content }}</div>
          <div v-else-if="scope.row['消息类型'] == 'RC:HQVCMsg'">
            <audio class="myAudio" controls :src="scope.row['消息内容'].remoteUrl">您的浏览器不支持 audio 元素。</audio>
          </div>
          <el-image v-else-if="scope.row['消息类型'] == 'RC:ImgMsg'" style="width: 100px; height: 100px" :src="fixUrl(scope.row)" fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="费用免除类型" prop="费用免除类型"></el-table-column>
      <el-table-column label="消息状态" prop="消息状态"></el-table-column>
      <el-table-column label="关系" prop="关系"></el-table-column>
    </el-table>
  </div>
</template>

<script>
const customTable = () => import("@/components/customTable.vue");
import { getChatInfo } from "@/api/guestApi";
export default {
  props: {},
  inject: ["searchData"],
  components: {
    customTable,
  },
  data() {
    return {
      data: [],
      column: [
        { label: "发送方", value: "发送方" },
        { label: "接收方", value: "接收方" },
        { label: "消息类型", value: "消息类型" },
        { label: "消息内容", value: "消息内容" },
        { label: "费用免除类型", value: "费用免除类型" },
        { label: "消息状态", value: "消息状态" },
        { label: "关系", value: "关系" },
        { label: "创建时间", value: "创建时间" },
        { label: "关系ID", value: "关系ID" },
      ],
      type: {
        "RC:TxtMsg": "文字消息",
        "RC:HQVCMsg": "语音消息",
        "RC:ImgMsg": "图片消息",
      },
      loading: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    fixUrl(item) {
      console.log("item", item);
      // console.log("JSON.", JSON.parse(item));
      console.log("JSON.parse(item)", item["消息内容"]);
      // let url = JSON.parse(item);
      // console.log('item.imageUrl', item.imageUrl)
      return "";
    },
    async getData(data) {
      try {
        this.loading = true;
        console.log("chatInfo", this.searchData);
        const { date, ...rs } = this.searchData;
        let params = rs;
        params.starttime = date[0];
        params.endtime = date[1];
        console.log("params", params);
        const res = await getChatInfo(params);
        console.log("getChatInfo res", res);
        if (res && res.errcode == 0) {
          this.data = res.data || [];
        } else {
          this.$message("error", res.errmsg || "获取数据失败，请稍后重试！");
        }
        this.loading = false;
      } catch (error) {
        console.log("error", error);
        this.loading = false;
        this.$message("error", error.errmsg || "获取数据失败，请稍后重试！");
      }
    },
  },
};
</script>

<style scoped>
.myAudio {
  /* border: 1px solid red; */
  margin: 2px auto;
  /* width: 200px; */
  height: 20px;
  font-size: 12px;
}
</style>
