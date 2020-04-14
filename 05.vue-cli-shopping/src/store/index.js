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
    // 用户名
    username:"jj",
    // 全部商品列表信息
    productList: product_data,
    // 购物车数据，商品的id，购买数量
    cartList:[
      {
        id: 1,
        count:3
      },
      {
        id: 2,
        count:1
      },
    ],
  },
  // 类似function，只能同步方式
  mutations: {
    // （增）添加到购物车
    addCart(state, id){
      const isAdded = state.cartList.find(item => item.id === id)
      // 商品如不存在cart中设置为1，存在count++
      if(isAdded){
        isAdded.count++
      }else{
        state.cartList.push({
          id:id,
          count:1
        })
      }
    },
    // (删)删除购物车商品
    deleteCart(state,id){
      const index = state.cartList.findIndex(item => item.id === id)
      state.cartList.splice(index, 1)
    },
    //清空购物车
    emptyCart(state){
      state.cartList = [];
    },
    // (改)修改购物车商品数量
    editCartCount(state, payload){
      const product = state.cartList.find(item => item.id === payload.id);
      product.count += payload.count;
    },
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
