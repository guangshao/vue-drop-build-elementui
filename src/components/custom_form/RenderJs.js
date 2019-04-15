const renderTag = function(sortable_item) {
  let data = {}
  let code = `data () {
                return ${data}
              }`

  sortable_item.forEach(item => {
    let parentObj = {}
    // 关联字段是否为对象属性
    const dataArr = item['v-model'].split('.')
    const len = dataArr.length
    let i = 1
    do {
      parentObj = data[dataArr[0]] = {}
    } while (i < len) {
      const key = dataArr[i]
      parentObj[key] = {}
    }
    for (let i = 1; i < len; i++) {
      if (i === len - 1) {
        dataArr[key] = ''
      } else {
        parentObj = createObj(parentObj, key)
      }
    }
  })

  return code
}

function createObj(parentObj, key) {
  return parentObj[key] = {}
}
export default renderTag