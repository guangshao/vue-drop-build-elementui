/*
 * @Author: guang
 * @Date: 2020-08-04 16:39:11
 * @LastEditTime: 2020-08-04 19:09:02
 * @LastEditors: guang
 * @Description:
 */
import { getAttrString } from "@/utils/getAttrString";
import { extend } from "@/utils/public";

export let optionConf = {
    value: {
        type: "text",
        value: ""
    },
    dataSource: {
        type: "",
        value: "",
        ignore: true
    }
};

export const optionTag = attrs => {
    const config = extend(optionConf, attrs);
    let stringAttr = getAttrString(config);
    const dataSourceAttr = config.dataSource.value
        ? `:label="value" :key="key"  :value="value" v-for="(value,key) in ${config.dataSource.value}"`
        : "";
    let template = `<el-option
                    ${dataSourceAttr}
                    ${stringAttr}>
                  </el-option>`;
    return template;
};
