# dss

> 数字化营销系统重构

## 可用命令

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start
# or
npm run serve

# build for dev
npm run build:dev

# build for test
npm run build:test

# build for pre
npm run build:pre

# build for production
npm run build:prod
```

## 缓存页面（进入详情页回退保留参数）

```js
// 1.引入 cacheParams mixin 并配置属性
import cacheParams from "@mixins/cache-params.mixin";
export default {
    cacheParamsRouteName: "customer-detail", // 配置路由 支持 string|array[string] 类型
    // 回来页面回调 仅在非 cacheParamsRouteName 路由回退时调用 一般是异步初始化页面参数等操作
    cacheParamsCallback() {
        // do something
    },
    name: "ComppnenntsName", // 必须
    mixins: [cacheParams] // 使用 mixin
};
// 2.在 `src/config/config.cache-params.js` 文件中 配置上面的组件名称 例：ComppnenntsName
export default ["CustomerList", "CustomerHighSeas", "CustomerPortrait"];
```

## es2020 新语法

```js
// 1.可选链 https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
const obj = { a: {}, b: 2 };
console.log(obj?.a?.a);
// 2. 非undefined且非null"判断 https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator
console.log(0 ?? 1); // 0
console.log(0 || 1); // 1
console.log("" ?? 1); // ''
console.log("" || 1); // 1
```

## el-button 组件

扩充按钮类型 search upload download
不传 slot 时 默认文案为 search：查 询，upload：上 传，download：下 载
当为此三种类型时除 icon 属性无效外其余使用方式与原组件一致

```html
<el-button type="search"></el-button> // [el-icon-search 查 询]
<el-button type="search">搜 索</el-button> // [el-icon-search 搜 索]
<el-button type="upload"></el-button> // [el-icon-upload 上 传]
<el-button type="upload">导 入</el-button> // [el-icon-upload 导 入]
<el-button type="download"></el-button> // [el-icon-download 下 载]
<el-button type="download">导 出</el-button> // [el-icon-download 导 出]
```
