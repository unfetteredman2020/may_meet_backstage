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

//  聊天信息
export const getChatInfo = data => request.get(`/jbgl/zhgl/sjjl/ltxx`, { params: data || {} })

//  通话记录
export const getCallLog = data => request.get(`/jbgl/zhgl/sjjl/thjl`, { params: data || {} })

//  收礼信息
export const getReceiveGift = data => request.get(`/jbgl/zhgl/sjjl/slxx`, { params: data || {} })

//  收益明细
export const incomeDetail = data => request.get(`/jbgl/zhgl/symx`, { params: data || {} })

//  收益明细
export const getwithdrawalRecord = data => request.get(`/jbgl/zhgl/txjl`, { params: data || {} })

/**
 * 女用户列表
 */
 
 //  女用户列表
export const getWomenList = data => request.get(`/jbgl/nyhlb`, { params: data || {} })

// 修改推荐专区权限
export const setRecommendRole = params => request.post('/jbgl/nyhlb/xgtjzqqx', params)
