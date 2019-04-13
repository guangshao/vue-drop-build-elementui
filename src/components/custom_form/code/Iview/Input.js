import { getTemplate, getSlotContent, getStringTypeAttr } from '@/components/template'

export default (obj) => {
  console.log(obj)
  //定义默认属性
  
  slots = {
      prepend:[],
      append:[]
  }

  //覆盖默认属性
  Object.assign(slots, {})
  Object.assign(attributes, obj)

  //根据组件不同需要做的不同操作


  //获取插槽模板内容
  // var subContent = getSlotContent(slots)
  //   //设置当前组件的slot
  // if (attributes.slot && attributes.slot !== 'default') {
  //   attributes.slot = {
  //       type: 'text',
  //       value: attributes.slot
  //   }
  // } else {
  //   attributes.slot = {
  //       type: 'text',
  //       value: ''
  //   }
  // }
  let stringAttr = getStringTypeAttr(attributes)
  console.log(stringAttr)
  let template = `<el-input 
                      ${stringAttr}>
                  </el-input>`
  return template
};

export let inputConf = {
  // 对应数据库内类型
  type: 'text',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '输入框',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  // 是否必填
  require: true,
  // 最大长度
  maxLength: 20,
  // 选项内数据
  items: [{ "label_value": null, "label_name": "" }],
  value: '',
  // 表单name
  name: '',
  // 验证错误提示信息
  ruleError: '该字段不能为空',
  // 是否关联字段
  relation: false,
  // 关联字段name
  relation_name: '',
  // 关联字段value
  relation_value: '',
  // 是否被渲染
  visibility: true
}
