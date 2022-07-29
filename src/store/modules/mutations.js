import { SET_TOKEN, SET_USERINFO, LOGIN_OUT } from '@/store/type.js'

export default {
  [SET_TOKEN](state, params) {
    state.userSign = params.userSign
    localStorage.setItem('userSign', params.userSign)
  },
  [SET_USERINFO](state, params) {
    state.storeUserInfo = params.userInfo
    localStorage.setItem('storeUserInfo', JSON.stringify(params.userInfo))
  },
  [LOGIN_OUT](state, params) {
    localStorage.removeItem('storeUserInfo', JSON.stringify({}))
  }
}