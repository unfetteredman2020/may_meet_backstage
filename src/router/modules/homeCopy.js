export default [
  {
    // name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: 'home/home' */ '@/views/home/index.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: "/userManage",
        name: "userManage",
        component: () => import(/* webpackChunkName: 'home/userManage' */ '@/views/userManage/index.vue'),
        meta: {
          title: '用户管理',
          id: 1
        },
        children: [
          {
            path: "userGeneral",
            name: "userGeneral",
            component: () => import(/* webpackChunkName: 'userManage/userGeneral' */ '@/views/userManage/components/userGeneral.vue'),
            meta: {
              title: '综合管理',
              id: 2
            },
          },
          {
            path: "user_withdraw",
            name: "user_withdraw",
            component: () => import(/* webpackChunkName: 'userManage/user_withdraw' */ '@/views/userManage/components/user_withdraw.vue'),
            meta: {
              title: '提现审核',
              id: 40

            },
          },
          {
            path: "userAwardPunish",
            name: "userAwardPunish",
            component: () => import(/* webpackChunkName: 'userManage/userAwardPunish' */ '@/views/userManage/components/userAwardPunish.vue'),
            meta: {
              title: '奖惩管理',
              id: 48
            },
          },
          {
            path: "userRefund",
            name: "userRefund",
            component: () => import(/* webpackChunkName: 'userManage/userRefund' */ '@/views/userManage/components/userRefund.vue'),
            meta: {
              title: '退款管理',
              id: 65
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
          title: '嘉宾管理',
          id: 79
        },
        children: [
          {
            path: 'guestGeneral',
            name: '综合管理',
            component: () => import(/* webpackChunkName: 'guestManage/guestGeneral' */'@/views/guestManage/components/guestGeneral.vue'),
            meta: {
              title: '综合管理',
              id: 80
            },
          },
          {
            path: 'listOfWomen',
            name: 'listOfWomen',
            component: () => import(/* webpackChunkName: 'guestManage/listOfWomen' */'@/views/guestManage/components/listOfWomen.vue'),
            meta: {
              title: '女用户列表',
              id: 91
            },
          },
          // {
          //   path: 'overview',
          //   name: 'overview',
          //   component: () => import(/* webpackChunkName: 'guestManage/guestGeneral' */'@/views/guestManage/components/overview.vue'),
          //   meta: {
          //     title: '概览'
          //   },
          // },
          {
            path: 'listOfAgents',
            name: 'listOfAgents',
            component: () => import(/* webpackChunkName: 'guestManage/listOfAgents' */'@/views/guestManage/components/listOfAgents.vue'),
            meta: {
              title: '推荐人列表',
              id: 94
            },
          },
          {
            path: 'agentGuest',
            name: 'agentGuest',
            component: () => import(/* webpackChunkName: 'guestManage/agentGuest' */'@/views/guestManage/components/agentGuest.vue'),
            meta: {
              title: '推荐人嘉宾',
              id: 97
            },
          },
          {
            path: 'agencyIncome',
            name: 'agencyIncome',
            component: () => import(/* webpackChunkName: 'guestManage/agencyIncome' */'@/views/guestManage/components/agencyIncome.vue'),
            meta: {
              title: '推荐收益',
              id: 101
            },
          },
          {
            path: 'recommendTeamGuestList',
            name: 'recommendTeamGuestList',
            component: () => import(/* webpackChunkName: 'guestManage/recommendTeamGuestList' */'@/views/guestManage/components/recommendTeamGuestList.vue'),
            meta: {
              title: '推荐团队嘉宾列表',
              id: 102
            },
          },
          {
            path: 'guestIncome',
            name: 'guestIncome',
            component: () => import(/* webpackChunkName: 'guestManage/guestIncome' */'@/views/guestManage/components/guestIncome.vue'),
            meta: {
              title: '嘉宾收益',
              id: 105
            },
          },
          {
            path: 'activeData',
            name: 'activeData',
            component: () => import(/* webpackChunkName: 'guestManage/activeData' */'@/views/guestManage/components/activeData.vue'),
            meta: {
              title: '活跃数据',
              id: 107
            },
          },
          {
            path: 'transferManagement',
            name: 'transferManagement',
            component: () => import(/* webpackChunkName: 'guestManage/transferManagement' */'@/views/guestManage/components/transferManagement.vue'),
            meta: {
              title: '转账管理',
              id: 109
            },
          },
          {
            path: 'violateGuest',
            name: 'violateGuest',
            component: () => import(/* webpackChunkName: 'guestManage/violateGuest' */'@/views/guestManage/components/violateGuest.vue'),
            meta: {
              title: '违规嘉宾',
              id: 114
            },
          },
          { path: '', redirect: 'guestGeneral' }
        ]
      },
      {
        path: "/productConfig",
        name: "productConfig",
        component: () => import(/* webpackChunkName: 'home/productConfig' */ '@/views/productConfig/index.vue'),
        meta: {
          title: '产品配置',
          id: 139
        },
        children: [
          {
            path: "operateInfo",
            name: "operateInfo",
            component: () => import(/* webpackChunkName: 'productConfig/operateInfo' */ '@/views/productConfig/components/operateInfo.vue'),
            meta: {
              title: '运营消息',
              id: 140
            },
          },
          {
            path: "popupConfig",
            name: "popupConfig",
            component: () => import(/* webpackChunkName: 'productConfig/popupConfig' */ '@/views/productConfig/components/popupConfig.vue'),
            meta: {
              title: '弹窗配置',
              id: 181
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
          title: '推荐人管理',
          id: 115
        },
        children: [
          {
            path: "recommendList",
            name: "recommendList",
            component: () => import(/* webpackChunkName: 'recommenderManage/recommendList' */ '@/views/recommenderManage/components/recommendList.vue'),
            meta: {
              title: '推荐人列表',
              id: 116
            },
          },

          {
            path: "recommendTeamIncome",
            name: "recommendTeamIncome",
            component: () => import(/* webpackChunkName: 'recommenderManage/recommendTeamIncome' */ '@/views/recommenderManage/components/recommendTeamIncome.vue'),
            meta: {
              title: '推荐团队收益',
              id: 123
            },
          },
          {
            path: "operateRelationship",
            name: "operateRelationship",
            component: () => import(/* webpackChunkName: 'recommenderManage/operateRelationship' */ '@/views/recommenderManage/components/operateRelationship.vue'),
            meta: {
              title: '运营关系',
              id: 136
            },
          },
          {
            path: "operateData",
            name: "operateData",
            component: () => import(/* webpackChunkName: 'recommenderManage/operateData' */ '@/views/recommenderManage/components/operateData.vue'),
            meta: {
              title: '运营数据',
              id: 134
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
          title: '内容安全',
          id: 186
        },
        children: [
          {
            path: "reportManage",
            name: "reportCenter",
            component: () => import(/* webpackChunkName: 'contentSafe/reportManage' */ '@/views/contentSafe/components/reportManage.vue'),
            meta: {
              title: '举报管理',
              id: 216
            },
          },
          {
            path: "voiceSignature",
            name: "voiceSignature",
            component: () => import(/* webpackChunkName: 'contentSafe/voiceSignature' */ '@/views/contentSafe/components/voiceSignature.vue'),
            meta: {
              title: '语音签名',
              id: 216
            },
          },
          {
            path: "dynamicManage",
            name: "dynamicManage",
            component: () => import(/* webpackChunkName: 'contentSafe/dynamicManage' */ '@/views/contentSafe/components/dynamicManage.vue'),
            meta: {
              title: '动态管理',
              id: 216
            },
          },
          {
            path: "videoZone",
            name: "videoZone",
            component: () => import(/* webpackChunkName: 'contentSafe/videoZone' */ '@/views/contentSafe/components/videoZone.vue'),
            meta: {
              title: '视频专区',
              id: 216
            },
          },
          {
            path: "quickReply",
            name: "quickReply",
            component: () => import(/* webpackChunkName: 'contentSafe/quickReply' */ '@/views/contentSafe/components/quickReply.vue'),
            meta: {
              title: '快捷回复',
              id: 216
            },
          },
          { path: '', redirect: 'reportManage' }
        ]
      },
      {
        path: "/channelManage",
        name: "channelManage",
        component: () => import(/* webpackChunkName: 'home/channelManage' */ '@/views/channelManage/index.vue'),
        meta: {
          title: '渠道管理',
          id: 263
        },
        children: [
          {
            path: "channelList",
            name: "channelList",
            component: () => import(/* webpackChunkName: 'channelManage/channelList' */ '@/views/channelManage/components/channelList.vue'),
            meta: {
              title: '渠道列表',
              id: 264
            },
          },
          { path: '', redirect: 'channelList' }
        ]
      },
      {
        path: "/reportCenter",
        name: "reportCenter",
        component: () => import(/* webpackChunkName: 'home/reportCenter' */ '@/views/reportCenter/index.vue'),
        meta: {
          title: '报表中心',
          id: 290
        },

      },
      {
        path: "/systemSetting",
        name: "systemSetting",
        component: () => import(/* webpackChunkName: 'home/systemSetting' */ '@/views/systemSetting/index.vue'),
        meta: {
          title: '系统管理',
          id: 298
        },
        children: [
          {
            path: "roleManagement",
            name: "roleManagement",
            component: () => import(/* webpackChunkName: 'systemSetting/roleManagement' */ '@/views/systemSetting/components/roleManagement.vue'),
            meta: {
              title: '角色管理',
              id: 304
            },
          },
          {
            path: "backstageAccountManage",
            name: "backstageAccountManage",
            component: () => import(/* webpackChunkName: 'systemSetting/backstageAccountManage' */ '@/views/systemSetting/components/backstageAccountManage.vue'),
            meta: {
              title: '后台账号管理',
              id: 308
            },
          },
          { path: '', redirect: 'roleManagement' }
        ]
      },
      { path: '', redirect: '/userManage' }
    ]
  },

]