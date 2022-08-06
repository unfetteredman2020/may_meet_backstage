<template>
  <div class="allBoardBox">
    <header class="customHeader">
      <span>总览看板</span>
      <el-button type="primary"  class="el-icon-refresh" @click="getData">refresh</el-button>
    </header>
    <main class="customMain">
      <el-descriptions class="descriptions" title="在线人数" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            在线人数
          </template>
          {{ boardData["男性在线人数"] + boardData["女性在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            男性在线人数
          </template>
          {{ boardData["男性在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            女性在线人数
          </template>
          {{ boardData["女性在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-c-scale-to-original"></i>
            男女比例
          </template>
          {{ proportion(boardData["男性在线人数"] / boardData["女性在线人数"] || 0) }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="男优质女比例" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            在线男性
          </template>
          {{ boardData["男性在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            在线优质女性
          </template>
          {{ boardData["优质女在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            男优质女比例
          </template>
          {{ youzhibili }}
        </el-descriptions-item>
        <!-- <el-descriptions-item>
          <template slot="label"><i class="el-icon-c-scale-to-original"></i>男女比例</template>{{ boardData["男性在线人数"] / boardData["女性在线人数"] }}
        </el-descriptions-item> -->
      </el-descriptions>
      <el-descriptions class="descriptions" title="在线优质女年龄段" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            在线优质女年龄段
          </template>
          人数
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            18-30周岁
          </template>
          {{ boardData["优质女18_30岁在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            31-40周岁
          </template>
          {{ boardData["优质女31_40岁在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-c-scale-to-original"></i>
            40岁以上
          </template>
          {{ boardData["优质女40岁以上在线人数"] }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="付费男性年龄段" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            当日男性年龄段
          </template>
          金额分布
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            18-30周岁
          </template>
          {{ boardData["男性18_30岁付费金额"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            31-40周岁
          </template>
          {{ boardData["男性31_40岁付费金额"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-c-scale-to-original"></i>
            40岁以上
          </template>
          {{ boardData["男性40岁以上付费金额"] }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="社交收益女性年龄段" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            当日女性年龄
          </template>
          社交收益
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            18-30周岁
          </template>
          {{ boardData["女性18_30岁社交收益"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            31-40周岁
          </template>
          {{ boardData["女性31_40岁社交收益"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-c-scale-to-original"></i>
            40岁以上
          </template>
          {{ boardData["女性40岁以上社交收益"] }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="在线男性年龄段" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            在线男性年龄
          </template>
          人数
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            18-30周岁
          </template>
          {{ boardData["男性18_30岁在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            31-40周岁
          </template>
          {{ boardData["男性31_40岁在线人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-c-scale-to-original"></i>
            40岁以上
          </template>
          {{ boardData["男性40岁以上在线人数"] }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="付费女性年龄段" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            当日女性年龄
          </template>
          金额分布
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            18-30岁
          </template>
          {{ boardData["女性18_30岁付费金额"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            31-40周岁
          </template>
          {{ boardData["女性31_40岁付费金额"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-c-scale-to-original"></i>
            40岁以上
          </template>
          {{ boardData["女性40岁以上付费金额"] }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="真人认证" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            真人认证
          </template>
          {{ boardData["男性真人认证人数"] + boardData["女性真人认证人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            男性
          </template>
          {{ boardData["男性真人认证人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            女性
          </template>
          {{ boardData["女性真人认证人数"] }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="真人女性年龄段" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-discount"></i>
            女性真人认证
          </template>
          人数
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            18-30岁
          </template>
          {{ boardData["女性18_30岁真人认证人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            31-40周岁
          </template>
          {{ boardData["女性31_40岁真人认证人数"] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-c-scale-to-original"></i>
            40岁以上
          </template>
          {{ boardData["女性40岁以上真人认证人数"] }}
        </el-descriptions-item>
      </el-descriptions>
    </main>
  </div>
</template>

<script>
import { allBoard } from "@/api/reportApi.js";
export default {
  props: {},
  components: {},
  data() {
    return {
      boardData: {},
    };
  },
  computed: {
    youzhibili() {
      return (this.boardData?.["男性在线人数"] / this.boardData?.["优质女在线人数"]).toFixed(2);
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    proportion(num) {
      return num.toFixed(2)
    },
    async getData() {
      try {
        const res = await allBoard();
        console.log("res", res);
        if (res && res.errcode == 0) {
          this.boardData = res.data[0];
        } else {
          this.$message("error", res.errmsg || "数据获取失败，请稍后重试！");
        }
      } catch (error) {
        console.log("error", error);
        this.$message("error", error.errmsg || "数据获取失败，请稍后重试！");
      }
    },
  },
};
</script>

<style scoped>
.allBoardBox {
  padding: 0 20px 10px;
  background-color: #f2f3f4;
  height: calc(100vh - 70px - 55px - 10px);
  overflow: scroll;
  /* border: 1px solid red; */
  box-sizing: border-box;
}
.customHeader {
  /* border: 1px solid blue; */
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.descriptions {
  background-color: #fff;
  margin: 10px 0;
  /* border: 1px solid red; */
  width: 535px;
  height: 200px;
}
.customMain {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
