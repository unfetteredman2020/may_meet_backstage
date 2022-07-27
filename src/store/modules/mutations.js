import { SET_TOKEN, SET_USERINFO }  from '@/store/type.js'

export default {
  [SET_TOKEN](state, params) {
    state.userSign = params.userSign
    localStorage.setItem('userSign', params.userSign)
  },
  [SET_USERINFO](state, params) {
    state.userInfo = params.userInfo
    localStorage.setItem('storeUserInfo', JSON.stringify(params.userInfo))
  }
}