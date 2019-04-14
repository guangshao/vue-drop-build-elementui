import { getStringTypeAttr } from '@/components/template'
import { radioTag, radioConf } from './Radio'

export default (_self, h) => {
  return [
    h("ElRadioGroup", {
      props: {
        value: _self.obj.value || "-1"
      }
    }, _self.obj.items.value.map(v => {
      return h("ElRadio", {
        props: {
          label: v.label_value
        }
      }, v.label_name)
    }))
  ];
};
export const radioGroupTag = (obj) => {
  const config = Object.assign(radioGroupConfig, obj)

  const radioConf = JSON.parse(JSON.stringify(config))
  const radioTamplte = radioTag(radioConf)

  let stringAttr = getStringTypeAttr(config)
  let template = `<el-radio-group ${stringAttr}>
                    ${radioTamplte}
                  </el-radio-group>`
  return template
};

const radioGroupConfig = {
  items: {
    type: 'select',
    value: [{ "label_value": "1", "label_name": "单选框1" }, { "label_value": "2", "label_name": "单选框2" }],
    ignore: true
  },
  modalTitle: {
    type: 'text',
    value: '单项选择',
    ignore: true
  },
  // 控件左侧label内容
  label: {
    type: 'text',
    value: '单项选择',
    ignore: true
  },
  // 表单关联字段
  'v-model': {
    type: 'text',
    value: ''
  },
  // 验证错误提示信息
  ruleError: {
    type: 'text',
    value: '该字段不能为空',
    ignore: true
  },
  '@change': {
    type: 'text',
    value: ''
  },
  // 是否必填
  require: {
    type: 'radio',
    value: true,
    ignore: true
  },
  //  是否只读
  readonly: {
    type: 'radio',
    default: false,
    value: false
  }
}

export const radioGroupConf = (Object.assign(radioGroupConfig, radioConf))