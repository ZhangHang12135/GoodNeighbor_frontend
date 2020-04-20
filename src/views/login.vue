<template>
  <div class="login">
    <layout-gn></layout-gn>
      <div class="login-con">
        <Card title="登录" :bordered="true">
          <div class="form-con">
            <login-form @on-success-valid="handleSubmit"></login-form>
            <div class="login-tip"><router-link to="/forgetPwd">忘记密码？</router-link></div>
          </div>
        </Card>
      </div>
  </div>

</template>
<script>
import LoginForm from '_c/login-form'
import LayoutGn from '_c/layout-gn'
import { mapActions } from 'vuex'
import store from '@/store'
export default {
  name: 'login_page',
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  components: {
    LoginForm,
    LayoutGn
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    handleSubmit ({phone, password}) {
      this.login({phone, password}).then(res => {
          this.$router.push({
            name: 'home'
        })
      }).catch((err)=>{
        this.$Message.error(err)
      })
    }
  }
}
</script>
<style lang="less">
.login{
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/cover3.png');
  background-size: cover;
  position: relative;
  &-con{
    position: absolute;
    left: 80%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 300px;
    &-header{
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con{
      padding: 10px 0 0;
    }
    .login-tip{
      font-size: 10px;
      text-align: center;
      color: black;
    }
  }
}
.ivu-card{
  background: transparent;
}
</style>


