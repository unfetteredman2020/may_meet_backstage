export default [
  {
    // name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: "/userManage",
        name: "userManage",
        component: () => import(/* webpackChunkName: 'home/userManage' */ '@/views/userManage/index.vue'),
        meta: {
          title: '用户管理'
        },
        children: [
          {
            path: "userGeneral",
            name: "userGeneral",
            component: () => import(/* webpackChunkName: 'home/userManage/userGeneral' */ '@/views/userManage/components/userGeneral.vue'),
            meta: {
              title: '综合管理'
            },
          },
          {
            path: "user_withdraw",
            name: "user_withdraw",
            component: () => import(/* webpackChunkName: 'home/userManage/user_withdraw' */ '@/views/userManage/components/user_withdraw.vue'),
            meta: {
              title: '综合管理'
            },
          },
          {
            path: "userAwardPunish",
            name: "userAwardPunish",
            component: () => import(/* webpackChunkName: 'home/userManage/userAwardPunish' */ '@/views/userManage/components/userAwardPunish.vue'),
            meta: {
              title: '综合管理'
            },
          },
          {
            path: "userRefund",
            name: "userRefund",
            component: () => import(/* webpackChunkName: 'home/userManage/userRefund' */ '@/views/userManage/components/userRefund.vue'),
            meta: {
              title: '综合管理'
            },
          },
          { path: '', redirect: 'userGeneral' }
        ]

      },
      {
        path: "/guestManage",
        name: "guestManage",
        component: () => import(/* webpackChunkName: 'home/guestManage' */ '@/views/guestManage/index.vue'),
        meta: {
          title: '嘉宾管理'
        },
        children: [
          {
            path: 'guestGeneral',
            name: '综合管理',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/guestGeneral.vue'),
            meta: {
              title: '综合管理'
            },
          },
          {
            path: 'listOfWomen',
            name: 'listOfWomen',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/listOfWomen.vue'),
            meta: {
              title: '女用户列表'
            },
          },
          // {
          //   path: 'overview',
          //   name: 'overview',
          //   component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/overview.vue'),
          //   meta: {
          //     title: '概览'
          //   },
          // },
          {
            path: 'listOfAgents',
            name: 'listOfAgents',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/listOfAgents.vue'),
            meta: {
              title: '代理人列表'
            },
          },
          {
            path: 'agentGuest',
            name: 'agentGuest',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/agentGuest.vue'),
            meta: {
              title: '代理人嘉宾'
            },
          },
          {
            path: 'agencyIncome',
            name: 'agencyIncome',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/agencyIncome.vue'),
            meta: {
              title: '代理收益'
            },
          },
          {
            path: 'recommendTeamGuestList',
            name: 'recommendTeamGuestList',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/recommendTeamGuestList.vue'),
            meta: {
              title: '推荐团队嘉宾列表'
            },
          },
          {
            path: 'guestIncome',
            name: 'guestIncome',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/guestIncome.vue'),
            meta: {
              title: '嘉宾收益'
            },
          },
          {
            path: 'activeData',
            name: 'activeData',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/activeData.vue'),
            meta: {
              title: '活跃数据'
            },
          },
          {
            path: 'transferManagement',
            name: 'transferManagement',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/transferManagement.vue'),
            meta: {
              title: '转账管理'
            },
          },
          {
            path: 'violateGuest',
            name: 'violateGuest',
            component: () => import(/* webpackChunkName: 'home/guestManage/guestGeneral' */'@/views/guestManage/components/violateGuest.vue'),
            meta: {
              title: '违规嘉宾'
            },
          },
          { path: '', redirect: 'guestGeneral' }
        ]
      },
      {
        path: "/productConfig",
        name: "productConfig",
        component: () => import(/* webpackChunkName: 'home/productConfig/' */ '@/views/productConfig/index.vue'),
        meta: {
          title: '产品配置'
        },
        children: [
          {
            path: "operateInfo",
            name: "operateInfo",
            component: () => import(/* webpackChunkName: 'home/productConfig/operateInfo' */ '@/views/productConfig/components/operateInfo.vue'),
            meta: {
              title: '运营消息'
            },
          },
          {
            path: "popupConfig",
            name: "popupConfig",
            component: () => import(/* webpackChunkName: 'home/productConfig/popupConfig' */ '@/views/productConfig/components/popupConfig.vue'),
            meta: {
              title: '弹窗配置'
            },
          },
          { path: '', redirect: 'operateInfo' }
        ]
      },
      {
        path: "/recommenderManage",
        name: "recommenderManage",
        component: () => import(/* webpackChunkName: 'home/recommenderManage' */ '@/views/recommenderManage/index.vue'),
        meta: {
          title: '推荐人管理'
        },
        children: [
          {
            path: "recommendList",
            name: "recommendList",
            component: () => import(/* webpackChunkName: 'home/recommenderManage/recommendList' */ '@/views/recommenderManage/components/recommendList.vue'),
            meta: {
              title: '推荐人列表'
            },
          },
          
          {
            path: "recommendTeamIncome",
            name: "recommendTeamIncome",
            component: () => import(/* webpackChunkName: 'home/recommenderManage/recommendTeamIncome' */ '@/views/recommenderManage/components/recommendTeamIncome.vue'),
            meta: {
              title: '推荐团队收益'
            },
          },
          {
            path: "operateRelationship",
            name: "operateRelationship",
            component: () => import(/* webpackChunkName: 'home/recommenderManage/operateRelationship' */ '@/views/recommenderManage/components/operateRelationship.vue'),
            meta: {
              title: '运营关系'
            },
          },
          {
            path: "operateData",
            name: "operateData",
            component: () => import(/* webpackChunkName: 'home/recommenderManage/operateData' */ '@/views/recommenderManage/components/operateData.vue'),
            meta: {
              title: '运营数据'
            },
          },
          { path: '', redirect: 'recommendList' }
        ]
      },
      {
        path: "/contentSafe",
        name: "contentSafe",
        component: () => import(/* webpackChunkName: 'home/contentSafe' */ '@/views/contentSafe/index.vue'),
        meta: {
          title: '内容安全'
        },

      },
      {
        path: "/channelManage",
        name: "channelManage",
        component: () => import(/* webpackChunkName: 'home/channelManage' */ '@/views/channelManage/index.vue'),
        meta: {
          title: '渠道管理'
        },

      },
      {
        path: "/reportCenter",
        name: "reportCenter",
        component: () => import(/* webpackChunkName: 'home/reportCenter' */ '@/views/reportCenter/index.vue'),
        meta: {
          title: '报表中心'
        },
      },
      {
        path: "/systemSetting",
        name: "systemSetting",
        component: () => import(/* webpackChunkName: 'home/systemSetting' */ '@/views/systemSetting/index.vue'),
        meta: {
          title: '系统管理'
        },
      },
      { path: '', redirect: '/userManage' }
    ]
  },

]