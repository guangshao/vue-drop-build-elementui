/*
 * @Author: guang
 * @Date: 2020-08-04 16:39:11
 * @LastEditTime: 2020-08-04 19:10:22
 * @LastEditors: guang
 * @Description:
 */
import { getAttrString } from "@/utils/getAttrString";
import { optionConf } from "./SelectOption";
import { checkboxTag } from "@customForm/control/checkbox";
let config = {
    items: {
        type: "select",
        value: [
            { label_value: "1", label_name: "多选框1" },
            { label_value: "2", label_name: "多选框2" }
        ],
        ignore: true
    },
    moduleTitle: {
        type: "text",
        value: "下拉框",
        ignore: true
    },
    // 控件左侧label内容
    label: {
        type: "text",
        value: "下拉框",
        ignore: true
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
    "@change": {
        type: "text",
        value: ""
    },
    // 是否必填
    require: {
        type: "radio",
        value: true,
        ignore: true
    },
    //  是否只读
    readonly: {
        type: "radio",
        default: false,
        value: false
    },
    // 是否显示可清空按钮
    clearable: {
        type: "radio",
        default: false,
        value: false
    }
};

config = Object.assign(config, optionConf);
const sort = ["label", "v-model", "ruleError", "@change", "require", "readonly", "clearable"];
export default {
    render: (_self, h) => [
        h(
            "ElSelect",
            {
                props: {
                    value: _self.config.value || "-1"
                }
            },
            _self.config.items.value.map(v =>
                h(
                    "ElOption",
                    {
                        props: {
                            label: v.label_value,
                            value: v.label_name
                        }
                    },
                    v.label_name
                )
            )
        )
    ],
    tag: attrs => {
        const newConfig = Object.assign(config, attrs);

        const checkboxConf = JSON.parse(JSON.stringify(newConfig));
        const checkboxTamplte = checkboxTag(checkboxConf);

        let stringAttr = getAttrString(newConfig);
        let template = `<el-checkbox-group ${stringAttr}>
                    ${checkboxTamplte}
                  </el-checkbox-group>`;
        return template;
    },
    config,
    sort
};
