import { getStringTypeAttr } from '@/components/template'
import { checkboxTag, checkboxConf } from './checkbox'

export default (_self, h) => {
  return [
    h("ElCheckboxGroup", {
      props: {
        value: _self.obj.value || "-1"
      }
    }, _self.obj.items.value.map(v => {
      return h("ElCheckbox", {
        props: {
          label: v.label_value
        }
      }, v.label_name)
    }))
  ];
};
export const checkboxGroupTag = (obj) => {
  const config = Object.assign(checkboxGroupConfig, obj)

  const checkboxConf = JSON.parse(JSON.stringify(config))
  const checkboxTamplte = checkboxTag(checkboxConf)

  let stringAttr = getStringTypeAttr(config)
  let template = `<el-checkbox-group ${stringAttr}>
                    ${checkboxTamplte}
                  </el-checkbox-group>`
  return template
};


const checkboxGroupConfig = {
  items: {
    type: 'select',
    value: [{ "label_value": "1", "label_name": "多选框1" }, { "label_value": "2", "label_name": "多选框2" }],
    ignore: true
  },
  modalTitle: {
    type: 'text',
    value: '多选框',
    ignore: true
  },
  // 控件左侧label内容
  label: {
    type: 'text',
    value: '多选框',
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

export const checkboxGroupConf = (Object.assign(checkboxGroupConfig, checkboxConf))