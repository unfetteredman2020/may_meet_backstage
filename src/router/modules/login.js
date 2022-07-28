export default [

  {
    name: '登录',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import(/* webpackChunkName: 'home/home' */ '@/views/login/index.vue')
  }
]