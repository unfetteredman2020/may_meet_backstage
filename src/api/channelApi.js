import request from './request.js'

/**
 * 
 * descript: 渠道管理
 *  
 */

// 渠道列表
export const getChannelList = data => request.get('/qdgl/qdlb', { params: data || {} })

//添加渠道
export const addChannel = data => request.post('/qdgl/qdlb/tjqd', data)

//编辑渠道
export const editChannel = data => request.post('/qdgl/qdlb/bjqd', data)

