import Vue from 'vue'
import Vuex from 'vuex'
import product_data from '../product.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 数据
  state: {
    // 全部商品列表信息
    productList: product_data,
  },
  // 类似function，只能同步方式
  mutations: {
    // 数组去重
    getFilterArray(state,playload){
      
    },

  },
  // 计算属性
  getters:{
    // 品牌、颜色筛选
    brands(state){
      const brands = state.productList.map(function(item){
        return item.brand
      })

    }
  },
  // 处理异步方法
  actions: {
  },
  // 分割成模块
  modules: {
  }
})
