import { getAttrString } from "@/utils/getAttrString";
import { checkboxTag, checkboxConf } from "./checkbox";
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
        value: "多选框",
        ignore: true
    },
    // 控件左侧label内容
    label: {
        type: "text",
        value: "多选框",
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
    }
};
config = Object.assign(config, checkboxConf);
const sort = [];
export default {
    render: (_self, h) => [
        h(
            "ElCheckboxGroup",
            {
                props: {
                    value: _self.config.value || "-1"
                }
            },
            _self.config.items.value.map(v =>
                h(
                    "ElCheckbox",
                    {
                        props: {
                            label: v.label_value
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
