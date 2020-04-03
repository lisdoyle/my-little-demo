import Vue from 'vue'
import Vuex from 'vuex'
import product_data from '../product.js'

Vue.use(Vuex)

//---- 一些公共方法----
// 1.数组去重方法
function getFilterArray(arrary){
  var set = new Set(arrary)
  var arr = [...set]
  return arr
}

//---- 一些公共方法----


export default new Vuex.Store({
  // 数据
  state: {
    // 全部商品列表信息
    productList: product_data,
  },
  // 类似function，只能同步方式
  mutations: {
 
    
    
  },
  // 计算属性
  getters:{
    // 1.返回去重后品牌
    brands(state){
      var arr = state.productList.map(function(item){
        return item.brand
      })
      // 去重，返回
      return getFilterArray(arr)
    },

    // 2.返回去重后颜色
    colors(state){
      var arr = state.productList.map(function(item){
        return item.color
      })
      // 去重，返回
      return getFilterArray(arr)
    },
  },
  // 处理异步方法
  actions: {
  },
  // 分割成模块
  modules: {
  }
})
