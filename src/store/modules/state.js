export default {
  userSign: JSON.parse(localStorage.getItem('userSign')) || {},
  storeUserInfo: JSON.parse(localStorage.getItem('storeUserInfo')) || {},
}