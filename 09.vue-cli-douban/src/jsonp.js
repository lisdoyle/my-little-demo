import originJSOP from 'jsonp'  //引入jsonp包文件



//例如要查询的api为：https://api.xhboke.com/movie/search?s=肖申克的救赎&page=0

// 这里把我们定义过的vjsonp暴露出去：
// url：api的地址段，如“https://api.xhboke.com/movie/search”
// data：地址段后面的参数对象，如：“{s:肖申克的救赎,page:0}”
// option:官方jsonp需要配置的参数（这里我们没有配置，直接使用默认值）

export function vjsonp(url,data,option) {
  // 1、先看看url本来有没有带有参数，有的话就会有‘？’，那么我们后面接上data时就需要用‘&’；若没有我们接上data时就用‘？’
  url += (url.indexOf('?')<0 ? '?' : '&') + formatData(data)
  
  // 2.创一个Promise对象，以后可以回调resolve, reject两个函数(具体使用时用then传入)
  return new Promise(function(resolve, reject){
    //3.1 new Promise 时会执行下面内容
    //3.2 原生jsonp会在请求url后把获取到的内容放入function(err, res)中执行

    originJSOP(url, option, function(err, msg){
      if(!err){
        //如果返回的不是错误，就执行P的回调函数
        resolve(msg)
      }else{
        reject(err)
      }
    })
  })

  //4 把Promise返回出去，这样使用时才能用then填入resolve, reject回调函数
  

}
  


// 格式化参数：
// 把data对象"{s:肖申克的救赎,page:0}"，格式化成用'&'链接形式，如：“s=肖申克的救赎&page=0”
var formatData = function (data){
  let url = ''
  for ( var i in data){
    let value = (data[i] !== undefined) ? data[i] : ''
    url += "&" + i + "=" + encodeURIComponent(value)
  }
  return url ? url.substring(1) : '' //截取字符串，把最前面的&去掉
}


//使用规则
// 1、查询模糊电影 ：
// api：https://api.xhboke.com/movie/search?s=肖申克的救赎&page=0
// s:关键词；page：页数，一页10条数据
// 使用时只要传入data（即s和page参数，就会）
export function getMoviesSearch (data){
  return vjsonp('https://api.xhboke.com/movie/search',data)
}