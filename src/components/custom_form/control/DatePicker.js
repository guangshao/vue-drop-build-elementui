import { getStringTypeAttr } from '@/components/template'

export default (_self, h) => {
  return [
    h('ElDatePicker', {
      props: {
        placeholder: _self.obj.placeholder.value,
        type: _self.obj.type.value,
        value: _self.obj.value || []
      }
    })
  ];
}

export const datePickerTag = (obj) => {
  const config = Object.assign(datePickerConf, obj)
  return `<el-date-picker ${getStringTypeAttr(config)}>
          </el-date-picker>`
};

export let datePickerConf = {
  modalTitle: {
    type: 'text',
    value: '日期选择器',
    ignore: true
  },
  // 控件左侧label内容
  label: {
    type: 'text',
    value: '日期选择器',
    ignore: true
  },
  // 日期选择类型 year: 年, month: 月, date: 日, dates: 多个日期, week: 周, datetime: 日期时间 datetimerange: 日期时间范围,  daterange 日期范围, monthrange: 月范围
  type: {
    type: 'text',
    value: 'date',
    style: 1
  },
  placeholder: {
    type: 'text',
    value: '请选择日期',
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
