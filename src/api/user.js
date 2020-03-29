import axios from './index'

export const login = ({ userName, password }) => {
  return axios.request({
    url: 'http://192.168.0.105:7001/login',
    data: {
      userName,
      password
    },
    method: 'post'
  })
}

export const authorization = () => {
  return axios.request({
    url: 'http://192.168.0.105:7001/authorization',
    method: 'get'
  })
}

export const getUserInfo = (token) => {
  console.log('发送请求')
  return axios.request({
    url: 'http://192.168.0.105:7001/getUserInfo',
    params: {
      token
    },
    method: 'get'
  })
}
