import { getStringTypeAttr } from '@/components/template'
import {form_tag} from '../FormList';
import {extend} from '@/utils/public';


const formItemConf= {
  // 控件左侧label内容
  label: {
    type: 'text',
    value: '',
    ignore: false
  },
  // 表单关联字段
  prop: {
    type: 'text',
    value: '',
    ignore: true
  },
  'v-model': {
    type: 'text',
    value: '',
    ignore: true
  },
}

export const formItem = (ele, obj) => {
  const config = extend(formItemConf, obj)
  config['prop'].value = config['v-model'].value
  // 是否添加校验字段
  config['prop'].ignore = !obj.require.value
  const childConf = JSON.parse(JSON.stringify(obj))
  childConf['v-model'] = JSON.parse(JSON.stringify(config['prop']))
  const temp = form_tag[ele.toLowerCase()] && form_tag[ele.toLowerCase()](childConf);
  return `<el-form-item ${getStringTypeAttr(config)}> ${temp}
          </el-form-item>`
};
