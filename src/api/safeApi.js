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

// 修改语音审核状态
export const changeVoiceHandle = data => request.post('/nraq/yyqm/sh', data)

//动态列表
export const getDynamicManageList = data => request.get('/nraq/dtgl', { params: data })

// 修改动态审核状态
export const changeDynamicManageHandle = data => request.post('/nraq/dtgl/sh', data)

//视频审核列表
export const getVideoZoneList = data => request.get('/nraq/spzq', { params: data })

// 修改视频审核状态
export const changeVideoHandle = data => request.post('/nraq/spzq/sh', data)

