import axios from './index'
import { baseURL } from '@/config'

export const addMenu = (menuItem) => {
  return axios.request({
    url: baseURL + 'addMenu',
    data: menuItem,
    method: 'post'
  })
}

export const getMenuList = (uId) => {
  return axios.request({
    url: baseURL + 'getMenuList',
    parms: {
      uId: uId
    },
    method: 'get'
  })
}
