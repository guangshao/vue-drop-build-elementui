/*
 * @Author: guang
 * @Date: 2020-08-04 16:07:21
 * @LastEditTime: 2020-08-05 17:06:53
 * @LastEditors: guang
 * @Description:
 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import customForm from "./components/customForm";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueClipboard from "vue-clipboard2";
import "prismjs";
import "prismjs/themes/prism.css";
import VuePrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles

Vue.component("prism-editor", VuePrismEditor);
Vue.use(customForm);
Vue.use(ElementUI);
// 复制代码
Vue.use(VueClipboard);
Vue.config.productionTip = false;

/* eslint-disable no-new */
const createApp = () =>
    new Vue({
        router,
        render: h => h(App)
    });
createApp().$mount("#app");
