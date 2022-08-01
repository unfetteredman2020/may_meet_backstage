import request from './request.js'
/**
 * 
 * 内容安全
 */

//投诉管理列表
export const getReportManageList = data => request.get('/nraq/tsgl', { params: data })

// 修改投诉状态
export const changeReportHandle = data => request.post('/nraq/tsgl/xgzt', data)