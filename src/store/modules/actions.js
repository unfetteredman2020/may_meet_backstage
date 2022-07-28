import { login } from '@/api/userApi.js'
import { getMd5 } from "@/utils/md5";
import { LOGIN_OUT, SET_USERINFO } from '@/store/type';

export default {
  logout({ commit, state }) {
    commit(LOGIN_OUT);
  },
  async login({ commit, state }, userInfo) {
    try {
      const { userid, pwd } = userInfo
      let params = { userid, pwd: getMd5(pwd) }
      const res = await login(params)
      // console.log('res', res)
      if (res && res.errcode === 0) {
        commit(SET_USERINFO, { userInfo: res.data });
        return Promise.resolve()
      } else {
        return Promise.reject(res)
      }
    } catch (error) {
      console.log('error', error)
      return Promise.reject(error)
    }
  }
}