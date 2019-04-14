import { getStringTypeAttr } from '@/components/template'
import {extend} from '@/utils/public';

export const radioTag = (obj) => {
  const config = extend(radioConf, obj)
  let stringAttr = getStringTypeAttr(config)
  const dataSourceAttr = obj.dataSource.value ? `:label="item.value" :key="item.value" v-for="item in ${obj.dataSource.value}"` : ''
  let template = `<el-radio
                    ${dataSourceAttr}
                    ${stringAttr}>
                  </el-radio>`
  return template
};

export let radioConf = {
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