const renderJs = function(sortable_item) {
  let data = {}
  let code = `data () {
                return ${data}
              }`

  sortable_item.forEach(item => {
    let parentObj = {}
    // 关联字段是否为对象属性
    const dataArr = item['v-model'].split('.')
    dataArr.forEach(data => {
      
    })

    const len = dataArr.length
    let i = 1
    while (i < len) {
      const key = dataArr[i]
      if (parentObj[key]) {
        continue
      }
      parentObj[key] = {}
      data = parentObj
      i++
    }

  })

  return code
}

function createObj (arr, index) {

  const obj = {}
  if (arr.length > ++index) {
    obj[arr[index]] = createObj()

  } else {
    obj[arr[index]] = ''
  }
  return obj
}

export default renderJs

{
  let arr = ['a', 'b', 'c'],
      obj = {}
  arr + obj => obj[arr[0]][arr[1]][arr[2]] = ''
}