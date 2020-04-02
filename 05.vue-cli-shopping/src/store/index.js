import Vue from 'vue'
import Vuex from 'vuex'
import product_data from '../product.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 数据
  state: {
    // 全部商品列表信息
    productList: product_data,
    brands:[],//去重后的品牌
    colors:[],//去重后的颜色
  },
  // 类似function，只能同步方式
  mutations: {
    // 数组去重,
    getFilterArray(state,playload){
      // 4月3日待解决
      // var set = new Set(playload.array)
      // var arr = [...set]
      
    },
    
    
  },
  // 计算属性
  getters:{
    // 品牌、颜色筛选

    // 1.返回所有品牌（包含重复项）
    allBrands(state){
      var arr = state.productList.map(function(item){
        return item.brand
      })
      return arr
    },
    // 2.返回所有颜色
    allColors(state){
      var arr = state.productList.map(function(item){
        return item.color
      })
      return arr
    }
  },
  // 处理异步方法
  actions: {
  },
  // 分割成模块
  modules: {
  }
})
