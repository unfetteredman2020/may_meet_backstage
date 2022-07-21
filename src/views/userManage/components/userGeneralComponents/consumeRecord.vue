<template>
  <div class="rechargeRecord">
    <el-table :data="list" border style="width: 100%" max-height="720">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="流水号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
            <el-form-item label="实际付款">
              <span>{{ props.row.amount }}</span>
            </el-form-item>
            <el-form-item label="客户端类型">
              <span>{{ props.row.ostype }}</span>
            </el-form-item>
            <el-form-item label="使用背包数">
              <span>{{ props.row.use_package_cnt }}</span>
            </el-form-item>
            <el-form-item label="提成用户">
              <span>{{ props.row.outtimestamp }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="流水号" width="100"></el-table-column>
      <el-table-column prop="dst_user" label="接收人【ID】" width="190"></el-table-column>
      <el-table-column prop="product" label="商品名称" width="200"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="amount" label="扣费数量" width="100"></el-table-column>
      <el-table-column prop="cost_freegold" label="使用赠送金币" width="120"></el-table-column>
      <el-table-column prop="cost_gold" label="支付总金币" width="120"></el-table-column>
      <el-table-column prop="rebate" label="提成" width="120"></el-table-column>
      <el-table-column prop="inserttime" label="创建时间" width="120"></el-table-column>
    </el-table>
    <div class="rechargeFooter">
      <span>
        充值总金额：
        <b>99999</b>
        元
      </span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getConsumeRecord } from "@/api/userApi.js";
import { getDate, formateDate } from "@/utils/date.js";
export default {
  //import引⼊的组件需要注⼊到对象中才能使⽤
  components: {},
  props: {},
  data() {
    //这⾥存放数据
    return {
      currentPage: 1,
      list: [],
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
        const res = await getConsumeRecord(data);
        console.log("getConsumeRecord res", res);
        if (res && res.errcode == 0) {
          this.list = res.data || [];
        } else {
          this.$message("error", "获取充值记录失败");
        }
        // console.log("geConsume res :>> ", res);
      } catch (error) {
        // console.log("error :>> ", error);
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
