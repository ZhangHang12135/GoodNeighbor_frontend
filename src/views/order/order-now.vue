<template>
  <Table stripe :columns="columns" :data="data">
    <template slot-scope="{ row }" slot="order_state">
      <Tag :color="colors[row.order_state]">{{ states[row.order_state]}}</Tag>
    </template>
    <template slot-scope="{ row }" slot="option">
        <Button type="primary" size="small" style="margin-right: 5px" @click="next(row)">{{ texts[row.order_state] }}</Button>
    </template>
  </Table>
</template>
<script>
import { getOrderNow, updateOrder } from '@/api/order'
import { getUser } from '@/lib/util'
export default {
  data () {
    return {
      columns: [
        { title: '订单编号', key: 'order_id'},
        { title: '创建时间', key: 'order_date'},
        { title: '顾客姓名', key: 'custom_name'},
        { title: '顾客电话', key: 'custom_phone'},
        { title: '配送地址', key: 'custom_address'},
        { title: '订单内容', key: 'order_menu'},
        { title: '订单金额', key: 'order_price'},
        { title: '订单状态', slot: 'order_state'},
        { title: '操作', slot: 'option'}
      ],
      data: [],
      states: ['未处理','配餐中','配送中'],
      texts: ['接单', '配送', '完成'],
      colors: ['default','#52c41a','#b91212']
    }
  },
  computed: {
    user () {
      return getUser();
    }
  },
  created () {
    getOrderNow(this.user.uId).then(res=>{
      this.data = res;
    })
  },
  methods: {
    next(row) {
      let nextState = row.order_state + 1;
      if(nextState !== 3){
        row.order_state++;//先做视图变化，再更新数据库
        updateOrder(row);
      } else {
        updateOrder({ order_state: nextState, order_id: row.order_id }).then(res => {
          getOrderNow(this.user.uId).then(res=>{
            this.data = res;
          })
        });
      }
    }
  }
}
</script>
<style lang="less" scope>

</style>
