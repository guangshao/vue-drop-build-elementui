export const formRules = {
  'label.value': [
    { required: true, message: '请输入控件名称', trigger: 'blur' },
  ],
  'v-model.value': [
    { required: true, message: '请输入关联字段名', trigger: 'blur' },
  ],
  'placeholder.value': [
    { required: true, message: '请输入placeholder', trigger: 'blur' },
  ],
  'maxLength.value': [
    { required: true, message: '请输入最大字数限制', trigger: 'blur' },  
  ]
}