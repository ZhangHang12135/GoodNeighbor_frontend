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
import { ChartPie, ChartBar } from '_c/e-charts'
import { getHome } from '@/api/home'
import { getUser } from '@/lib/util'
export default {
  name: 'home',
  components:{
    CountTo,
    ChartPie,
    ChartBar
  },
  data() {
    return {
      infoCardData: [
        { title: '总营业额', count: 0, color: '#2d8cf0' },
        { title: '本月营业额', count: 0, color: '#19be6b' },
        { title: '当日营业额', count: 0, color: '#ed3f14' },
        { title: '菜品总数', count: 0, color: '#E46CBB' },
      ],
      pieData: [
        { value: 32, name: '鱼香肉丝' },
        { value: 27, name: '青椒炒肉' },
        { value: 30, name: '麻婆豆腐' },
        { value: 40, name: '回锅肉' },
        { value: 21, name: '番茄炒鸡蛋' },
      ],
      barData: [
        {date:'4-10', value: '136'},
        {date:'4-11', value: '136'},
        {date:'4-12', value: '136'},
        {date:'4-13', value: '136'},
        {date:'4-14', value: '136'},
        {date:'4-15', value: '136'},
        {date:'4-16', value: '136'}
      ]
    }
  },
  computed: {
    user () {
      return getUser()
    }
  },
  created () {
    getHome(this.user.uId).then(res=>{
      this.infoCardData.forEach((item,index) => {
        item.count = res.sales[index];
      })
      this.pieData = res.menuData || []
      this.barData = res.SevenDaysSales || []
    })
  }
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

