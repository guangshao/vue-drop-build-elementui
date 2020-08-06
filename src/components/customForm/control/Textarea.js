import { getAttrString } from "@/utils/getAttrString";

const textareaConf = {
    moduleTitle: {
        type: "text",
        value: "文本框",
        ignore: true
    },
    // 控件左侧label内容
    label: {
        type: "text",
        value: "文本框",
        ignore: true
    },
    placeholder: {
        type: "text",
        value: ""
    },
    // 最大长度
    maxLength: {
        type: "text",
        value: 20
    },
    value: {
        type: "text",
        value: ""
    },
    // 行数
    row: {
        type: "input",
        value: "2"
    },
    // 自动行数
    autosize: {
        type: "radio",
        value: true,
        default: true
    },
    // 最小行数
    minRows: {
        type: "input",
        value: 2,
        ignore: true
    },
    // 最大行数
    maxRows: {
        type: "input",
        value: 6,
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
const sort = [];

export default {
    render: (_self, h) => [
        h("ElInput", {
            props: {
                type: "textarea",
                rows: "2",
                placeholder: _self.config.placeholder.value || "这是一个文本框",
                maxlength: parseInt(_self.config.maxLength.value) || 20,
                value: _self.config.value.value || ""
            }
        })
    ],

    tag: attrs => {
        const config = Object.assign(textareaConf, attrs);
        if (config.autosize.value) {
            config.autosize.value = `{ minRows: ${config.minRows.value}, maxRows: ${config.maxRows.value}}`;
            config.autosize.type = "input";
        }

        return `<el-input type="textarea" ${getAttrString(config)}>
          </el-input>`;
    },
    config: textareaConf,
    sort
};
