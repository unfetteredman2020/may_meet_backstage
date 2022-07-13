let obj ={
  "userid": 1,
  "嘉宾昵称": "我是你大哥",
  "嘉宾头像": "cfg/defaultface/default8.jpg",
  "是否真人": 0,
  "状态": {},
  "实名": "",
  "是否嘉宾": "非嘉宾",
  "女用户分级": 0,
  "showrecommend": 1,
  "分成": 0.18,
  "主页封面": null,
  "注册时间": "2022-06-30",
  "推荐人": 10000
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