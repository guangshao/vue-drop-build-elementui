// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import custom_form from './components/custom_form';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';

//为代码文本提供高亮、缩进
import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)
//为代码文本格式化
import pretty from 'pretty'
Vue.prototype.$prettyDom = pretty
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(cascaderMulti);
Vue.use(custom_form);

// axios.defaults.baseURL = '/apis';
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
