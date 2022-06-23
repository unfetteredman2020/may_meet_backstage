
export  const mockIntetface = data => {
  let list = [];
  for (let index = 0; index < 59; index++) {
    let obj = {};
    data.forEach(item => { obj[item] = `${item}`});  
    for (const key in obj) {
      obj[key] = `${obj[key]}-${index}`
    }
    list.push(obj)
  }
  return list
}

