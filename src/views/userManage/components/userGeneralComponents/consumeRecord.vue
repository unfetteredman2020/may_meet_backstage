<template>
  <div class="rechargeRecord">
    <el-table :data="list" border max-height="850" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" label-width="100px" class="demo-table-expand" style="margin: 0 20px 0 50px">
            <el-form-item label="流水号：">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="客户端类型：">
              <span>{{ props.row.ostype == 1 ? "安卓" : "苹果" }}</span>
            </el-form-item>
            <el-form-item label="使用背包数：">
              <span>{{ props.row.use_package_cnt }}</span>
            </el-form-item>
            <el-form-item label="提成用户：">
              <span>{{ props.row.dst_user }}</span>
            </el-form-item>
            <!-- <el-form-item label="消费类型：">
              <span>{{ props.row.msgtype }}</span>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="流水号"></el-table-column>
      <!-- <el-table-column prop="userid" label="提成用户" width="100"></el-table-column> -->
      <el-table-column prop="dst_user" label="接收人【ID】" width="190"></el-table-column>
      <el-table-column label="消费类型：" prop="msgtype">
        <template slot-scope="scope">
          <el-tag :type="scope.row['msgtype'] == 'RC:TxtMsg' ? 'success' : scope.row['msgtype'] == 'MY:GiftMsg' ? '' : 'info'" effect="dark">
            {{ scope.row["msgtype"] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="propname" label="商品名称"></el-table-column>
      <el-table-column prop="propid" label="商品id"></el-table-column>
      <el-table-column prop="amount" label="扣费数量"></el-table-column>
      <el-table-column prop="freegold" label="使用赠送金币"></el-table-column>
      <el-table-column prop="gold" label="支付总金币"></el-table-column>
      <el-table-column prop="content" label="内容" width="200">
        <template slot-scope="scope">
          {{ scope.row["content"]["content"] }}
        </template>
      </el-table-column>
      <el-table-column prop="rebate" label="提成"></el-table-column>
      <el-table-column prop="inserttime" label="创建时间"></el-table-column>
    </el-table>
    <div class="rechargeFooter" v-if="false">
      <span></span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getConsumeRecord } from "@/api/userApi.js";
// import { getDate, formateDate } from "@/util  s/date.js";
export default {
  name: "consumeRecord",
  components: {},
  props: {},
  data() {
    //这⾥存放数据
    return {
      currentPage: 1,
      list: [],
      loading: false,
    };
  },
  //监控data中的数据变化
  watch: {},
  //计算属性，类似于data概念
  computed: {},
  //⽅法集合
  methods: {
    handleClick(row) {
      // console.log(row);
    },
    async getData(data) {
      try {
        this.loading = true;
        const res = await getConsumeRecord(data);
        console.log("getConsumeRecord res", res);
        if (res && res.errcode == 0) {
          this.list = res.data || [];
        } else {
          this.$message("error", res.errmsg || "获取充值记录失败");
        }
        this.loading = false;
        // console.log("geConsume res :>> ", res);
      } catch (error) {
        // console.log("error :>> ", error);
        this.loading = false;
        this.$message("error", error.errmsg || "获取充值记录失败");
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
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
<style scoped>
.rechargeFooter {
  display: flex;
  height: 53px;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  font-size: 14px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  /* border: 1px solid red; */
}
</style>
