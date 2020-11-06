// 这里封装好通过axios向豆瓣服务器发起请求的函数，
import axios from 'axios' 

//movie.vue 
//1.搜索
export function apiSearch(s,page,){
  return axios({
    method:'get', 
    url:'/api/movie/search', 
    params: { 
      s:s,
      page:page
    }
  })
}