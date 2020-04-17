<template>
  <div>
    <info-card v-for="(item, index) in menus" :key="index"
    :title="item.title"
    :pic="item.pic"
    :price="item.price"
    :desc="item.desc"></info-card>
  </div>
</template>
<script>
import infoCard from '_c/info-card'
import { getMenuList } from '@/api/menu'
export default {
  components: { infoCard },
  data () {
    return {
      menus: []
    }
  },
  created () {
    getMenuList().then((res) => {
      this.menus = res.data;
    }).catch((err)=>{
      console.log('获取菜单列表失败')
    })
  }
}
</script>
