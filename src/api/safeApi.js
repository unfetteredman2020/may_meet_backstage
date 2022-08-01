import request from './request.js'
/**
 * 
 * 内容安全
 */

//投诉管理列表
export const getReportManageList = data => request.get('/nraq/tsgl', { params: data })

// 修改投诉状态
export const changeReportHandle = data => request.post('/nraq/tsgl/xgzt', data)

//语音签名
export const getVoiceSignatureList = data => request.get('/nraq/yyqm', { params: data })

// 修改投诉状态
export const changeVoiceHandle = data => request.post('/nraq/yyqm/sh', data)

