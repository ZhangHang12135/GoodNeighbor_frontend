import { routes } from '@/router/router'

/**
 * @description 筛选出可访问页面
 * @param {Object} routes 路由实例列表
 * @param {Object} rules 可访问路由列表
 */
const getAccesRouterList = (routes) => {
  return routes.filter(item => {
    // 这里过滤掉没有name字段的，就把*路由过滤掉了,
    // 这样在路由渲染之前，没有404页面的，就不会先跳到404页面
    // mmp,搞了两天
    if (item.name) {
      if (item.children) item.children = getAccesRouterList(item.children)
      return true
    } else return false
  })
}
const routesState = getAccesRouterList(routes);
// console.log(routesState)
export default {
  state: {
    routers: routesState,
    hasGetRules: false
  },
  mutations: {
    CONCAT_ROUTES (state, routerList) {
      state.routers = []
      state.routers = routerList.concat(routes)
      state.hasGetRules = true
    }
  },
  actions: {
    /**
     * @param { rules } (规则，可访问页面列表)路由权限列表
     */
    concatRoutes ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          let routerList = []
          routerList = getAccesRouterList(routerMap, rules)
          commit('CONCAT_ROUTES', routerList)
          resolve(state.routers)
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
