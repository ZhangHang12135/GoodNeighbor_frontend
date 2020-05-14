import axios from './index'
import { baseURL } from '@/config'

export const getHome = (uId) => {
  return axios.request({
    url: baseURL + 'getHome',
    params: {
      uId
    },
    method: 'get'
  })
}