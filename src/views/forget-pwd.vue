<template>
  <layout-gn>
    <div class="step">
      <Steps :current='current'>
        <Step title="身份验证" icon="ios-person"></Step>
        <Step title="重置密码" icon="ios-key"></Step>
      </Steps>
    </div>
    <div class="forget-con">
      <Card icon="register-in" title="密码重置" :bordered="true">
        <div class="form-con">
            <Form ref="forgetForm" :model="form" :rules="rules" @keydown.enter.native="handleNext">
              <FormItem label="手机号" prop="phone" v-if="!next">
                <i-input v-model="form.phone" placeholder="请输入手机号">
                </i-input>
              </FormItem>
              <FormItem label="验证码" prop="validata" v-if="!next">
                  <i-input v-model="form.validata" placeholder="请输入验证码">
                    <Button :disabled='valiBoolean' slot="append" style="background: #2db7f5;color:#fff" @click="handleValidate">{{`${!valiBoolean?'发送验证码': validate + 'S'}`}}</Button>
                  </i-input>
              </FormItem>
              <FormItem v-if="!next">
                <Button @click="handleNext" type="info" size="large" style="width:50%;left:25%;position:absolute;">下一步</Button>
              </FormItem>
              <FormItem label="新密码" prop="password" v-if="next" key="newPassword">
                <i-input type="password" v-model="form.password" placeholder="请输入密码">
                </i-input>
              </FormItem>
              <FormItem v-if="next">
                <Button @click="handleNext" type="info" size="large" style="width:50%;left:25%;position:absolute;">完成</Button>
              </FormItem>
            </Form>
        </div>
      </Card>
    </div>
  </layout-gn>
</template>
<script>
import LayoutGn from '_c/layout-gn'
import { verify } from '@/api/user'
export default {
  name: 'ForgetPwd',
  components: { LayoutGn },
  data() {
    return {
      current: 0,
      validate: 60,
      valiBoolean: false,
      next: false, //false 表示第一步
      form: {
        phone: '',
        password: '',
        validata: ''
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
  methods: {
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
    },
    handleNext () {
      this.$refs.forgetForm.validate((valid) => {
        if (valid) {
          if(this.next){
            this.$Message.success('密码重置成功');
            this.$router.push({path: '/login'})
          }
          this.current = 1;
          this.next = true;
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.step{
    position: absolute;
    left: 27%;
    top: 20%;
    width: 80%;
}
.forget-con{
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
