# 基于Vue + Vue.Draggable实现自定义表单控件

## 运行使用

``` bash
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
│   │   ├── custom_form             //自定义表单组件
│   │   │   ├── FormList.js         //表单列表    
│   │   │   ├── ItemIcon.js         //表单图标配置
│   │   │   ├── Render.js           //表单列表渲染
│   │   │   ├── components          //表单公用组件
│   │   │   │   └── Uploads         //上传组件
│   │   │   │       └── upload.vue
│   │   │   ├── config              //配置文件
│   │   │   │   └── trigger.js      //表单验证触发事件
│   │   │   ├── control             //表单控件列表
│   │   │       ├── Address.js      //地区选择
│   │   │       ├── Cascader.js     //多级联动
│   │   │       ├── CheckBox.js     //多选框
│   │   │       ├── DatePicker.js   //时间选择器
│   │   │       ├── Hr.js           //hr标签
│   │   │       ├── Input.js        //输入框
│   │   │       ├── P.js            //p标签
│   │   │       ├── Radio.js        //单选框
│   │   │       ├── Select.js       //下拉选择框
│   │   │       ├── Text.js         //文本域
│   │   │       ├── Title.js        //标题
│   │   │       └── Uploads.js      //上传控件
│   │   │   └── index.js            //控件注册
│   │   ├── index.vue               //自定义表单页面
│   │   └── render.vue              //表单渲染,数据回填页面
│   ├── main.js                     //入口文件
│   └── router                      //路由配置
│       └── index.js
└── static                          
```

相关插件：
- [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
- [Vue.js](https://vuejs.org/)
- [iView](https://www.iviewui.com/docs/guide/install)
