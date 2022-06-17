export default {
  logout ({ commit, state }, data) {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userSign')
  }
}