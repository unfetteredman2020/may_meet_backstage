import request from './request.js'

/**
 * 
 * description：推荐人管理 
 *  
 */

// 推荐人列表
export const getRecommendList = data => request.get('/tjrgl/tjrlb', {params: data || {}})


// 推荐人状态
export const changeStatus = data => request.post('/tjrgl/tjrlb/xgtdzt', data)

// 收益记录
export const getRevenueRecord = data => request.get('/tjrgl/tjtdsy/syjl', {params: data || {}})

// 获取结算记录
export const getSettlementRecord = data => request.get('/tjrgl/tjtdsy/jsjl', {params: data || {}})

// 运营数据
export const getOperateData = data => request.get('/tjrgl/yysj', {params: data || {}})

// 运营关系
export const getOperateRelationship = data => request.get('/tjrgl/yygx', {params: data || {}})
