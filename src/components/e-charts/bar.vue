<template>
  <div v-if="JSON.stringify(value) == '{}'" style="text-align:center"><h3>暂无销售数据</h3></div>
  <div v-else ref="dom" class="chart"></div>
</template>
<script>
import echarts from 'echarts'
import { handleOn, handleOff } from '@/lib/tools'
export default {
  name: 'ChartBar',
  data() {
    return {
      dom: null
    }
  },
  props: {
    value: Array,
    text: String,
    subText: {
      type: String,
      default: ''
    }
  },
  watch:{
    value(){
      this.draw();
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    draw () {
      // 横坐标
      let xAxisData = this.value.map(item => item.date)
      // 对应值
      let seriesData = this.value.map(item => item.value)
      let option = {
        title : {
            text: this.text,
            subtext: this.subtext,
            x:'center'
        },
        tooltip : {
            trigger: 'axis',
            formatter: "{b} : {c}"
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series : [{
          data: seriesData,
          type: 'bar',
          itemStyle: {
            normal: {
              color: function (params) {
                let colorList = ['#2d8cf0', '#ff9900','#19be6b','#ed3f14','#E46CBB','#9A66E4','#b91212']
                return colorList[params.dataIndex]
              }
            }
          }
      }]
      }
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
    }
  },
  mounted () {
    this.$nextTick(() =>{
      this.draw();
      handleOn(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    handleOff(window, 'resize', this.resize)
  }
}
</script>
<style lang="less">
.chart{
  width: 100%;
  height: 100%;
}
</style>

