import request from './request.js'


//获取推荐团队
export const getRecommendTeam = ()=> request.get('/baseinfo/get_group_list')

//获取运营人员列表
export const getOperatingList = ()=> request.get('/baseinfo/get_service_list')

//获取内部跳转页面列表
export const getJumpPagePath = ()=> request.get('/baseinfo/get_topage_list')


//获取礼物列表
export const getGiftList = ()=> request.get('/baseinfo/get_gift_list')
