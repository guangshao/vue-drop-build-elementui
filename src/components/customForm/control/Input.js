/*
 * @Author: guang
 * @Date: 2020-08-02 12:46:59
 * @LastEditTime: 2020-08-05 14:56:02
 * @LastEditors: guang
 * @Description:
 */
import { getAttrString } from "@/utils/getAttrString";
import { Attr2Config } from "@/utils/public";

/**
 * ignore 该属性不转化为组件属性
 * type 转化为属性字符串时，是否添加：
 * default: 转化为属性字符串时，判读是否需要生成该属性
 */
const sort = [
    {
        key: "label",
        value: "输入框",
        ignore: true
    },
    {
        key: "placeholder",
        type: "string",
        value: ""
    },
    // 表单关联字段
    {
        key: "v-model",
        type: "string",
        value: ""
    },
    // 是否必填
    {
        key: "require",
        value: false,
        ignore: true
    }
];
const inputConfig = Attr2Config(sort);

export default {
    render: (_self, h) => [
        h("ElInput", {
            props: {
                value: ""
            }
        })
    ],
    tag: attrs => {
        console.log(attrs);
        const config = Object.assign({}, inputConfig, attrs);
        return `<el-input ${getAttrString(config)}></el-input>`;
    },
    config: inputConfig,
    sort
};
