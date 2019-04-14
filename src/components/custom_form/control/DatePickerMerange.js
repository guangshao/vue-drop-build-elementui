import { getStringTypeAttr } from '@/components/template'

export default (_self, h) => {
  return [
    h('ElDatePicker', {
      props: {
        type: _self.obj.type.value,
        'range-separator': '至',
        'start-placeholder': _self.obj['start-placeholder'].value,
        'end-placeholder': _self.obj['end-placeholder'].value,
        value: _self.obj.value || []
      }
    })
  ];
}

export const datePickerMerangeTag = (obj) => {
  const config = Object.assign(datePickerMerangeConf, obj)
  return `<el-date-picker ${getStringTypeAttr(config)}>
          </el-date-picker>`
};

export let datePickerMerangeConf = {
  modalTitle: {
    type: 'text',
    value: '日期范围',
    ignore: true
  },
  // 控件左侧label内容
  label: {
    type: 'text',
    value: '日期范围',
    ignore: true
  },
  // 日期选择类型 year: 年, month: 月, date: 日, dates: 多个日期, week: 周, datetime: 日期时间 datetimerange: 日期时间范围,  daterange 日期范围, monthrange: 月范围
  type: {
    type: 'text',
    value: 'datetimerange',
    style: 2
  },
  'range-separator': {
    type: 'text',
    value: '至'
  },
  'start-placeholder': {
    type: 'text',
    value: '开始日期',
  },
  'end-placeholder': {
    type: 'text',
    value: '结束日期',
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
