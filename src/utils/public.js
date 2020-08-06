/*
 * @Author: your name
 * @Date: 2020-08-02 12:47:00
 * @LastEditTime: 2020-08-04 18:48:02
 * @LastEditors: guang
 * @Description: In User Settings Edit
 * @FilePath: \vue-drop-build-elementui-master\src\utils\public.js
 */
// 只继承自身的属性
import _ from "lodash";
export const extend = (orgin, tager) => {
    let obj = _.cloneDeep(orgin);
    for (let i in orgin) {
        if (!_.isUndefined(tager[i])) {
            obj[i].value = _.cloneDeep(tager[i].value);
        }
    }
    return obj;
};

export const Attr2Config = arr =>
    arr.reduce((acc, person) => ({ ...acc, [person.key]: person }), {});
