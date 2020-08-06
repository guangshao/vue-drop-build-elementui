import { getAttrString } from "@/utils/getAttrString";
import { extend } from "@/utils/public";

export const checkboxTag = attrs => {
    const config = extend(checkboxConf, attrs);
    let stringAttr = getAttrString(config);
    const dataSourceAttr = config.dataSource.value
        ? `:label="item.value" :key="item.value" v-for="item in ${config.dataSource.value}"`
        : "";
    let template = `<el-checkbox
                    ${dataSourceAttr}
                    ${stringAttr}>
                  </el-checkbox>`;
    return template;
};

export let checkboxConf = {
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
