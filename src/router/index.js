import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store/index.js'
import { Message } from 'element-ui'
Vue.use(VueRouter)

const whiteList = ['/login'] // no redirect whitelist
const routes = []
const require_module = require.context('./modules', false, /.js$/)

require_module.keys().forEach(file_name => {
  routes.push(require_module(file_name).default)
})

routes.push({
  path: '*',
  component: () => import('@/views/404/index.vue'),
  meta: {
    title: '找不到页面'
  }
})

const router = new VueRouter({
  routes: routes.flat()
})

// 解决路由在 push/replace 了相同地址报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => console.log('err', err))
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => console.log('err', err))
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title

  const hasSign = store.getters.getSign
  if (hasSign) {

    // determine whether the user has obtained his permission roles through getInfo
    const hasRoles = store.getters.getPermission && store.getters.getPermission.length > 0 ? store.getters.getPermission : null
    if (hasRoles) {
      if (to.meta && to.meta.id) {
        console.log('hasRoles', hasRoles)
        if (hasRoles.indexOf(to.meta.id) !== -1) {
          next()
        } else {
          Message({
            type: 'error',
            message: '你暂无权限访问该页面！'
          })
        }
      } else {
        next()
      }
    } else {
      next('/login')
    }
    NProgress.done()
  } else {
    /* has no token*/
    console.log('whiteList.indexOf(to.path) == -1', whiteList.indexOf(to.path) !== -1)
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
