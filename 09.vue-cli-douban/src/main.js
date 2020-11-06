import './main.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios' 
//引入axios库 
Vue.prototype.$axios = axios  
//把axios对象绑定到vue的原型链上，这样vue的实例都能用axios，全局使用 this.$axios


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
