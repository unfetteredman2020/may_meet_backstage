import request from './request'

// 用户登录
export const login = data => request.post('/login_by_userid', data)

// 用户登录
export const signLogin = () => request.post('/logon/login_by_sign')

//获取-综合信息
export const getAllInfo = data => request.get(`/yhgl/zhgl/zhxx`, { params: data || {} })

//获取-充值记录
export const getRechargeRecord = data => request.get(`/yhgl/zhgl/czjl`, { params: data || {} })

//获取-消费记录
export const getConsumeRecord = data => request.get(`/yhgl/zhgl/xfjl`, { params: data || {} })

//获取-零钱异动
export const getMoneyChange = data => request.get(`/yhgl/zhgl/xfjl?${data}`)

//获取-属性异动
export const getPropsChange = data => request.get(`/yhgl/zhgl/ydjl/sxyd?${data}`)

//获取-全部提现审核状态
export const getAllAuditList = data => request.get(`/yhgl/txsh?${data}`)

// 修改资料
export const changeUserInfo = data => request.post('/yhgl/zhgl/zhxx/xgzl', data)

// 封禁账号
export const lockAccount = data => request.post('/yhgl/zhgl/zhxx/fjzh', data)

// 封禁设备
export const lockDevice = data => request.post('/yhgl/zhgl/zhxx/fjsb', data)

// 封禁私聊
export const lockPrivateChat = data => request.post('/yhgl/zhgl/zhxx/jysl', data)

// 封禁动态
export const lockDynamic = data => request.post('/yhgl/zhgl/zhxx/jfdt', data)

// 封禁提现
export const lockWithdrawal = data => request.post('/yhgl/zhgl/zhxx/fjtx', data)

/**
 * 奖惩管理
 */
//奖励记录
export const getRewardRecord = data => request.get(`/yhgl/jcgl/jljl`, { params: data || {} })

//审核管理
export const getAuditManage = data => request.get(`/yhgl/jcgl/shgl`, { params: data || {} })
// 审核
export const audit = data => request.post('/yhgl/jcgl/shgl/sh', data)

// 添加奖励
export const addReward = data => request.post('/yhgl/jcgl/shgl/wjjl', data)

// 扣除奖励
export const revokeReward = data => request.post('/yhgl/jcgl/shgl/cx', data)

//退款管理列表
export const refundManage = data => request.get(`/yhgl/tkgl`, { params: data || {} })

// 退款审核
export const refundAudit = data => request.post('/yhgl/tkgl/sh', data)

// 创建退款
export const createRefund = data => request.post('/yhgl/tkgl/cjtk', data)
