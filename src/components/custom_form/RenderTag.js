import {formItem} from './control/FormItem'

const renderTag = function({ele, obj}) {
  console.log(obj)

  const code = formItem(ele, obj);
  return code
}

export default renderTag