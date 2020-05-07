import Mock from 'mockjs'
import { login, authorization } from './response/login'
import { getUserInfo } from './response/user'
import { getTableData, getBigData } from './response/data'

// Mock.setup({
//   timeout: 1000
// })

// 拦截并响应
Mock.mock(/\/login/, 'post', login)
Mock.mock(/\/getUserInfo/, 'get', getUserInfo)
Mock.mock(/\/authorization/, 'get', authorization)
Mock.mock(/\/getTableData/, 'post', getTableData)
Mock.mock(/\/getBigData/, 'post', getBigData)
Mock.mock(/\/register/, 'post', ()=>{
  return {
    data: 'ok'
  }
})
Mock.mock(/\/getMenuList/, 'get', ()=>{
  return {
    data: [
      {title:'1', desc: '123', price: 2},
      {title:'3', desc: '123', price: 2},
      {title:'2', desc: '123', price: 2},
      {title:'1', desc: '123', price: 2}
    ]
  }
})
export default Mock
