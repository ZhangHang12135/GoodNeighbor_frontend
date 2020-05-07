export const login = (options) => {
  return {
      phone: '1314',
      name: '张航',
      address: '湖北省武汉市',
      rider: '张航',
      riderPhone: '123124'
  }
}
export const authorization = (options) => {
  let response = {
    code: 200,
    data: {
      token: 'xxx',
      rules: {
        page: {
          layout: true,
          home: true,
          // 组件页
          components: true,
          edit_table: true,
          big_data_table: true,
          // 图标页
          _icon_page: true,
          icon_page: true,
          // 个人博客
          blog: true
        }
      },
      mes: '认证成功'
    }
  }
  return response
}
