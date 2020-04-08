<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <strong>{{ name }}</strong>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="userCenter">
          个人中心
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'user',
  props:{
    name: {
      type: String,
      default: 'admin'
    }
  },
  methods:{
    ...mapActions([
      'logout'
    ]),
    handlelogout () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定登出？',
        onOk: () => {
          this.logout().then(res => {
            this.$router.push({ path: '/login'})
        })
        }
      })
    },
    userCenter () {
      this.$router.push({ name: 'usercenter'});
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.handlelogout()
          break
        case 'userCenter': this.userCenter()
          break
      }
    }
  }
}
</script>
<style lang="less" scope>
.user{
  &-avatar-dropdown{
    cursor: pointer;
    display: inline-block;
    // height: 64px;
    vertical-align: middle;
    // line-height: 64px;
    .ivu-badge-dot{
      top: 16px;
    }
  }
}
</style>
