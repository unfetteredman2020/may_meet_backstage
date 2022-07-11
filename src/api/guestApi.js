import request from './request.js'

/**
 * 综合管理 
 */

//渠道数据报表
export const getGuestAllInfo = params => request.get(`/jbgl/zhgl/jbzhxx`, { params: params || {} })

// 修改资料
export const chageGuestInfo = params => request.post('/jbgl/zhgl/jbzhxx/xgzl', params)

// 修改推荐人
export const chageRecommend = params => request.post('/jbgl/zhgl/jbzhxx/xgtjr', params)

// 修改嘉宾分成
export const chageGuestShare = params => request.post('/jbgl/zhgl/jbzhxx/xgjbfc', params)