import { getStringTypeAttr } from '@/components/template'
import {extend} from '@/utils/public';

export const optionTag = (obj) => {
  const config = extend(optionConf, obj)
  let stringAttr = getStringTypeAttr(config)
  const dataSourceAttr = obj.dataSource.value ? `:label="value" :key="key"  :value="value" v-for="(value,key) in ${obj.dataSource.value}"` : ''
  let template = `<el-option
                    ${dataSourceAttr}
                    ${stringAttr}>
                  </el-option>`
  return template
};

export let optionConf = {
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