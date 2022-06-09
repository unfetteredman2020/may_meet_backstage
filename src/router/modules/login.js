export default [

    {
        name: '登录',
        path: '/login',
        component: () => import(/* webpackChunkName: 'root' */ '@/views/login/index.vue')
    }
]