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
          icon: 'A'
        },
        component: () => import('@/views/home.vue')
      }
    ]
  },
  {
    path: 'menu',
    name: 'menu',
    meta: {
      title: '菜品管理',
      icon: 'A'
    },
    component: () => import('@/views/menu.vue')
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
