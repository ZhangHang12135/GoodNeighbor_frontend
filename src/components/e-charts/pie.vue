<template>
  <div v-if="value.length == 0" style="text-align:center"><h3>暂无菜品</h3></div>
  <div v-else ref="dom" class="chart"></div>
</template>
<script>
import echarts from 'echarts'
import { handleOn, handleOff } from '@/lib/tools'
export default {
  name: 'ChartPie',
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
  methods: {
    resize () {
      if (this.dom) this.dom.resize()
      else console.log('undefind dom')
    },
    draw () {
      // 从value中提取出name
      let lengend = this.value.map(item => item.name)
      let option = {
        title : {
            text: this.text,
            subtext: this.subtext,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: lengend
        },
        series : [
            {
                name: this.text,
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:this.value,
                itemStyle: {
                    normal: {
                      color: function (params) {
                        let colorList = ['#2d8cf0', '#ff9900','#19be6b','#ed3f14','#E46CBB','#9A66E4','#b91212']
                        return colorList[params.dataIndex]
                      }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      }
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
    }
  },
  watch:{
    value(){
      this.draw();
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

