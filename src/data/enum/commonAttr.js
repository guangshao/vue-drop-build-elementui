/*
 * @Author: your name
 * @Date: 2020-08-03 17:30:58
 * @LastEditTime: 2020-08-05 14:15:50
 * @LastEditors: guang
 * @Description: 组件属性弹出配置
 * @FilePath: \vue-drop-build-elementui-master\src\data\enum.js
 */
const defaultConfig = {
    label: "",
    type: "string",
    placeholder: ""
};
const createConfig = config => Object.assign({}, defaultConfig, config);
export const commonAttr = Object.freeze({
    label: createConfig({
        label: "组件label",
        placeholder: "el-fomt-item的label属性"
    }),
    placeholder: createConfig({
        label: "placeholder",
        placeholder: "请填写默认提示语"
    }),
    "v-model": createConfig({
        label: "表单关联字段",
        group: "attr"
    }),
    require: createConfig({
        label: "是否必填字段",
        type: "boolean"
    }),
    readonly: createConfig({
        label: "是否只读",
        type: "boolean"
    })
});
