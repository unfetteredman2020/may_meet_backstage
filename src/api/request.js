import axios from 'axios'
import { Loading } from 'element-ui';
// import Qs from 'qs'
import router from '@/router/index'
// import  from '@/store/index'
let loading = null

const toLogin = () => {
    router.push({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}
// // console.log('process.env.VUE_APP_BASE_URL', process.env)
const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,sign"
    }
})

api.interceptors.request.use(
    request => {
        // loading = Loading.service({
        //     fullscreen: true,
        //     lock: true,
        //     text: '加载中，请稍后......',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // });
        /**store
         * 全局拦截请求发送前提交的参数
         * 以下代码为示例，在登录状态下，分别对 post 和 get 请求加上 token 参数
         */
        // if (request.method == 'post') {
        //     if (request.data instanceof FormData) {
        //         if (store.getters['token/isLogin']) {
        //             // 如果是 FormData 类型（上传图片）
        //             request.data.append('token', store.state.token.token)
        //         }
        //     } else {
        //         // 带上 token
        //         if (request.data == undefined) {
        //             request.data = {}
        //         }
        //         if (store.getters['token/isLogin']) {
        //             request.data.token = store.state.token.token
        //         }
        //         // request.data = Qs.stringify(request.data)
        //     }
        // } else {
        //     // 带上 token
        //     if (request.params == undefined) {
        //         request.params = {}
        //     }
        //     if (store.getters['token/isLogin']) {
        //         request.params.token = store.state.token.token
        //     }
        // }

        request.headers['sign'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEwMDAwMCwic2lkIjoiRDZGNzk0QUZFQjE5NEMzMjhCMzMyRjVFMDg2MjA0NDYiLCJpYXQiOjE2NTQ2MDcwNzl9.c2Ogf2LVxSI9TDMUGLzsAPF0B5uCAYD6TVu_aT1siEg'
        return request
    }
)

api.interceptors.response.use(
    response => {
        /**
         * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
         * 假设返回数据格式为：{ status: 1, error: '', data: '' }
         * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
         * 请求出错时 error 会返回错误信息
         * 则代码如下
         */
        // if (response.data.status === 1) {
        //     if (response.data.error === '') {
        //         // 请求成功并且没有报错
        //         return Promise.resolve(response.data)
        //     } else {
        //         // 这里做错误提示，如果使用了 element ui 则可以使用 Message 进行提示
        //         // Message.error(options)
        //         return Promise.reject(response.data)
        //     }
        // } else {
        //     toLogin()
        // }
        // this.$nextTick(() => { // 以服务的方式调用的 load =  需要异步关闭
        // loading.close();
        // });
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default api
