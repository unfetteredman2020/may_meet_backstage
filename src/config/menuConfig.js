import { hasPermission } from '@/utils/isPermission.js'
let Home = [
  {
    path: "/userManage",
    name: "用户管理",
    meta: {
      id: 1
    }
  },
  {
    path: "/guestManage",
    name: "嘉宾管理",
    meta: {
      id: 79
    }
  },
  {
    path: "/recommenderManage",
    name: "推荐人管理",
    meta: {
      id: 115
    }
  },
  {
    path: "/productConfig",
    name: "产品配置",
    meta: {
      id: 139
    }
  },
  {
    path: "/contentSafe",
    name: "内容安全",
    meta: {
      id: 186
    }
  },
  {
    path: "/channelManage",
    name: "渠道管理",
    meta: {
      id: 263
    }
  },
  {
    path: "/reportCenter",
    name: "报表中心",
    meta: {
      id: 290
    }
  },
  {
    path: "/systemSetting",
    name: "系统管理",
    meta: {
      id: 298
    }
  },
]

let UserManager = [
  {
    name: "综合管理",
    path: "/userManage/userGeneral",
    icon: "el-icon-menu",
    meta: {
      id: 2
    }

  },
  {
    name: "提现审核",
    icon: "el-icon-s-check",
    path: "/userManage/user_withdraw",
    // children: [],
    meta: {
      id: 40
    }
  },
  {
    name: "奖惩管理",
    icon: "el-icon-s-order",
    path: "/userManage/userAwardPunish",
    // children: [],
    meta: {
      id: 48
    }
  },
  {
    name: "退款管理",
    icon: "el-icon-remove",
    path: "/userManage/userRefund",
    // children: [],
    meta: {
      id: 65
    }
  },
]

let GuestManage = [
  {
    name: "综合管理",
    path: "/guestManage/guestGeneral",
    icon: "el-icon-menu",
    meta: {
      id: 80
    }
  },
  {
    name: "女用户列表",
    icon: "el-icon-female",
    path: "/guestManage/listOfWomen",
    meta: {
      id: 91
    }
  },
  {
    name: "代理人列表",
    icon: "el-icon-user",
    path: "/guestManage/listOfAgents",
    // children: [],
    meta: {
      id: 94
    }
  },
  {
    name: "代理人嘉宾",
    icon: "el-icon-s-custom",
    path: "/guestManage/agentGuest",
    // children: [],
    meta: {
      id: 97
    }
  },
  {
    name: "代理收益",
    icon: "el-icon-coin",
    path: "/guestManage/agencyIncome",
    // children: [],
    meta: {
      id: 101
    }
  },
  {
    name: "推荐团队嘉宾列表",
    icon: "el-icon-news",
    path: "/guestManage/recommendTeamGuestList",
    // children: [],
    meta: {
      id: 102
    }
  },
  {
    name: "嘉宾收益",
    icon: "el-icon-money",
    path: "/guestManage/guestIncome",
    // children: [],
    meta: {
      id: 105
    }
  },
  {
    name: "活跃数据",
    icon: "el-icon-s-data",
    path: "/guestManage/activeData",
    // children: [],
    meta: {
      id: 107
    }
  },
  {
    name: "转账管理",
    icon: "el-icon-s-operation",
    path: "/guestManage/transferManagement",
    // children: [],
    meta: {
      id: 109
    }
  },
  {
    name: "违规嘉宾",
    icon: "el-icon-warning-outline",
    path: "/guestManage/violateGuest",
    // children: [],
    meta: {
      id: 114
    }
  },
]

let RecommenderManage = [
  {
    name: "推荐人列表",
    path: "/recommenderManage/recommendList",
    icon: "el-icon-s-custom",
    meta: {
      id: 116
    }
  },
  {
    name: "推荐团队收益",
    icon: "el-icon-money",
    path: "/recommenderManage/recommendTeamIncome",
    meta: {
      id: 123
    }
  },
  {
    name: "运营数据",
    icon: "el-icon-notebook-2",
    path: "/recommenderManage/operateData",
    // children: [],
    meta: {
      id: 134
    }
  },
  {
    name: "运营关系",
    icon: "el-icon-notebook-2",
    path: "/recommenderManage/operateRelationship",
    // children: [],
    meta: {
      id: 136
    }
  }
]

let ProductConfig = [
  {
    name: "运营消息",
    path: "/productConfig/operateInfo",
    icon: "el-icon-s-marketing",
    meta: {
      id: 140
    }
  },
  {
    name: "弹窗配置",
    icon: "el-icon-thumb",
    path: "/productConfig/popupConfig",
    meta: {
      id: 181
    }
  }
]

let ChannelManage = [
  {
    name: "渠道列表",
    path: "/channelManage/channelList",
    icon: "el-icon-s-marketing",
    meta: {
      id: 264
    }
  }
]

