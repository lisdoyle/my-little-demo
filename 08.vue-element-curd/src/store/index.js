import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db:[]
  },
  mutations: {
    // 把“添加的数据”保存如db中
    // add(state,payload){
    //   state.db.push(payload)
    // },
    
    // 删除数据，根据id删除
    delete(state,id){
      let arr = state.db
      for(let i=0;i<arr.length;i++){
        if(arr[i].id === id){
          arr.splice(i,1)
          console.log("删除id:"+id)
        }
      }
    },
    // // 编辑数据，根据id号替换数据
    // edit(state,formDate){
    //   let arr = state.db
    //   for(let i=0;i<arr.length;i++){
    //     if(arr[i].id === formDate.id){
    //       arr.splice(i,1,formDate)
    //       console.log("修改id:"+arr[i].id)
    //     }
    //   }
    // },
    
    //获取json数据
    getdata(state,payload){
      state.db = payload
    }

  },
  actions: {
   
    
  },
  modules: {
  }
})
