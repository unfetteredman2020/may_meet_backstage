export const getDate = (date = new Date()) => {
    console.log('date :>> ', date);
  var myDate = new Date(date);
//   const year1 = myDate.getYear(); //获取当前年份(2位)
  const year = myDate.getFullYear(); //获取完整的年份(4位,1970-???)
  let month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
//   month = month < 10 ? "0" + month : month;
  let dayNumber = myDate.getDate(); //获取当前日(1-31)
//   dayNumber = dayNumber < 10 ? "0" + dayNumber : dayNumber;
  const week = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
  myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
  let hour = myDate.getHours(); //获取当前小时数(0-23)
//   hour = hour < 10 ? "0" + hour : hour;
  let minute = myDate.getMinutes(); //获取当前分钟数(0-59)
//   minute = minute < 10 ? "0" + minute : minute;
  let second = myDate.getSeconds(); //获取当前秒数(0-59)
//   second = second < 10 ? "0" + second : second;
  let millisecond = myDate.getMilliseconds(); //获取当前毫秒数(0-999)
//   let myDay = myDate.toLocaleDateString(); //获取当前日期
//   var mytime = myDate.toLocaleTimeString(); //获取当前时间
//   let detail = myDate.toLocaleString(); //
  return {
    year, //年
    month, //月
    dayNumber, //日
    hour, //时间
    minute, //分钟
    second, //秒数
    week, //周几
    millisecond, //毫秒
    fullDate: `${year}-${formateDate(month)}-${formateDate(dayNumber)}`, //完整年份，eg： 2022-06-09
    fullTime: `${formateDate(hour)}:${formateDate(minute)}:${formateDate(second)}`, //完整时间：eg：10:47:40
  };
};

export function formateDate(num) {
    return num < 10 ? "0" + num : num;
}