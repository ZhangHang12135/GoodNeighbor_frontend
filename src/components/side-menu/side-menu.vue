<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      ref="menu"
      v-show="!collapsed"
      width="auto"
      theme="light"
      :active-name="$route.name"
      :open-names="openNames"
      @on-select="handleSelect">
      <template v-for="item in list">
        <re-submenu
        v-if=" item.children && item.children.length > 1"
        :key="`menu_${item.name}`"
        :name="item.name"
        :parent="item">
        </re-submenu>
        <menu-item
        v-else-if="item.children && item.children.length === 1"
        :key="`menu_${item.children[0].name}`"
        :name="item.children[0].name">
        <Icon :size="20" :type="item.children[0].meta.icon"></Icon>
        {{ item.children[0].meta.title }}
        </menu-item>
        <menu-item
        v-else
        :key="`menu_${item.name}`"
        :name="item.name">
        <Icon :size="20" :type="item.meta.icon"></Icon>
        {{ item.meta.title }}
        </menu-item>
      </template>
    </Menu>
    <div v-show="collapsed" class="drop-wrapper">
      <template v-for="item in list">
        <re-dropdown
        @on-select="handleSelect"
        v-if="item.children && item.children.length > 1"
        :show-title="false"
        :key="`drop_${item.name}`"
        :parent="item">
        </re-dropdown>
        <Tooltip
        v-else-if="item.children && item.children.length === 1"
        transfer
        :content="item.children[0].meta.title"
        placement="right"
        :key="`drop_${item.children[0].name}`">
          <span @click="handleClick(item.children[0].name)" class="drop-menu-span">
            <Icon :size="20" :type="item.children[0].meta.icon"></Icon>
          </span>
        </Tooltip>
        <Tooltip
        v-else
        transfer
        :content="item.meta.title"
        placement="right"
        :key="`drop_${item.name}`">
          <span @click="handleClick(item.name)" class="drop-menu-span">
            <Icon :size="20" :type="item.meta.icon"></Icon>
          </span>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import ReSubmenu from './re-submenu.vue'
import ReDropdown from './re-dropdown.vue'
import { mapState } from 'vuex'
import { getOpenArrByName } from '@/lib/util'
export default {
  name: 'SideMenu',
  components: {
    ReSubmenu,
    ReDropdown
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelect (name) {
      this.$router.push({ name })
    },
    handleClick (name) {
      this.$router.push({ name })
    }
  },
  computed: {
    ...mapState({
      routers: state => state.router.routers
    }),
    openNames () {
      return getOpenArrByName(this.$route.name, this.routers)
    }
  },
  watch: {
    openNames () {
      this.$nextTick(() => {
        // updateOpened是iview中Menu的事件，配合open-name使用
        this.$refs.menu.updateOpened()
      })
    }
  }
}
</script>
<style lang="less">
.side-menu-wrapper{
  width: 100%;
  .ivu-tooltip, .drop-menu-span{
    display: block;
    width: 100%;
    text-align: center;
    padding: 5px 0;
  }
  .drop-wrapper > .ivu-dropdown{
    display: block;
    padding: 5px;
    margin: 0 auto;
  }

}
</style>

