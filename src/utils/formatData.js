
/**
 * 
 * @param {Object} data //
 * description： 递归过滤去掉对象里面的空值，返回有参数的对象 eg: {a: '', b: '123', d: [1,null, '']} returned: { b: '123', d: [1]}
 * @returns 
 */

export const clearEmptyObj = (data) => {
  let curVal;
  let toString = Object.prototype.toString;
  let dataType = toString.call(data);
  if (data || dataType === "[object Number]" || dataType === "[object Boolean]") {
    switch (dataType) {
      case "[object Object]":
        if (Object.keys(data).length > 0) {
          let momObj = {};
          for (let key in data) {
            let value = clearEmptyObj(data[key]);
            let valueType = toString.call(value);
            valueType === "[object Boolean]" || valueType === "[object Number]" || value ? momObj[key] = value : "";
          }
          curVal = momObj;
        } else {
          return;
        }
        break;
      case "[object Array]":
        if (data.length > 0) {
          let momValue = [];
          data.forEach((e) => {
            let value = clearEmptyObj(e);
            let valueType = toString.call(value);
            valueType === "[object Boolean]" || valueType === "[object Number]" || value ? momValue.push(value) : "";
          });
          momValue.length > 0 ? curVal = momValue : "";
        } else {
          return;
        }
        break;
      case "[object Boolean]":
      default:
        curVal = data;
        break;
    }
  } else {
    return;
  }
  return curVal;
}
