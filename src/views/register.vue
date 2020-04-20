<template>
  <layout-gn>
    <div class="step">
      <Steps :current='current'>
        <Step title="手机注册" icon="ios-phone-portrait"></Step>
        <Step title="基本信息" icon="ios-list-box"></Step>
        <Step title="实名认证" icon="ios-person"></Step>
      </Steps>
    </div>
    <div class="register-con">
      <Card icon="register-in" :title="titles[current]" :bordered="true">
        <div class="form-con">
            <Form ref="registerForm" :model="form" :rules="rules" @keydown.enter.native="handleRegister">
              <template v-if="current==0">
                <FormItem label="手机号" prop="phone">
                  <i-input v-model="form.phone" placeholder="请输入手机号">
                  </i-input>
                </FormItem>
                <FormItem label="密码" prop="password">
                  <i-input type="password" v-model="form.password" placeholder="请输入密码">
                  </i-input>
                </FormItem>
                <FormItem label="验证码" prop="velidata">
                    <i-input v-model="form.velidata" placeholder="请输入验证码">
                      <Button :disabled='valiBoolean' slot="append" style="background: #2db7f5;color:#fff" @click="handleValidate">{{`${!valiBoolean?'发送验证码': validate + 'S'}`}}</Button>
                    </i-input>
                </FormItem>
              </template>
              <template v-if="current==1">
                 <FormItem label="姓名" prop="name">
                  <i-input v-model="form.name">
                  </i-input>
                </FormItem>
                <FormItem label="餐厅地址(社区)" prop="adress">
                  <i-input v-model="form.address">
                  </i-input>
                </FormItem>
                <FormItem label="配送人" prop="rider">
                  <i-input v-model="form.rider">
                  </i-input>
                </FormItem>
                <FormItem label="配送人电话" prop="riderPhone">
                  <i-input v-model="form.riderPhone">
                  </i-input>
                </FormItem>
              </template>
              <template v-if="current==2">
                <FormItem prop="pics">
                  <p>请上传身份证正反面照片</p>
                  <img-upload width='80px' height="80px" :pics='form.pics'></img-upload>
                </FormItem>
              </template>
              <FormItem>
                <Button @click="handleRegister" type="info" size="large" style="width:50%;left:25%;position:absolute;">{{ current==2?'完成':'下一步'}}</Button>
              </FormItem>
            </Form>
        </div>
      </Card>
    </div>
  </layout-gn>
</template>
<script>
import LayoutGn from '_c/layout-gn'
import ImgUpload from '_c/img-upload'
import { register } from '@/api/user'
import { sendVelidata, verify } from '@/api/verify'
export default {
  name: 'register',
  components: {
    LayoutGn,
    ImgUpload
  },
  data () {
    return {
      validate: 60,
      valiBoolean: false,
      current: 0,
      titles: ['手机注册', '基本信息', '实名认证'],
      form: {
        phone: '',
        password: '',
        velidata: '',
        name: '',
        address: '',
        rider: '',
        riderPhone: '',
        pics: []
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'change' }
        ],
        validata: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRegister () {
      // 这里的valid是个Boolean，满足规则就是true
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          if (this.current === 2) {
            register(this.form).then((res) => {
              this.$Message.success('注册成功！')
              this.$router.push({ path: '/login' })
            })
          } else if(this.current === 0){
            console.log(this.form.phone, this.form.velidata)
            verify(this.form.phone, this.form.velidata).then((res)=>{
              this.$Message.success(res)
              this.current++;
            }).catch((err)=>{
                this.$Message.info({
                content: err,
                duration: 5
            });
            })
          } else {
            this.current++;
          }
        }
      })
    },
    handleValidate () {
      sendVelidata(this.form.phone).then((res)=>{
        this.$Message.success(res)
      })
      this.valiBoolean = true
      let time = 60
      let timer = setInterval(() => {
        if (time === 1) {
          clearInterval(timer)
          this.valiBoolean = false
        } else {
          time--
          this.validate = time
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scope>
.step{
    position: absolute;
    left: 20%;
    top: 15%;
    width: 80%;
}
.register-con{
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%,-50%);
    width: 370px;
    .form-con{
      padding: 10px 0 0;
    }
}
</style>
