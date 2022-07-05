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

// 每日付费统计
export const dailyPayStatistic = data => request.get(`/bbzx/jymk/mrfftj?starttime=${data.starttime}&endtime=${data.endtime}`)

// 总览看板
export const allBoard = () => request.get(`/bbzx/jymk/zlkb`)

// 业务看板/新老男女业务数据
export const allPeopleData = data => request.get(`/bbzx/jymk/ywkb/xlnvywsj?starttime=${data.starttime}&endtime=${data.endtime}`)

// 业务看板/男女同时在线趋势
export const peopleOnlineTrend = data => request.get(`/bbzx/jymk/ywkb/nvtszxqs?starttime=${data.starttime}&endtime=${data.endtime}`)


// 业务看板/发言次数
export const speakTimes = data => request.get(`/bbzx/jymk/ywkb/fycs?starttime=${data.starttime}&endtime=${data.endtime}`)


// 业务看板/发言人数
export const speakPersonCount = data => request.get(`/bbzx/jymk/ywkb/fycs?starttime=${data.starttime}&endtime=${data.endtime}`)

// 平台活跃每日数据 
export const platformActiveDayData = data => request.get(`/bbzx/jymk/pthymrsj?starttime=${data.starttime}&endtime=${data.endtime}`)

/**
 * 
 * 运营模块
 */

// 各时段注册数
export const registCount = data => request.get(`/bbzx/yymk/gsdzcs?${data}`)

// 每日活跃用户统计 
export const dayActiveUser = data => request.get(`/bbzx/yymk/mrhyyhtj?starttime=${data.starttime}&endtime=${data.endtime}`)
