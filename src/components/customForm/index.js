/*
 * @Author: guang
 * @Date: 2020-08-04 16:39:11
 * @LastEditTime: 2020-08-04 18:57:36
 * @LastEditors: guang
 * @Description:
 */
import render from "./Render";

const customForm = {
    render
};

const install = function(Vue) {
    Vue.component(render.name, render);
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default Object.assign(customForm, { install });
