<template>
  <Table stripe :columns="columns" :data="data"></Table>
</template>
<script>
import { getOrderNow } from '@/api/order'
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
        { title: '订单状态', key: 'order_state'}
      ],
      data: []
    }
  },
  computed: {
    user () {
      return getUser();
    }
  },
  created () {
    getOrderNow(this.user.uId).then(res=>{
      this.data = res.map((item)=>{
        item.order_state = item.order_state === 0 ? '处理中...' : '已完成';
        return item;
      });
    })
  }
}
</script>
<style lang="less" scope>

</style>
