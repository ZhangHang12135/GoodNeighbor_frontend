<template>
  <div class="home-wrapper">
    <Row :gutter="20">
      <i-col :xs="6"  :xl="6"
        v-for="(info, i) in infoCardData" :key="`info-${i}`"
        style="height: 120px;padding-bottom: 10px;">
        <Card style="text-align:center">
          <count-to :end-val="info.count"  usegroup count-class="count-class" :font-color="info.color"></count-to>
          <p>{{info.title}}</p>
        </Card>
        </i-col>
    </Row>
    <Row :gutter="20">
      <i-col :lg="8" :md="24">
        <Card>
          <chart-pie style="height: 300px" :value="pieData" text="菜品销量"></chart-pie>
        </Card>
      </i-col>
      <i-col :lg="16" :md="24">
        <Card>
          <chart-bar style="height: 300px" :value="barData" text="近七天销售额"></chart-bar>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import CountTo from '_c/count-to'
import InfoCard from '_c/info-card'
import { ChartPie, ChartBar } from '_c/e-charts'
export default {
  name: 'home',
  components:{
    CountTo,
    InfoCard,
    ChartPie,
    ChartBar
  },
  data() {
    return {
      infoCardData: [
        { title: '总营业额', count: 1526231, color: '#2d8cf0' },
        { title: '本月营业额', count: 12312, color: '#19be6b' },
        { title: '当日营业额', count: 657, color: '#ed3f14' },
        { title: '菜品总数', count: 5, color: '#E46CBB' },
      ],
      pieData: [
        { value: 32, name: '鱼香肉丝', itemStyle:{ color: '#2d8cf0'} },
        { value: 27, name: '青椒炒肉', itemStyle:{ color: '#ff9900'}  },
        { value: 30, name: '麻婆豆腐', itemStyle:{ color: '#19be6b'}  },
        { value: 40, name: '回锅肉', itemStyle:{ color: '#ed3f14'}  },
        { value: 21, name: '番茄炒鸡蛋', itemStyle:{ color: '#E46CBB'}  },
      ],
      barData: {
        '4-10': '136',
        '4-11': '55',
        '4-12': '123',
        '4-13': '156',
        '4-14': '65',
        '4-15': '85',
        '4-16': '102'
      }
    }
  },
}
</script>
<style lang="less">
.home-wrapper{
  .ivu-row{
    margin-bottom: 10px;
  }
  .count-class{
  font-size: 2vw;
  }
  .card-img{
    height: 100%;
    .ivu-card-body{
      height: 100%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%
      }
    }
  }
}

</style>

