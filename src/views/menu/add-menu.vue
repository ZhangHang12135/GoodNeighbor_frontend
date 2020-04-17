<template>
    <div>
      <Card title="添加菜品" :bordered="true" class="addmenu-body">
        <div class="form-con">
            <Form ref="addMenuForm" :model="form" :rules="rules" @keydown.enter.native="handleAddMenu">
              <FormItem label="菜品名称" prop="name">
                <i-input v-model="form.name" placeholder="请输入菜名">
                </i-input>
              </FormItem>
              <FormItem label="菜品价格" prop="price">
                <i-input type="number" v-model="form.price" value='5'>
                  <span slot="append">￥</span>
                </i-input>
              </FormItem>
              <FormItem label="菜品描述" prop="desc">
                <i-input type="textarea" v-model="form.desc" placeholder="一句话描述你的菜品">
                </i-input>
              </FormItem>
              <FormItem label="菜品图片" prop="pics">
                <img-upload :pics='form.pics'></img-upload>
              </FormItem>
              <FormItem>
                <Button @click="handleAddMenu" type="info" size="large" style="width:50%;left:25%;position:absolute;">完成</Button>
              </FormItem>
            </Form>
        </div>
      </Card>
    </div>
</template>
<script>
import imgUpload from '_c/img-upload'
import { addMenu } from '@/api/menu'
export default {
  components: { imgUpload },
  data () {
    return {
      form: {
        name: '',
        desc: '',
        price: '',
        pics: []
      },
      rules: {
        name: [
          { required: true, message: '菜名不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '价格不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAddMenu () {
      this.$refs.addMenuForm.validate((valid) => {
        if (valid) {
          addMenu(this.form).then((res) => {
            this.$Message.success('添加成功')
            this.$router.push({ name: 'menu-list' })
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
  .addmenu-body{
      left: 50%;
      transform: translateX(-50%);
      width: 470px;
      background-color: #fff;
      .form-con{
        padding: 10px 0 0;
      }
    }

</style>
