import Vue from 'vue'
import Vuex from 'vuex'
import product_data from '../product.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全部商品列表信息
    productList: product_data,
  },
  mutations: {
    

  },
  actions: {
  },
  modules: {
  }
})
