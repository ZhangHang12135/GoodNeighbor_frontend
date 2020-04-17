// 路由
import Main from '@/views/layout.vue'

export const routes = [
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/register',
    meta: {
      title: '注册'
    },
    component: () => import('@/views/register.vue')
  },
  {
    path: '/forgetPwd',
    meta: {
      title: '找回密码'
    },
    component: () => import('@/views/forget-pwd.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'ios-home'
        },
        component: () => import('@/views/home.vue')
      }
    ]
  },
  {
    path: '/menu',
    name: 'menu',
    component: Main,
    meta: {
      title: '菜品管理',
      icon: 'ios-paper'
    },
    children: [
      {
        path: 'add-menu',
        name: 'add-menu',
        meta: {
          title: '新增菜品',
          icon: 'md-add-circle'
        },
        component: () => import('@/views/menu/add-menu.vue')
      },
      {
        path: 'menu-list',
        name: 'menu-list',
        meta: {
          title: '所有菜品',
          icon: 'ios-apps'
        },
        component: () => import('@/views/menu/menu-list.vue')
      }
    ]
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'user-center',
        name: 'usercenter',
        meta: {
          title: '个人中心',
          icon: 'ios-person'
        },
        component: () => import('@/views/user-center.vue')
      }
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error-page/404.vue')
  }
]
