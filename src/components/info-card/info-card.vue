<template>
  <Card class="info-card-wrapper" :padding="0" :title="title">
    <p slot="extra" style="color: red">{{ price }} ￥</p>
    <div class="info-content-con">
      <img :src="pic" alt="菜品图片">
      <p>{{ desc }}</p>
    </div>
  </Card>
</template>
<script>
export default {
  name: 'InfoCard',
  props:{
    title: {
      type: String,
      default: '菜名'
    },
    price: {
      type: Number,
      default: 0
    },
    desc: {
      type: String,
      default: '一句话描述菜品'
    },
    pic: {
      type: String,
      default: "http://blog.wyw99.cn/2019/11/28/%E3%80%8Acss%E9%80%89%E6%8B%A9%E5%99%A8%E4%B8%96%E7%95%8C%E3%80%8B%E6%80%BB%E7%BB%93/cover.jpg"
    }
  },
}
</script>
<style lang="less">
.info-card-wrapper{
  overflow: hidden;
  display: inline-block;
  width: 320px;
  margin: 20px;
  padding: 10px;
  img{
    width: 100%;
  }
  .info-content-con{
    p{
      margin: 10px 0;
    }
  }
}
</style>
