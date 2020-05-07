<template>
  <Layout>
    <Header class="header-wrapper">
        <img src="@/assets/logo.png" alt="" srcset="">
        <p class="right">你的家常菜馆</p>
    </Header>
    <Content class="content-con">
      <div>
        <slot></slot>
      </div>
    </Content>
  </Layout>
</template>
<script>
export default {
  name: 'LayoutGn'
}
</script>
<style lang="less" scope="this api replaced by slot-scope in 2.5.0+">
.header-wrapper{
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
    padding: 0 23px;
    img{
      height: 100%;
    }
    .right{
      float: right;
      height: 100%;
      font-family: cursive;
      color: #b91212;
      font-size: 2rem;
    }
}
</style>
