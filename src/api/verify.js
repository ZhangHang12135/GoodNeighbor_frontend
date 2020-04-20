import axios from './index'
import { baseURL } from '@/config'

export const sendVelidata = (phone) => {
  return axios.request({
    url: baseURL + 'sendVelidata',
    params:{
      phone: phone
    },
    method: 'get'
  })
}
export const verify = (phone, velidata) => {
  return axios.request({
    url: baseURL + 'verify',
    data: {
      phone: phone,
      velidata: velidata
    },
    method: 'post'
  })
}
