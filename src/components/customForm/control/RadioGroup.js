import { getAttrString } from "@/utils/getAttrString";
import { radioTag, radioConf } from "./Radio";

let config = {
    items: {
        type: "select",
        value: [
            { label_value: "1", label_name: "单选框1" },
            { label_value: "2", label_name: "单选框2" }
        ],
        ignore: true
    },
    // 控件左侧label内容
    label: {
        type: "text",
        value: "单项选择",
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
config = Object.assign(config, radioConf);
const sort = ["items", "label", "v-model", "@change", "require", "readonly"];
export default {
    render: (_self, h) => [
        h(
            "ElRadioGroup",
            {
                props: {
                    value: _self.config.value || "-1"
                }
            },
            _self.config.items.value.map(v =>
                h(
                    "ElRadio",
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

        const radioConf = JSON.parse(JSON.stringify(newConfig));
        const radioTamplte = radioTag(radioConf);

        let stringAttr = getAttrString(newConfig);
        let template = `<el-radio-group ${stringAttr}>
                    ${radioTamplte}
                  </el-radio-group>`;
        return template;
    },
    config,
    sort
};
