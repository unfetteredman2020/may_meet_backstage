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

/**
 * 代理人列表
 */

export const getListOfAgents = data => request.get(`/jbgl/dlrlb`, { params: data || {} })

/**
* 代理人嘉宾
*/

export const getAgentGuest = data => request.get(`/jbgl/dlrjb`, { params: data || {} })

/**
* 代理人收益
*/

export const getAgencyIncome = data => request.get(`/jbgl/dlsy`, { params: data || {} })

/**
* 推荐团队嘉宾列表
*/

export const getRecommendTeamGuestList = data => request.get(`/jbgl/tjtdjblb`, { params: data || {} })

/**
* 嘉宾收益
*/

export const getGuestIncome = data => request.get(`/jbgl/jbsy`, { params: data || {} })

/**
* 嘉宾收益
*/

export const getActiveData = data => request.get(`/jbgl/hysj`, { params: data || {} })

/**
* 转账管理
*/

export const getTransferManagement = data => request.get(`/jbgl/zzgl/zzjl`, { params: data || {} })

/**
* 违规嘉宾
*/

export const getViolateGuest = data => request.get(`/jbgl/wgjb`, { params: data || {} })
