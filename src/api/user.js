import axios from './index'
import { baseURL } from '@/config'
export const login = ({ phone, password }) => {
  return axios.request({
    url: baseURL + 'login',
    data: {
      phone,
      password
    },
    method: 'post'
  })
}

export const register = (form) => {
  return axios.request({
    url: baseURL + 'register',
    data: form,
    method: 'post'
  })
}

export const verify = (phone) => {
  return axios.request({
    url: baseURL + 'verify',
    params:{
      phone: phone
    },
    method: 'get'
  })
}
