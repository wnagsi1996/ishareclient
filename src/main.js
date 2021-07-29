import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
// import  VConsole  from  'vconsole';
// let vConsole = new VConsole();


import api from '@/api'
Vue.prototype.$api = api; // 将api挂载到vue的原型上


import {icon,image,Locale,Toast,Lazyload } from 'vant'
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US';
Vue.use(icon)
Vue.use(image)
Vue.use(Toast)
Vue.use(Lazyload)
Locale.use('en-US', enUS);
Vue.config.productionTip = false

//引入头部
import Header from '@/components/Header'
Vue.component('Header',Header) 

import './router/purview'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
