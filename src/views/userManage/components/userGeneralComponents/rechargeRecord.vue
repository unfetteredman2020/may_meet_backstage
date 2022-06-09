<template>
  <div class="rechargeRecord">
    <el-table :data="list" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="客户端类型">
              <span>{{ props.row.ostype }}</span>
            </el-form-item>
            <el-form-item label="充值模板ID">
              <span>{{ props.row.tempid }}</span>
            </el-form-item>
            <el-form-item label="充值入口">
              <span>{{ props.row.pagesrc }}</span>
            </el-form-item>
            <el-form-item label="额外赠送金币">
              <span>{{ props.row.oldfreegold }}</span>
            </el-form-item>
            <el-form-item label="充值前金币">
              <span>{{ props.row.addfreegold }}</span>
            </el-form-item>
            <el-form-item label="支付回调时间">
              <span>{{ props.row.outtimestamp }}</span>
            </el-form-item>
            <el-form-item label="对方订单号">
              <span>{{ props.row.outtrade_no }}</span>
            </el-form-item>
            <el-form-item label="业务状态">
              <span>{{ props.row.outstatus }}</span>
            </el-form-item>
            <el-form-item label="业务状态原因">
              <span>{{ props.row.outreason }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.describe }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="trade_no" label="订单号" width="150">
      </el-table-column>
      <el-table-column prop="status" label="支付状态" width="120">
      </el-table-column>
      <el-table-column prop="paytype" label="支付方式" width="120">
      </el-table-column>
      <el-table-column prop="userid" label="充值人ID" width="120">
      </el-table-column>
      <el-table-column prop="dst_userid" label="充值对象ID" width="300">
      </el-table-column>
      <el-table-column prop="addgold" label="充值金额" width="120">
      </el-table-column>
      <el-table-column prop="total" label="获得总金币" width="120">
      </el-table-column>
      <el-table-column prop="channel" label="充值渠道" width="120">
      </el-table-column>
      <el-table-column prop="zinserttimeip" label="充值时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="rechargeFooter">
      <span>充值总金额：99999 元</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getRechargeRecord } from "@/api/api.js";
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
      console.log(row);
    },
    async getRecharge() {
      try {
        const { year, month, dayNumber, fullDate } = getDate();
        let startTime = `${year}-${formateDate(month - 1)}-${formateDate(
          dayNumber
        )}`;
        let endTiem = fullDate;
        const res = await getRechargeRecord(
          `userid=${10000}&starttime=${startTime}&endtime=${endTiem}`
        );
        if (res && res.errcode == 0) {
          this.list = res.data || [];
        } else {
          this.$message({
            type: "error",
            message: "获取充值记录失败",
          });
        }
        console.log("getRecharge res :>> ", res);
      } catch (error) {
        console.log("error :>> ", error);
        this.$message({
          type: "error",
          message: "获取充值记录失败",
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  //⽣命周期，创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期，挂载完成（可以访问dom元素）
  mounted() {
    this.getRecharge();
  },
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
}
</style>
