<template>
  <div>
    {{ user.name }}
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

</style>
