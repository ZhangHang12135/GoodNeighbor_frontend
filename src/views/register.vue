<template>
  <layout-gn>
    <div class="register-con">
      <Card icon="register-in" title="注册" :bordered="true">
        <div class="form-con">
            <Form ref="registerForm" :model="form" :rules="rules" @keydown.enter.native="handleRegister">
              <FormItem label="手机号" prop="phone">
                <i-input v-model="form.phone" placeholder="请输入手机号">
                </i-input>
              </FormItem>
              <FormItem label="密码" prop="password">
                <i-input type="password" v-model="form.password" placeholder="请输入密码">
                </i-input>
              </FormItem>
              <FormItem label="验证码" prop="validata">
                  <i-input v-model="form.validata" placeholder="请输入验证码">
                    <Button :disabled='valiBoolean' slot="append" style="background: #2db7f5;color:#fff" @click="handleValidate">{{`${!valiBoolean?'发送验证码': validate + 'S'}`}}</Button>
                  </i-input>
              </FormItem>
              <FormItem>
                <Button @click="handleRegister" type="info" size="large" style="width:50%;left:25%;position:absolute;">注册</Button>
              </FormItem>
            </Form>
        </div>
      </Card>
    </div>
  </layout-gn>
</template>
<script>
import LayoutGn from '_c/layout-gn'
import { register, verify } from '@/api/user'
export default {
  name: 'register',
  components: {
    LayoutGn
  },
  data() {
    return {
      validate: 60,
      valiBoolean: false,
      form: {
        phone: '',
        password: '',
        validata: '',
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号', trigger: 'change'}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'change'}
        ],
        validata: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    handleRegister () {
      // 这里的valid是个Boolean，满足规则就是true
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          register(this.form).then((res)=>{
            this.$Message.success('注册成功！')
            this.$router.push({ path: '/login'})
          })
        }
      })
    },
    handleValidate () {
      verify(this.form.phone);
      this.valiBoolean = true;
      let time = 60;
      let timer = setInterval(() => {
        if(time == 1){
          clearInterval(timer);
          this.valiBoolean = false;
        }else{
          time--;
          this.validate = time;
        }
      }, 1000);
    }
  }
}
</script>
<style lang="less" scope>
.register-con{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 370px;
    .form-con{
      padding: 10px 0 0;
    }
}
</style>
