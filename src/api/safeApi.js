import request from './request.js'

export const getReportManageList = data => request.get('/nraq/tsgl', { params: data })