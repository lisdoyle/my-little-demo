import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db:[
      { 
        "date":"2019-01-01",
        "name":"peter1",
        "email":"peter1@qq.com",
        "title":"title",
        "evaluate":"evaluate",
        "state":"state",
        "id":1
      },
      { 
        "date":"2019-01-02",
        "name":"peter2",
        "email":"peter2@qq.com",
        "title":"title",
        "evaluate":"evaluate",
        "state":"state",
        "id":2
      },
      { 
        "date":"2019-01-03",
        "name":"peter3",
        "email":"peter3@qq.com",
        "title":"title",
        "evaluate":"evaluate",
        "state":"state",
        "id":3
      }
    ]
  },
  mutations: {
    // 把“添加的数据”保存如db中
    add(state,payload){
      state.db.push(payload)
    },
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
    // 编辑数据，根据id号替换数据
    edit(state,formDate){
      let arr = state.db
      for(let i=0;i<arr.length;i++){
        if(arr[i].id === formDate.id){
          arr.splice(i,1,formDate)
          console.log("修改id:"+arr[i].id)
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
