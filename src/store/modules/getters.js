export default {
  getUserInfo: state => state.storeUserInfo,
  getSign: state => state.storeUserInfo?.sign || null,
  getPermission: state => state.storeUserInfo?.permission || []
}