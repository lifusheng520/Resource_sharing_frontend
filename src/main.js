// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import i18n from './i18n'


import 'element-ui/lib/theme-chalk/index.css'
import './config/axiosConfig'
import qs from 'qs'

// 配置全局ElementUI
Vue.use(Element);

// 配置全局axios
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$cookies = VueCookies;

Vue.config.productionTip = false;


import '../static/js/main'





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  components: {App},
  template: '<App/>'
});

