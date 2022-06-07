export default [
    {
        path: '/',
        component: () => import(/* webpackChunkName: 'root' */ '@/views/home/index.vue')
    },
]