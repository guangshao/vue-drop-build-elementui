import { getStringTypeAttr } from '@/components/template'

export default (_self, h) => {
  return [
    h("ElInput", {
      props: {
        placeholder: _self.obj.placeholder.value || "这是一个输入框",
        maxlength: parseInt(_self.obj.maxLength.value) || 20,
        value: _self.obj.value.value || ""
      }
    })
  ];
};

export const inputTag = (obj) => {
  const config = Object.assign(inputConf, obj)
  return `<el-input ${getStringTypeAttr(config)}>
          </el-input>`
};

export let inputConf = {
  modalTitle: {
    type: 'text',
    value: '输入框',
    ignore: true
  },
  // 控件左侧label内容
  label: {
    type: 'text',
    value: '输入框',
    ignore: true
  },
  placeholder: {
    type: 'text',
    value: '',
  },
  // 最大长度
  maxLength: {
    type: 'text',
    value: 20
  },
  value: {
    type: 'text',
    value: ''
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
  // 是否显示可清空按钮
  clearable: {
    type: 'radio',
    default: false,
    value: false
  },
  //  是否只读
  readonly: {
    type: 'radio',
    default: false,
    value: false
  }
}
