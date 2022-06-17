export default {
  userToken: JSON.parse(localStorage.getItem('userToken')) || {},
  storeUserInfo: JSON.parse(localStorage.getItem('storeUserInfo')) || {},
}