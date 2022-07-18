import request from './request.js'


//获取推荐团队
export const getRecommendTeam = ()=> request.get('/baseinfo/get_group_list')