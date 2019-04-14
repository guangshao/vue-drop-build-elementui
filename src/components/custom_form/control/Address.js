import { regionData } from 'element-china-area-data'
import { getStringTypeAttr } from '@/components/template'

export default (_self, h) => {
  return [
    h('ElCascader', {
      props: {
        placeholder: _self.obj.placeholder.value,
        options: regionData,
        value: _self.obj.value || [],
        filterable: false,
        'change-on-select': true
      }
    })
  ];
}

export const addressTag = (obj) => {
  const config = Object.assign(addressConf, obj)
  config.debounce.ignore = !config.filterable.value
  config.option = JSON.parse(JSON.stringify(config.dataSource))
  config.option.ignore = false
  console.log(config)
  return `<el-cascader ${getStringTypeAttr(config)}>
          </el-cascader>`
};

export let addressConf = {
  modalTitle: {
    type: 'text',
    value: '省市区',
    ignore: true
  },
  // 控件左侧label内容
  label: {
    type: 'text',
    value: '省市区',
    ignore: true
  },
  placeholder: {
    type: 'text',
    value: '请选择区域',
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
  // 引入数据源
  dataSource: {
    type: '',
    value: '',
    ignore: true
  },
  // 是否可搜索
  filterable: {
    type: 'radio',
    value: false,
    default: false
  },
  // 搜索关键词输入的去抖延迟，毫秒
  debounce: {
    type: 'input',
    value: 200,
    ignore: true
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
