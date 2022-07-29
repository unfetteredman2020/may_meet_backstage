import store from '@/store/index'
export const hasPermission = data => {
  // console.log('data', data)
  let temp = []
  let permission = store?.getters?.getUserInfo?.permission || []
  console.log('permission', permission)
  data.forEach(item => {
    if(permission.indexOf(item.meta.id) !== -1) {
      temp.push(item)
    }
  })
  // console.log('temp', temp)
  return temp
}