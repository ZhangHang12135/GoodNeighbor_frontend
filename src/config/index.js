export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://180.76.248.65:7001/api/'
  : 'http://127.0.0.1:7001/api/'
/**
 * @description token在Cookie中存储的天数
 */
export const cookieExpires = 1
