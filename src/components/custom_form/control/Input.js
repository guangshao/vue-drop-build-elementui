import { getTemplate, getSlotContent, getStringTypeAttr } from '@/components/template'

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

export const input = (obj) => {
  //定义默认属性
  let slots = {
    prepend:[],
    append:[]
  }

  //覆盖默认属性
  Object.assign(slots, {})
  const config = Object.assign(inputConf, obj)
  // formItem属性
  const formItemAttrArr = ['label', 'prop']
  const formItemconfig = {}
  formItemAttrArr.forEach(attr => {
    formItemconfig[attr] = JSON.parse(JSON.stringify(config[attr]))
    delete config[attr]
  })
  formItemconfig['label'] = JSON.parse(JSON.stringify(config['label']))
  if (!!obj.prop.value && !!obj.require.value) {
    formItemconfig['prop'] = JSON.parse(JSON.stringify(config['prop']))
    delete config.prop
  }
  let stringAttr = getStringTypeAttr(config)
  let formItemAttr = getStringTypeAttr(formItemconfig)
  console.log(stringAttr)
  let template = `<el-form-item ${formItemAttr}>
                    <el-input 
                      ${stringAttr}>
                    </el-input>
                  </el-form-item>`
  return template
};

export let inputConf = {
  // 对应数据库内类型
  type: {
    type: 'input',
    value: 'text',
    ignore: true
  },
  modalTitle: {
    type: 'input',
    value: '输入框',
    ignore: true
  },
  // 控件左侧label内容
  label: {
    type: 'input',
    value: '输入框',
  },
  placeholder: {
    type: 'input',
    value: '',
  },
  // 最大长度
  maxLength: {
    type: 'input',
    value: 20
  },
  value: {
    type: 'input',
    value: ''
  },
  // 表单关联字段
  prop: {
    type: 'input',
    value: ''
  },
  // 验证错误提示信息
  ruleError: {
    type: 'input',
    value: '该字段不能为空',
    ignore: true
  },
  // 是否必填
  require: {
    type: 'radio',
    value: true,
    ignore: true
  },
  // 是否关联字段
  relation: {
    type: 'radio',
    default: false,
    value: false
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
