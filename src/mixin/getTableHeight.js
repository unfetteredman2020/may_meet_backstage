/**
 * descript: 自动获取table的高度
 */
export default {
  props: {
    // 此处id切记不可传重复
  },
  data() {
    return {
      tableHeight: 0,
      subCount: 0
    };
  },
  mounted() {
    // 部分暂时隐藏的 chart图，在显示的时候监听不到 seriesData的变化，需由 mounted来调用
    this.getTableHeight();
    window.addEventListener("resize", this.getTableHeight);
  },
  beforeDestroy() {
    // 解除监听
    window.removeEventListener('resize', this.getTableHeight);
  },
  methods: {
    // 尺寸变化自适应
    getTableHeight() {
      this.$nextTick(() => {
        console.log("getTableHeight", window.innerHeight - this.subCount);
        this.tableHeight = window.innerHeight - this.subCount;
      });
    },
  },
};
