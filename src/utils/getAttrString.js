/*
 * @Author: guang
 * @Date: 2020-08-02 12:46:59
 * @LastEditTime: 2020-08-05 16:23:38
 * @LastEditors: guang
 * @Description:
 */

const typeEnum = ["string"]; // 这些类型都不用加bind
const getAttrString = function(attributes) {
    // value为空的不添加到模板中
    let stringAttr = "";
    for (let key in attributes) {
        if (attributes[key].ignore) {
            continue;
        }
        // 默认值不添加
        if (attributes[key].default === attributes[key].value) {
            continue;
        }
        let attrKey;
        if (typeEnum.includes(attributes[key].type)) {
            attrKey = key;
        } else {
            attrKey = `:${key}`;
        }
        let attr = "";
        if (attributes[key].value) {
            attr = `${attrKey}="${attributes[key].value}"\n`;
        }
        stringAttr += attr;
    }
    return stringAttr;
};
export { getAttrString };
