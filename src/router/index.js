import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store/index.js'
import { Message } from 'element-ui'
Vue.use(VueRouter)
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

/**
 * 因为路由有优先级的概念，先定义的会先匹配，而自动注册是依据文件名的排序来遍历的
 * 所以下面这种情况，如果访问 /news/edit ，会指向到 info.vue 页面上
 * a.js   /news/:id   info.vue
 * b.js   /news/edit   edit.vue
 * 为避免这种情况发生，同一模块下的路由必须放在一个路由配置文件里
 * 按上面的例子，news 模块的路由，应该放到一个类似于 news.js 的文件里
 * 至于模块里的路由优先级，可以把 /news/edit 放在 /news/:id 前面，或者把 /news/:id 改成 /news/info/:id 均可
 */
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
    const hasRoles = store.getters.getPermission && store.getters.getPermission.length > 0 ?store.getters.getPermission : null
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
    next()
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
