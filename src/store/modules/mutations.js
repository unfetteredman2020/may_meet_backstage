import types from '@/store/type.js'
const { SET_TOKEN, SET_USERINFO } = types
export default {
  [SET_TOKEN](state, params) {
    state.userToken = params.userToken
    localStorage.setItem('userToken', params.userToken)
  },
  [SET_USERINFO](state, params) {
    state.userInfo = params.userInfo
    localStorage.setItem('storeUserInfo', JSON.stringify(params.userInfo))
  }
}