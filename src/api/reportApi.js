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

// 新增付费用户留存
export const newPayUser = data => request.get(`/bbzx/jymk/xzffyhlc?starttime=${data.starttime}&endtime=${data.endtime}`)

// 头条安卓新增付费用户
export const headlinesAndroidNewPayUser = data => request.get(`/bbzx/jymk/tt_azxzffyhlc?starttime=${data.starttime}&endtime=${data.endtime}`)


// 快手 安卓新增付费用户
export const kwaiAndroidNewPayUser = data => request.get(`/bbzx/jymk/ks_azxzffyhlc?starttime=${data.starttime}&endtime=${data.endtime}`)

// ios 新增付费用户
export const iosNewPayUser = data => request.get(`/bbzx/jymk/ios_dzffyhlc?starttime=${data.starttime}&endtime=${data.endtime}`)

// 近三日业务数据对比
export const thridDayBusinessCompare = data => request.get(`/bbzx/jymk/jsrywsjdb`)


// 年龄段每日数据
export const ageDailyCompare = data => request.get(`/bbzx/jymk/nldmrsj?starttime=${data.starttime}&endtime=${data.endtime}`)
