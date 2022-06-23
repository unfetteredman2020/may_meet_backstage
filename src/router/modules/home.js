export default [
  {
    name: '首页',
    path: '/',
    component: () => import(/* webpackChunkName: 'root' */ '@/views/home/index.vue'),
    children: [
      {
        path: "/userManage",
        name: "用户管理",
        component: () => import(/* webpackChunkName: 'root' */ '@/views/userManage/index.vue'),
        children: [
          {
            path: "/userGeneral",
            name: "综合管理",
            component: () => import(/* webpackChunkName: 'root' */ '@/views/userManage/components/userGeneral.vue')
          },
          {
            path: "user_withdraw",
            name: "综合管理",
            component: () => import(/* webpackChunkName: 'root' */ '@/views/userManage/components/user_withdraw.vue')
          },
          {
            path: "userAwardPunish",
            name: "综合管理",
            component: () => import(/* webpackChunkName: 'root' */ '@/views/userManage/components/userAwardPunish.vue')
          },
          {
            path: "userRefund",
            name: "综合管理",
            component: () => import(/* webpackChunkName: 'root' */ '@/views/userManage/components/userRefund.vue')
          },
          { path: '/', redirect: '/userGeneral' }
        ]

      },
      {
        path: "/guestManage",
        name: "嘉宾管理",
        component: () => import(/* webpackChunkName: 'root' */ '@/views/guestManage/index.vue'),


      },
      {
        path: "/projectSetting",
        name: "产品配置",
        component: () => import(/* webpackChunkName: 'root' */ '@/views/projectSetting/index.vue')

      },
      {
        path: "/contentSafe",
        name: "内容安全",
        component: () => import(/* webpackChunkName: 'root' */ '@/views/contentSafe/index.vue')

      },
      {
        path: "/channelManage",
        name: "渠道管理",
        component: () => import(/* webpackChunkName: 'root' */ '@/views/channelManage/index.vue')

      },
      {
        path: "/reportCenter",
        name: "报表中心",
        component: () => import(/* webpackChunkName: 'root' */ '@/views/reportCenter/index.vue'),
      },
      {
        path: "/systemSetting",
        name: "系统管理",
        component: () => import(/* webpackChunkName: 'root' */ '@/views/systemSetting/index.vue')

      },
      { path: '', redirect: '/userManage' }
    ]
  },

]