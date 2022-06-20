import request from './request'

// 用户登录
export const login = data => request.post('/login_by_userid', data)

// 用户登录
export const signLogin = () => request.post('/logon/login_by_sign')

//获取-综合信息
export const getAllInfo = userid => request.get(`/yhgl/zhgl/zhxx?userid=${userid}`)

//获取-充值记录
export const getRechargeRecord = data => request.get(`/yhgl/zhgl/czjl?${data}`)

//获取-消费记录
export const getConsumeRecord = data => request.get(`/yhgl/zhgl/xfjl?${data}`)

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