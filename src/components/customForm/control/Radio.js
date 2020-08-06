import { getAttrString } from "@/utils/getAttrString";
import { extend } from "@/utils/public";

export const radioTag = attrs => {
    const config = extend(radioConf, attrs);
    let stringAttr = getAttrString(config);
    const dataSourceAttr = config.dataSource.value
        ? `:label="item.value" :key="item.value" v-for="item in ${config.dataSource.value}"`
        : "";
    let template = `<el-radio
                    ${dataSourceAttr}
                    ${stringAttr}>
                  </el-radio>`;
    return template;
};
export let radioConf = {
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
