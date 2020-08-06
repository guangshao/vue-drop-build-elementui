/*
 * @Author: guang
 * @Date: 2020-08-02 12:46:59
 * @LastEditTime: 2020-08-05 16:34:58
 * @LastEditors: guang
 * @Description:
 */
import { getAttrString } from "@/utils/getAttrString";
import { formTag } from "@customForm/config/formItemsConfig.js";
import { extend } from "@/utils/public";
import _ from "lodash";
const formItemConf = {
    // 控件左侧label内容
    label: {
        type: "string",
        value: "",
        ignore: false
    },
    // 表单关联字段
    prop: {
        type: "string",
        value: "",
        ignore: true
    },
    "v-model": {
        type: "string",
        value: "",
        ignore: true
    }
};

export const getFormItemStr = (ele, attrs) => {
    console.log("getFormItemStr", attrs);
    const config = extend(formItemConf, attrs);
    config["prop"].value = config["v-model"].value;
    // 是否添加校验字段
    config["prop"].ignore = !attrs.require.value;
    const childConf = _.cloneDeep(attrs);
    childConf["v-model"].value = `formData.${childConf["v-model"].value}`;
    const temp = formTag[ele.toLowerCase()] && formTag[ele.toLowerCase()](childConf);
    return `<el-form-item ${getAttrString(config)}> ${temp}
        </el-form-item>`;
};
