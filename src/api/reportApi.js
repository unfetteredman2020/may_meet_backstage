/**
 * desc: 报表中心模块API
 */

import request from './request'

/**
 * 经营模块
 */

// 平台经营数据总表
export const sumTableOfPlatformOpration = data => request.get(`/bbzx/jymk/ptjysjzb?starttime=${data.starttime}&endtime=${data.endtime}`)

// 首次付费用户留存
export const firstPayUser = data => request.get(`/bbzx/jymk/scfflc?starttime=${data.starttime}&endtime=${data.endtime}`)
