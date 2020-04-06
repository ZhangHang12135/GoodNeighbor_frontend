<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit" style="background: transparent;">
    <FormItem prop="phone">
      <i-input v-model="form.phone" placeholder="请输入手机号">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="info" style="margin-left: 10%;">登录</Button>
      <Button @click="handleRegister" type="info" style="float:right;margin-right: 10%;">注册</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        phone: '',
        password: ''
      }
    }
  },
  props: {
    phoneRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true, message: '账号不能为空', trigger: 'blur'
          }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true, message: '密码不能为空', trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    rules () {
      return {
        phone: this.phoneRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      // 这里的valid是个Boolean，满足规则就是true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            phone: this.form.phone,
            password: this.form.password
          })
        }
      })
    },
    handleRegister () {
      this.$router.push({ path: '/register'})
    }
  }
}
</script>
<style lang="less" scope>

</style>


