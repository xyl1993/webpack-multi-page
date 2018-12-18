export const accountAction = { //小程序用户相关接口
  getList:`/account/getList`, //获取所有小程序用户列表
}
export const sysUserAction = {  //系统用户相关接口
  login:'/sysUser/login',  //系统登录
  getList: '/sysUser/getUserByCompanyId', //获取单位下的用户列表
  getMenu: '/sysUser/getMenu', //获取用户权限下的菜单
  getUserByRoleId: '/sysUser/getUserByRoleId', //获取角色下的用户列表
  getUserList: '/sysUser/getUserList', //查询系统用户列表
  createUser: '/sysUser/createUser',    //新增用户
  updateUser: '/sysUser/updateUser',
  deleteUser: '/sysUser/deleteUser',    //删除用户
  sysUser: '/sysUser/sysUser',
  listUserByRoleId: '/sysUser/listUserByRoleId',
  updatePassword: '/sysUser/updatePassword'  //修改密码
}
export const sysRoleAction = { //系统角色相关接口
  allList: '/sysRole/allList', //获取所有角色
  create: '/sysRole/create', //创建一个角色
  delRole: '/sysRole/delete', //删除一个角色
  updateRole: '/sysRole/update', //更新一个角色
  createUserRole:'/sysRole/createUserRole',
  deleteUserRole:'/sysRole/deleteUserRole',
  getRole:'/sysRole/getRole',
  
}
export const sysMenuAction = { //系统菜单相关接口
  create: '/sysMenu/create', //创建菜单
  list: '/sysMenu/list',  //菜单列表
  delete: '/sysMenu/delete', //删除菜单
  update: '/sysMenu/update', //更新菜单
}
export const deviceAction = {
  create: '/device/create',
  list: '/device/list',
  delete: '/device/delete',
  update: '/device/update',
  selectDetail:'/device/selectDetail',
  selectDeviceBase: '/device/selectDeviceBase',
}
export const companyAction = { //单位相关接口
  list: '/company/getList',  //单位列表
  getAllList: '/company/getAllList',  //单位列表
  createCompany:'/company/create',    //新增
  validCompanyCode: '/company/validCompanyCode',  //验证公司编码是否重复
  createDepartment: '/company/createDepartment',  //新增部门
  createRoom: '/company/createRoom',
  deleteCompanyTree: '/company/deleteCompanyTree',
  updateCompany: 'company/updateCompany',
  updateDepartment: 'company/updateDepartment',
  updateRoom: 'company/updateRoom',
  getDepartmentList: 'company/getDepartmentList'
}
export const orgUserAction = { //组织人员相关接口
  list: '/orgUser/list',  
  create: '/orgUser/create',
  update: '/orgUser/update',
  delete: '/orgUser/delete'
}
