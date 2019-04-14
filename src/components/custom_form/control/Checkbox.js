import { getStringTypeAttr } from '@/components/template'
import {extend} from '@/utils/public';

export const checkboxTag = (obj) => {
  const config = extend(checkboxConf, obj)
  let stringAttr = getStringTypeAttr(config)
  const dataSourceAttr = obj.dataSource.value ? `:label="item.value" :key="item.value" v-for="item in ${obj.dataSource.value}"` : ''
  let template = `<el-checkbox
                    ${dataSourceAttr}
                    ${stringAttr}>
                  </el-checkbox>`
  return template
};

export let checkboxConf = {
  value: {
    type: 'text',
    value: ''
  },
  dataSource: {
    type: '',
    value: '',
    ignore: true
  }
}