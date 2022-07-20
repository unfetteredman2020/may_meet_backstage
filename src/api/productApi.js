import request from './request.js'

/**
 * 产品配置
 */

// 运营消息/系统消息
export const getSystemInfo = data => request.get('/cppz/yyxx/xtxx', { params: data || {} })

//发布消息
export const publicMsg = data => request.post('/cppz/yyxx/xtxx/fbxx', data)

// 弹窗配置
export const getPopupConfig = data => request.get('/cppz/tcpz', { params: data || {} })

// 弹窗配置
export const createPopup = data => request.post('/cppz/tcpz/xjtc', data)
