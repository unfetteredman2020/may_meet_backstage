export default [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: 'root' */ '@/views/login/index.vue')
    }
]