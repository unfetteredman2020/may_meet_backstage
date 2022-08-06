import axios from 'axios'
import { Loading } from 'element-ui';
import router from '@/router/index'
import store from '@/store/index'
// import { LOGIN_OUT } from '@/store/type.js'

let loading = null
let whiteUrl = ['/logon/login_by_userid']

const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,sign"
  }
})

api.interceptors.request.use(
  request => {
    console.log('request', request)
    loading = Loading.service({
      fullscreen: true,
      lock: true,
      text: '加载中，请稍后......',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    if (whiteUrl.indexOf(request.url) !== -1) {
      // console.log('jump')
    } else {
      // console.log('no jump')
      if (store.getters['getSign']) {
        request.headers['sign'] = store.getters['getSign']
      } else {
        return toLogin()
      }
    }

    return request
  }
)

api.interceptors.response.use(
  response => {
    loading.close()
    return response.data
  },
  error => {
    loading.close()
    return Promise.reject(error)
  }
)

export default api
