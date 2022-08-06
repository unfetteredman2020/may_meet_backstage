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
export const allPeopleData = data => request.get(`/bbzx/jymk/ywkb/xlnvywsj`,{params: data || {}})

// 业务看板/男女同时在线趋势
export const peopleOnlineTrend = data => request.get(`/bbzx/jymk/ywkb/nvtszxqs?starttime=${data.starttime}&endtime=${data.endtime}`)


// 业务看板/发言次数
export const speakPersonTimes = data => request.get(`/bbzx/jymk/ywkb/fycs?starttime=${data.starttime}&endtime=${data.endtime}`)


// 业务看板/发言人数
export const speakPersonCount = data => request.get(`/bbzx/jymk/ywkb/fyrs?starttime=${data.starttime}&endtime=${data.endtime}`)

// 平台活跃每日数据 
export const platformActiveDayData = data => request.get(`/bbzx/jymk/pthymrsj?starttime=${data.starttime}&endtime=${data.endtime}`)

// 业务看板/嘉宾发言时长统计
export const guestSpeakDuration = data => request.get(`/bbzx/jymk/ywkb/jbfysctj?starttime=${data.starttime}&endtime=${data.endtime}`)
/**
 * 
 * 运营模块
 */

// 各时段注册数
export const registCount = data => request.get(`/bbzx/yymk/gsdzcs?${data}`)

// 每日活跃用户统计 
export const dayActiveUser = data => request.get(`/bbzx/yymk/mrhyyhtj?starttime=${data.starttime}&endtime=${data.endtime}`)


// 注册用户留存率 
export const registRetention = data => request.get(`/bbzx/yymk/zcyhlcl?starttime=${data.starttime}&endtime=${data.endtime}`)

// 注册男用户留存率 
export const manRegistRetention = data => request.get(`/bbzx/yymk/zcnyhlcl?starttime=${data.starttime}&endtime=${data.endtime}`)

// 注册用户留存率 
export const guestRetention = data => request.get(`/bbzx/yymk/jblcl?starttime=${data.starttime}&endtime=${data.endtime}`)

//注册用户登录率
export const registMode =  params => request.get('/bbzx/yymk/zcyhdlfs',{params})

// 付费用户留存率 
export const payUserRetention = params => request.get(`/bbzx/yymk/ffyhlcl`, {params})

/**
 * 产品模块
 */

// 视频、语音通话视频 
export const voiceAndVideoCallData = data => request.get(`/bbzx/cpmk/spyythsj?starttime=${data.starttime}&endtime=${data.endtime}`)

// 男用户任务完成情况 
export const manTaskCompletion = data => request.get(`/bbzx/cpmk/nyhrwwcqk?starttime=${data.starttime}&endtime=${data.endtime}`)

// 动态每日统计表 
export const dynamicDailyStatistics = data => request.get(`/bbzx/cpmk/dtmrtjb?${data}`)

// 女用户任务完成情况 
export const womanTaskCompletion = data => request.get(`/bbzx/cpmk/nvyhrwwcqk?starttime=${data.starttime}&endtime=${data.endtime}`)

// 实名、真人认证数据 
export const realNameAuthenticationData = data => request.get(`/bbzx/cpmk/smzrrzsj?starttime=${data.starttime}&endtime=${data.endtime}`)


// 视频专区接通情况 
export const videoConnectionData = data => request.get(`/bbzx/cpmk/spzqjtqk?starttime=${data.starttime}&endtime=${data.endtime}`)


// 每日赠送金币数据 
export const dailyGiveGoldData = data => request.get(`/bbzx/cpmk/mrzsjbsj?starttime=${data.starttime}&endtime=${data.endtime}`)

// 每日金币数据 
export const dailyGoldData = data => request.get(`/bbzx/cpmk/mrjbsj?starttime=${data.starttime}&endtime=${data.endtime}`)

//***获取媒体列表***
export const getMediaList = () => request.get(`/baseinfo/get_media_id`)

//***获取投放公司列表***
export const getLaunchCompany = (id = null) => request.get(`/baseinfo/get_corp_id`, { params: id || {} })

//***获取投放账户列表***
export const getReleaseAccountList = params => request.get(`/baseinfo/get_corp_account`, { params: params || {} })

//***获取男性推荐数据***
export const getManRecommendData = params => request.get(`/bbzx/cpmk/tjsjnx`, { params: params || {} })

//***获取嘉宾推荐数据***
export const getGuestRecommendData = params => request.get(`/bbzx/cpmk/tjsjjb`, { params: params || {} })

/**
 * 渠道模块
 */

//渠道数据报表
export const promotionReport = params => request.get(`/bbzx/qdmk/qdsjbb`, { params: params || {} })

//每日渠道数据总表
export const dailyChannelDataSum = params => request.get(`/bbzx/qdmk/mrqdzb`, { params: params || {} })

//雅思助手激活统计
export const IELTSAssistantActiveCount = params => request.get(`/bbzx/qdmk/aszsjhtj`, { params: params || {} })

//每日渠道消耗排名
export const dailyChannelConsumRanking = params => request.get(`/bbzx/qdmk/mrqdxhpm`, { params: params || {} })

//用户聊天情况
export const userChatState = params => request.get(`/bbzx/qdmk/yhltqk`, { params: params || {} })
