import request from './request.js'

/**
 * 推荐人管理
 */

const getRecommendList = data => request.get('/tjrgl/tjrlb', { params: data || {} })