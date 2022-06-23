import { mockIntetface } from '@/mock/report.js'

let obj = {
  'date': '日期',
  /**
   * 充值金币消耗
   */
  'chong_zhi_jin_bi_xiao_hao': '充值金币消耗',
  /**
   * 付费金额，当日累计充值数
   */
  'chong_zhi_jin_e': '充值金额',
  /**
   * 次日留存率，第一天有效注册用户在第二天再次成功启动应用人数/第一日有效注册人数/*100；保留2位小数（四舍五入）
   */
  'ci_ri_liu_cun_lv': '次日留存率',
  /**
   * 单付费用户成本，消耗金额/当日新增付费人数；保留2位小数（四舍五入）
   */
  'dan_fu_fei_yong_hu_cheng_ben': '单付费用户成本',
  /**
   * 当日新增付费金额，当日注册的用户中充值的总金额
   */
  'dang_ri_xin_zeng_fu_fei_jin_e': '当日新增付费金额',
  /**
   * 当日新增付费人数，当日注册的用户中产生充值的人数
   */
  'dang_ri_xin_zeng_fu_fei_ren_shu': '当日新增付费人数',

  /**
   * 登录率，注册总数/激活数*100,保留2位小数（四舍五入）
   */
  'deng_lu_lv': '登录率',
  /**
   * 付费次数，当日产生充值的人累计充值次数
   */
  'fu_fei_ci_shu': '付费次数',
  /**
   * 付费人数，当日产生充值的人数
   */
  'fu_fei_ren_shu': '付费人数',
  /**
   * 付费转化率，当日新增付费人数/有效注册人数*100
   */
  'fu_fei_zhuan_hua_lv': '付费转化率',
  /**
   * 会员续费人数
   */
  'hui_yuan_xu_fei_ren_shu': '会员续费人数',
  /**
   * 活跃付费ARPU，活跃付费人数总的付费金额/活跃付费人数
   */
  'huo_yue_fu_fei_ARPPU': '活跃付费ARPU',
  /**
   * 活跃付费率，付费人数/活跃用户*100；保留2位小数（四舍五入）
   */
  'huo_yue_fu_fei_lv': '活跃付费率',
  /**
   * 活跃付费人数，当日活跃用户中有充值记录的用户人数
   */
  'huo_yue_fu_fei_ren_shu': '活跃付费人数',
  /**
   * 活跃用户，当日登陆app的人数
   */
  'huo_yue_ren_shu': '活跃用户',
  /**
   * 激活数，终身首次启动app的设备数
   */
  'ji_huo_shu': '激活数',
  /**
   * 开通会员金额
   */
  'kai_tong_hui_yuan_jin_e': '开通会员金额',
  /**
   * 开通会员人数
   */
  'kai_tong_hui_yuan_ren_shu': '开通会员人数',
  /**
   * 老客ARPPU，老客付费金额/（付费人数-当日新增付费人数）；保留2位小数（四舍五入）
   */
  'lao_ke_ARPPU': '老客ARPPU',
  /**
   * 老客ARPU，老客付费金额/（活跃人数-有效注册人数）；保留2位小数（四舍五入）
   */
  'lao_ke_ARPU': '老客ARPU',
  /**
   * 老客付费金额，非当日注册的用户中充值的总金额
   */
  'lao_ke_fu_fei_jin_e': '老客付费金额',
  /**
   * 礼物金额
   */
  'li_wu_jin_e': '礼物金额',
  /**
   * 礼物人数
   */
  'li_wu_ren_shu': '礼物人数',
  /**
   * 聊天礼物金额
   */
  'liao_tian_li_wu_jin_e': '聊天礼物金额',
  /**
   * 聊天率，注册且聊天人数/有效注册人数*100；保留2位小数（四舍五入）
   */
  'liao_tian_lv': '聊天率',
  /**
   * 15日留，第一天有效注册用户在第15天再次成功启动应用人数/第一日有效注册人数/*100；保留2位小数（四舍五入）
   */
  'liu_cun_lv_15': '15日留',
  /**
   * 30日留，第一天有效注册用户在第30天再次成功启动应用人数/第一日有效注册人数/*100；保留2位小数（四舍五入）
   */
  'liu_cun_lv_30': '30日留',
  /**
   * 7日留，第一天有效注册用户在第7天再次成功启动应用人数/第一日有效注册人数/*100；保留2位小数（四舍五入）
   */
  'liu_cun_lv_7': '7日留',
  /**
   * 男性次日留存率，第一天有效注册男性用户在第二天再次成功启动应用人数/第一日有效注册男性人数/*100；保留2位小数（四舍五入）
   */
  'nan_xing_ci_ri_liu_cun_lv': '男性次日留存率',
  /**
   * 男性付费转化率，当日新增付费男性人数/男性注册人数*100
   */
  'nan_xing_fu_fei_zhuan_hua_lv': '男性付费转化率',
  /**
   * 男性活跃用户，当日登陆app的男性用户人数
   */
  'nan_xing_huo_yue_ren_shu': '男性活跃用户',
  /**
   * 男性注册人数，当日成功注册的男性用户人数
   */
  'nan_xing_you_xiao_zhu_ce_ren_shu': '有效注册人数/男性注册人数',
  /**
   * 渠道付费转化率，当日渠道新增付费人数/渠道有效注册人数*100
   */
  'qu_dao_fu_fei_zhuan_hua_lv': '付费转化率/男性/渠道',
  /**
   * 人均在线时长，当日全部用户在app内的时间的平均数
   */
  'ren_jun_zai_xian_shi_chang': '人均在线时长',
  /**
   * 日ROI，当日新增付费金额/消耗金额；保留2位小数（四舍五入）
   */
  'ri_roi': '日ROI',
  /**
   * 15日ROI，当日新增付费人数15天的付费金额总计/消耗金额
   */
  'ri_roi_15': '15日ROI',
  /**
   * 30日ROI，当日新增付费人数 30天的付费金额总计/消耗金额
   */
  'ri_roi_30': '30日ROI',
  /**
   * 7日ROI，当日新增付费人数 7天的付费金额总计/消耗金额
   */
  'ri_roi_7': '7日ROI',
  /**
   * 视频金额
   */
  'shi_pin_jin_e': '视频金额',
  /**
   * 视频人数
   */
  'shi_pin_ren_shu': '视频人数',
  /**
   * 文字金额，文字聊天折算成零钱的金额
   */
  'wen_zi_jin_e': '文字金额',
  /**
   * 文字人数，当日文字聊天的人数
   */
  'wen_zi_ren_shu': '文字人数',
  /**
   * 消耗金额，投放消耗的金额；保留2位小数（四舍五入）
   */
  'xiao_hao_jin_e': '消耗金额',
  /**
   * 新客ARPPU，当日新增付费金额/当日新增付费人数；保留2位小数（四舍五入）
   */
  'xin_ke_ARPPU': '新客ARPPU',
  /**
   * 新客ARPU，当日新增付费金额/有效注册人数；保留2位小数（四舍五入）
   */
  'xin_ke_ARPU': '新客ARPU',
  /**
   * 新增付费金额，新增付费人数中当日累计充值数
   */
  'xin_zeng_fu_fei_jin_e': '新增付费金额',
  /**
   * 新增付费人数，用户当日首次充值的人数（包含当日新增付费人数）
   */
  'xin_zeng_fu_fei_ren_shu': '新增付费人数',
  /**
   * 语音视频礼物金额
   */
  'yin_shi_pin_li_wu_jin_e': '语音视频礼物金额',
  /**
   * 有效注册率，有效注册人数/注册总数*100,保留2位小数（四舍五入）
   */
  'you_xiao_zhu_ce_lv': '有效注册率',
  /**
   * 有效注册人数，当日成功注册的用户人数
   */
  'you_xiao_zhu_ce_ren_shu': '有效注册人数',
  /**
   * 语音金额
   */
  'yu_yin_jin_e': '语音金额',
  /**
   * 语音人数
   */
  'yu_yin_ren_shu': '语音人数',
  /**
   * 赠送金币消耗
   */
  'zeng_song_jin_bi_xiao_hao': '赠送金币消耗',
  /**
   * 注册成本，消耗金额/有效注册人数；保留2位小数（四舍五入）
   */
  'zhu_ce_cheng_ben': '注册成本',
  /**
   * 注册且聊天人数，当日注册的人数中有聊天的用户人数
   */
  'zhu_ce_qie_liao_tian_ren_shu': '注册且聊天人数',
  /**
   * 注册总数，生成账号的用户数（包含信息流渠道、安卓渠道等）
   */
  'zhu_ce_zong_shu': '注册总数',
  /**
   * 总客ARPPU，付费金额/付费人数；保留2位小数（四舍五入）
   */
  'zong_ke_ARPPU': '总客ARPPU',
  /**
   * 总客ARPU，付费金额/活跃用户；保留2位小数（四舍五入）
   */
  'zong_ke_ARPU': '总客ARPU',
}

let revers = []

let a = {}
for (const key in obj) {

  let name = obj[key]
  a[`${name}`] = key
  revers.push({
    text: name,
    value: key,
    width: '100'
  })
}
console.log('a', a)
let keys = Object.values(obj)
const list = mockIntetface(Object.keys(obj))
// // console.log('list--', list)
export default {
  origin: revers,
  columms: revers,
  ChineseKeys: a,
  mockList: list || []
}