let ReportCenter = [
  {
    name: "经营模块",
    path: "/reportCenter/jingying",
    icon: "el-icon-odometer",
    meta: {
      id: 291
    },
    children: [
      {
        name: "平台经营数据总表",
        icon: "el-icon-odometer",
        path: "/jingying/sumTableOfPlatformOperation",
        meta: {
          id: ''
        },
      },
      {
        name: "首次付费用户留存",
        icon: "el-icon-odometer",
        path: "/jingying/firstPayUser",
      },
      {
        name: "新增付费用户留存",
        icon: "el-icon-odometer",
        path: "/jingying/newPayUser",
      },
      {
        name: "头条 安卓新增付费用户",
        icon: "el-icon-odometer",
        path: "/jingying/headlinesAndroidNewPayUser",
      },
      {
        name: "快手 安卓新增付费用户",
        icon: "el-icon-odometer",
        path: "/jingying/kwaiAndroidNewPayUser",
      },
      {
        name: "IOS 新增付费用户",
        icon: "el-icon-odometer",
        path: "/jingying/iosNewPayUser",
      },
      {
        name: "近3日业务数据对比",
        icon: "el-icon-odometer",
        path: "/jingying/thridDayBusinessCompare",
      },
      {
        name: "年龄段每日数据",
        icon: "el-icon-odometer",
        path: "/jingying/ageDailyCompare",
      },
      {
        name: "每日付费统计",
        icon: "el-icon-odometer",
        path: "/jingying/dailyPayStatistic",
      },
      {
        name: "业务看板",
        icon: "el-icon-odometer",
        path: "/jingying/businessBoard",
      },
      {
        name: "平台活跃每日数据",
        icon: "el-icon-odometer",
        path: "/jingying/platformActiveDaysData",
      },
      {
        name: "总览看板",
        icon: "el-icon-odometer",
        path: "/jingying/allBoard",
      },
    ],
  },
  {
    name: "运营模块",
    icon: "el-icon-odometer",
    path: "/reportCenter/yunying",
    meta: {
      id: 294
    },
    children: [
      {
        name: "各时段注册数",
        icon: "el-icon-odometer",
        path: "/yunying/registCount",
      },
      {
        name: "每日活跃用户统计",
        icon: "el-icon-odometer",
        path: "/yunying/dayActiveUserStatistics",
      },
      {
        name: "注册用户留存率",
        icon: "el-icon-odometer",
        path: "/yunying/registRetention",
      },
      {
        name: "注册男用户留存率",
        icon: "el-icon-odometer",
        path: "/yunying/manRegistRetention",
      },
      {
        name: "嘉宾留存率",
        icon: "el-icon-odometer",
        path: "/yunying/guestRetention",
      },
      {
        name: "付费用户留存率",
        icon: "el-icon-odometer",
        path: "/yunying/payUserRetention",
      },

      {
        name: "注册用户登录方式",
        icon: "el-icon-odometer",
        path: "/yunying/registMode",
      },
    ],
  },
  {
    name: "渠道模块",
    icon: "el-icon-set-up",
    path: "/reportCenter/channel",
    meta: {
      id: 292
    },
    children: [
      {
        name: "推广数据报表",
        icon: "el-icon-set-up",
        path: "/channel/promotionReport",
      },
      {
        name: "每日渠道数据总表",
        icon: "el-icon-set-up",
        path: "/channel/dailyChannelDataSum",
      },
      {
        name: "雅思助手激活统计",
        icon: "el-icon-set-up",
        path: "/channel/IELTSAssistantActiveCount",
      },
      {
        name: "用户聊天情况",
        icon: "el-icon-set-up",
        path: "/channel/userChatState",
      },
      {
        name: "每日渠道消耗排名",
        icon: "el-icon-set-up",
        path: "/channel/dailyChannelConsumRanking",
      },
    ],
  },
  {
    name: "产品模块",
    icon: "el-icon-set-up",
    path: "/reportCenter/product",
    meta: {
      id: 293
    },
    children: [
      {
        name: "视频、语音通话视频",
        icon: "el-icon-odometer",
        path: "/product/voiceAndVideoCallData",
      },
      {
        name: "男用户任务完成情况",
        icon: "el-icon-odometer",
        path: "/product/manTaskCompletion",
      },
      {
        name: "动态每日统计表",
        icon: "el-icon-odometer",
        path: "/product/dynamicDailyStatistics",
      },

      {
        name: "女用户任务完成情况",
        icon: "el-icon-odometer",
        path: "/product/womanTaskCompletion",
      },
      {
        name: "实名、真人认证数据",
        icon: "el-icon-odometer",
        path: "/product/realNameAuthenticationData",
      },
      {
        name: "视频专区接通情况",
        icon: "el-icon-odometer",
        path: "/product/videoConnectionData",
      },
      {
        name: "每日金币数据",
        icon: "el-icon-odometer",
        path: "/product/dailyGoldData",
      },
      {
        name: "每日赠送金币数据",
        icon: "el-icon-odometer",
        path: "/product/dailyGiveGoldData",
      },
    ],
  },
]

let SystemSetting = [
  {
    name: "角色管理",
    path: "/systemSetting/roleManagement",
    icon: "el-icon-user-solid",
    meta: {
      id: 304
    }
  },
  {
    name: "后台账号管理",
    icon: "el-icon-s-help",
    path: "/systemSetting/backstageAccountManage",
    meta: {
      id: 308
    }
  },
]

export let HOME = hasPermission(Home) || []
export let USERMANAGE = hasPermission(UserManager) || []
export let GUESTMANAGE = hasPermission(GuestManage) || []
export let RECOMMENDMANAGE = hasPermission(RecommenderManage) || []
export let PRODUCTCONFIG = hasPermission(ProductConfig) || []
export let CHANNELMANAGE = hasPermission(ChannelManage) || []
export let REPORTCENTER = hasPermission(ReportCenter) || []
export let SYSTEMSETTING = hasPermission(SystemSetting) || []

