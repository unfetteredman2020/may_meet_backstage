import request from './request.js'


//获取推荐团队
export const getRecommendTeam = ()=> request.get('/baseinfo/get_group_list')

//获取运营人员列表
export const getOperatingList = ()=> request.get('/baseinfo/get_service_list')