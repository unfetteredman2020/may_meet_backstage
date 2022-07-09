import request from './request.js'

/**
 * 综合管理 
 */

//渠道数据报表
export const promotionReport = params => request.get(`/bbzx/qdmk/qdsjbb`, { params: params || {} })
