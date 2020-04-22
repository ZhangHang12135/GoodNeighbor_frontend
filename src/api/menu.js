import axios from './index'
import { baseURL } from '@/config'

export const addMenu = (menuItem, uId) => {
  return axios.request({
    url: baseURL + 'addMenu',
    params: { uId },
    data: menuItem,
    method: 'post'
  })
}

export const getMenuList = (uId) => {
  return axios.request({
    url: baseURL + 'getMenuList',
    params: {
      uId
    },
    method: 'get'
  })
}
