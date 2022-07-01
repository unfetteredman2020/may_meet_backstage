/*
  echarts组件封装
  id:元素id ，唯一
  chartStyle:容器样式
  colors:颜色
  legendData:图例
  seriesData:所需数据
  xData:X轴显示的数据
  yData:Y轴显示的数据
*/
export default {
  props: {
    // 此处id切记不可传重复
    id: {
      type: String,
      default: ()=> String(new Date())
    },
    width: {
      type: String,
      default:() => '700px'
    },
    legend: {
      type: Object,
      default: ()=> {}
    },
    series: {
      type: Array,
      default: ()=> []
    },
    yAxis: {
      type: Object,
      default: ()=> {}
    },
    xAxis: {
      type: Object,
      default: ()=> {}
    },
    downloadData: {
      type: Object,
      default: ()=> {}
    },
    formatter: {
      type: Function,
      default: ()=> new Function()
    }
  },
  data() {
    return {
      chartsDom: null,
      option: null
    };
  },
  watch: {
    // 监听 series变化
    series: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            if (this.chartsDom) {
              console.log('先销毁，释放内存')
              // 先销毁，释放内存
              this.chartsDom.dispose();
            }
            console.log('先销毁，释放内存',newVal)
            this.init();
          });
        }
      },
      
      deep: true, // 对象内部属性的监听，关键。
    },
  },
  mounted() {
    // 部分暂时隐藏的 chart图，在显示的时候监听不到 seriesData的变化，需由 mounted来调用
    this.$nextTick(() => {
      if (this.chartsDom) {
        // 先销毁，释放内存
        this.chartsDom.dispose();
      }
      this.init();
    });
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    // 解除监听
    window.removeEventListener('resize', this.resize);
    // 销毁 echart实例
    if (this.chartsDom) {
      this.chartsDom.dispose();
    }
  },
  methods: {
    // 尺寸变化自适应
    resize() {
      this.chartsDom.resize();
    },
  },
};
