/*
 * @Author: guang
 * @Date: 2020-08-04 16:39:11
 * @LastEditTime: 2020-08-04 19:06:28
 * @LastEditors: guang
 * @Description:
 */
import { regionData } from "element-china-area-data";
import { getAttrString } from "@/utils/getAttrString";

const addressConf = {
    moduleTitle: {
        type: "text",
        value: "省市区",
        ignore: true
    },
    // 控件左侧label内容
    label: {
        type: "text",
        value: "省市区",
        ignore: true
    },
    placeholder: {
        type: "text",
        value: "请选择区域"
    },
    // 表单关联字段
    "v-model": {
        type: "text",
        value: ""
    },
    // 验证错误提示信息
    ruleError: {
        type: "text",
        value: "该字段不能为空",
        ignore: true
    },
    // 引入数据源
    dataSource: {
        type: "",
        value: "",
        ignore: true
    },
    // 是否可搜索
    filterable: {
        type: "radio",
        value: false,
        default: false
    },
    // 搜索关键词输入的去抖延迟，毫秒
    debounce: {
        type: "input",
        value: 200,
        ignore: true
    },
    // 是否必填
    require: {
        type: "radio",
        value: true,
        ignore: true
    },
    // 是否显示可清空按钮
    clearable: {
        type: "radio",
        default: false,
        value: false
    },
    //  是否只读
    readonly: {
        type: "radio",
        default: false,
        value: false
    }
};
const sort = [];
export default {
    render: (_self, h) => [
        h("ElCascader", {
            props: {
                placeholder: _self.config.placeholder.value,
                options: regionData,
                value: _self.config.value || [],
                filterable: false,
                "change-on-select": true
            }
        })
    ],
    tag: attrs => {
        const config = Object.assign(addressConf, attrs);
        config.debounce.ignore = !config.filterable.value;
        config.option = JSON.parse(JSON.stringify(config.dataSource));
        config.option.ignore = false;
        console.log(config);
        return `<el-cascader ${getAttrString(config)}>
            </el-cascader>`;
    },
    config: addressConf,
    sort
};
