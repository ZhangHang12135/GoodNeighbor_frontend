<template>
  <div class="user-info">
    <p>姓名：{{ user.name }}</p>
    <p>手机号：{{ user.phone }}</p>
    <p>地址：{{ user.address }}</p>
    <p>配送人：{{ user.rider }}</p>
    <p>配送人手机号：{{ user.riderPhone}}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }
}
</script>

<style lang="less" scope>
.user-info{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5em;
  p{
    margin: 20px;
  }
}
</style>
