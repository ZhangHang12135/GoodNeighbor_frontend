<template>
  <div>
    <transition-group name="fade">
    <div v-for="(item, index) in pics"
    :key="`${item.slice(-20)}`"
    class="img-item"
    :style="{ width: width, height: height, lineHeight: height }">
      <img :src="item" alt=""/>
      <div class="img-cover">
        <Icon type="ios-trash" @click="handleRemove(index)"/>
      </div>
    </div>
    </transition-group>
    <div class="img-item" :style="{ width: width, height: height, cursor: 'pointer' }">
      <input type="file" accept="image/*" name="file" id="file" @change="handleFileUpload"/>
      <label for="file"><Icon type="ios-add" :style="iconClass"/></label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  model: {
    prop: 'pics',
    event: 'change'
  },
  props: {
    width: {
      type: String,
      default: '130px'
    },
    height: {
      type: String,
      default: '130px'
    },
    pics: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    iconClass() {
      return {
        fontSize: parseInt(this.width) * 0.6 + 'px',
        color: '#aaa',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer'
      }
    }
  },
  methods: {
    /**
     * 图片转存base64字符串并回显
     */
    handleFileUpload (e) {
      let imgFile = e.target.files[0];
      if(imgFile){
        let reader = new FileReader();
        reader.onload = (event) => {
          let txt = event.target.result;
          this.pics.push(txt);
          this.$emit('change', this.pics);
        }
        reader.readAsDataURL(imgFile);
        // 每次添加文件索引之后，置空，可以重复上传同一张图片
        e.target.value = null;
      }
    },
    handleRemove (index) {
      this.pics.splice(index, 1);
      this.$emit('change', this.pics);
    }

  }
}
</script>

<style scoped>
.img-item {
  display: inline-block;
  border: 1px solid #EBEEF5;
  border-radius: 5%;
  margin-right: 5px;
  position: relative;
  text-align: center;
}
.img-item img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-item:hover {
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
}
.img-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.img-item:hover .img-cover {
  display: block;
}
.img-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
[type='file'] {
  position: absolute;
  visibility: hidden;
}
.fade-enter-active, .fade-leave-active{
  transition: all .5s;
}
.fade-enter {
  opacity: 0;
  transform: translate3d(0, -30%, 0);
}
.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30%, 0);
}
</style>
