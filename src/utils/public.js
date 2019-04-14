
// 只继承自身的属性
export const extend = (orgin, tager) => {
  let obj = Object.assign({}, orgin)
  for (let i in orgin) {
    obj[i].value = tager[i] ? JSON.parse(JSON.stringify(tager[i])).value : orgin[i].value
  }
  return obj
}
