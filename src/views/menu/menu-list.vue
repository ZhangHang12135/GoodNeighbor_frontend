<template>
  <div>
    <info-card v-for="(item, index) in menus" :key="index"
    :title="item.name"
    :pic="item.pic"
    :price="item.price"
    :desc="item.desc"></info-card>
  </div>
</template>
<script>
import infoCard from '_c/info-card'
import { getMenuList } from '@/api/menu'
import { getUser } from '@/lib/util'
export default {
  components: { infoCard },
  data () {
    return {
      menus: []
    }
  },
  computed: {
    user () {
      return getUser();
    }
  },
  created () {
    getMenuList(this.user.uId).then((res) => {
      this.menus = res;
    }).catch((err)=>{
      this.$Message.error('获取数据失败')
    })
  }
}
</script>
