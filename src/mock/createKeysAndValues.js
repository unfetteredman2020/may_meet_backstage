let obj ={
  "我方订单号": 77,
  "通道订单号": "C7C81D52957E413CBEC8713FA6878E2D",
  "提现方式": 1,
  "提现金额": 1,
  "到账金额": 0.3,
  "打款账户名称": "",
  "状态": 0,
  "状态时间戳": null,
  "状态原因": "审核中",
  "提现时间": "2022-06-28",
  "bankinfo": {
    "real_name": "",
    "id_card": "",
    "wxopenid": "",
    "wxappid": "",
    "card_no": ""
  }
}
let a = {}
for (const key in obj) {
  a[key] = key
}
let b = []
Object.keys(a).forEach(item=> {
  b.push({label: item, value: item})
})
console.log('a', a)
console.log(' b',  b)