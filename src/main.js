// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import custom_form from './components/custom_form';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueClipboard from 'vue-clipboard2'
import VueHighlightJS from 'vue-highlightjs'
import pretty from 'pretty'


Vue.use(custom_form);
Vue.use(ElementUI);
Vue.prototype.$http = axios;
//复制代码
Vue.use(VueClipboard)
//为代码文本提供高亮、缩进
Vue.use(VueHighlightJS)
//为代码文本格式化
Vue.prototype.$prettyDom = pretty
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
