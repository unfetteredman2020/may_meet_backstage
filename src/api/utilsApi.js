import axios from 'axios'

const baseURL = process.env.VUE_APP_UPLOAD_ALIINFO_URL
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

api.interceptors.request.use(
  request => {
    request.headers['sign'] = '2gvhe78xFcEUCN8X6QaopzelrT8chD4T'
    return request
  }
)

api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export const getALiUploadInfo = () => api.get(`${'/backstage/get_oss_token'}`)