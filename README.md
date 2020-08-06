# 基于 Vue + Vue.Draggable 实现自定义表单控件

## 运行使用

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

### 文件目录

```
.
├── README.md
├── build
├── config
├── dist
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   │   ├── customForm                   //自定义表单组件
│   │   │   ├── FormList.js               //表单列表
│   │   │   ├── index.js                  //初始化组件
│   │   │   ├── ItemIcon.js               //表单图标配置
│   │   │   ├── Render.js                 //表单列表渲染
│   │   │   ├── RenderTag.js              //表单标签生成
│   │   │   ├── components                //表单公用组件
│   │   │   │   └── Uploads               //上传组件
│   │   │   │       └── upload.vue
│   │   │   ├── control                   //表单控件列表
│   │   │       ├── Address.js            //地区选择
│   │   │       ├── Cascader.js           //多级联动
│   │   │       ├── Checkbox.js           //多选框
│   │   │       ├── CheckboxGroup.js      //多选框组
│   │   │       ├── DatePicker.js         //日期选择器
│   │   │       ├── DatePickerMerange.js  //日期时间选择器
│   │   │       ├── Input.js              //输入框
│   │   │       ├── Radio.js              //单选框
│   │   │       ├── RadioGroup.js         //单选框组
│   │   │       ├── Select.js             //下拉选择框
│   │   │       ├── SelectOption.js       //下拉选择框选项
│   │   │       ├── Textarea.js           //文本域
│   │   │       ├── TimePicker.js         //时间选择器
│   │   │       └── Uploads.js            //上传控件
│   │   │   └── index.js                  //组件注册
│   │   ├── template
│   │   │   └── index.js                  //代码生成封装
│   │   ├── index.vue                     //自定义表单页面
│   ├── main.js                           //入口文件
│   └── router                            //路由配置
│       └── index.js
└── static
```

相关插件：

- [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable) // vue 拖拽
- [Vue.js](https://vuejs.org/)
- [element-ui](http://element-cn.eleme.io/#/zh-CN/component/installation)
- [pretty](https://www.npmjs.com/package/pretty) // 格式化
- [vue-highlightjs](https://www.npmjs.com/package/vue-highlightjs) // 代码高亮
- [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2) // 复制黏贴
