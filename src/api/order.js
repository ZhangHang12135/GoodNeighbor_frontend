import axios from './index'
import { baseURL } from '@/config'

export const getOrderNow = (uId) => {
  return axios.request({
    url: baseURL + 'getOrderNow',
    params: {
      uId
    },
    method: 'get'
  })
}

export const getOrderList = (uId) => {
  return axios.request({
    url: baseURL + 'getOrderList',
    params: {
      uId
    },
    method: 'get'
  })
}
