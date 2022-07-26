import request from './request.js'

/**
 * 系统管理  
 */

// 获取角色管理列表
export const getRoleList = data => request.get('/xtgl/jsgl/', { params: data || {} })

// 编辑角色
export const editRole = data => request.post('/xtgl/jsgl/bjjs', data)

// 编辑角色
export const addRole = data => request.post('/xtgl/jsgl/xzjs', data)

// 获取角色权限
export const getPermissions = data => request.get('/xtgl/jsgl/hqqx', { params: data || {} })

// 编辑角色权限
export const changePermission = data => request.post('/xtgl/jsgl/bjqx', data)


// 获取角色权限
export const getBackStageAccountManage = data => request.get('/xtgl/htzhgl', { params: data || {} })

/**
 * 
 * 后台账号管理
 */

// 编辑账号
export const editAccounts = data => request.post('/xtgl/htzhgl/bjzh', data)

// 编辑账号权限 
export const editAccountsPermission = data => request.post('/xtgl/htzhgl/bjqx', data)

// 编辑账号权限
export const addCount = data => request.post('/xtgl/htzhgl/cjzh', data)


// 获取账号权限
export const getAccountPermission = data => request.get('/xtgl/htzhgl/hqqx', { params: data || {} })
