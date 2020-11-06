# 09.vue-cli-douban

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


---
typora-copy-images-to: typora笔记图片
typora-root-url: typora笔记图片
---



# 前言

> 本项目根据https://zhuanlan.zhihu.com/p/35174581 教程
>
> 并结合https://www.jianshu.com/p/a05c0100e724教程编写
>
> 因豆瓣请求api掉线了，本项目暂时暂停。
>
> 下步计划，等待豆瓣api上线后，封装所有方法，把电影数据导入页面。
>
> - [x] 现在基本页面搭建完成，
>
> - [x] api跨域问题（用proxy解决）
> - [ ] 组件切换动画

# 运行项目

```bash
# 安装依赖
npm install

# 运行项目
npm run serve

```

# 关闭ESlint

>创建vue.config.js文件,保存好后重新打包

```js
// vue.config.js

module.exports = {
      lintOnSave:false,
      devServer: {
            overlay:{
                  warning:false,
                  errors:false
            },
      }     
}
```



# 分析路由

> 我们先思考路由如何布置，首先我们view文件夹中应该有“电影、图书、广播、小组、搜索”这5个页面，并且还有一个home主页。
>
> ![image-20200923102506342](http://img.joyceliu.icu/images/2020/11/06/image-20200923102506342.png)

```js
//router/index.js

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routers = [
    {
    path:'/book',
    name:'Book',
    component:()=>import(/* webpackChunkName: "book" */ '@/views/Book.vue')
  },
  {
    path:'/group',
    name:'Group',
    component:()=>import(/* webpackChunkName: "group" */ '@/views/Group.vue')
  },
  {
    path:'/home',
    name:'Home',
    component:()=>import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path:'/movie',
    name:'Movie',
    component:()=>import(/* webpackChunkName: "movie" */ '@/views/Movie.vue')
  },
  {
    path:'/podcast',
    name:'Podcast',
    component:()=>import(/* webpackChunkName: "podcast" */ '@/views/Podcast.vue')
  },
  {
    path:'/search',
    name:'Search',
    component:()=>import(/* webpackChunkName: "search" */ '@/views/Search.vue')
  },
]

//把路由规则打包成一个组件
const router = new VueRouter({
  routes
})
//把这个路由组件暴露出去
export default router
```



# data.js数据库

> 现在本利创建数据库 data.js,稍后再处理服务器api的问题。

```js
var data= {
  //1.推荐文章列表
  recommendData: [
    { id: 1, 
      title:'', //标题
      target:{
        desc:'', //文章摘要
        author:{
          name:'',//作者名字
        }
      },
    },
    { id: 2, 
      title:'', //标题
      target:{
        desc:'', //文章摘要
        author:{
          name:'',//作者名字
        }
      },
    },
  ],
    
  //
}

export default data
```



# 创建公共组件

## header组件

> header组件是每页都存在的头部组件，样式如下：

![image-20200922113936339](http://img.joyceliu.icu/images/2020/11/06/image-20200922113936339.png)

> 其中`“flex-grow”`可以在felx中按比例分配剩余空间；
>
> `white-space: nowrap;`可以让空格不换行，从而达到中文字不换行

![](http://img.joyceliu.icu/images/2020/11/06/202009241147.gif)



```html
<template>
  <div class="header">
    <router-link class="title" to="/home">
      <h1>豆瓣</h1>
    </router-link>
    <ul class="nav">
      <li>
        <router-link class="movie" to="/movie">电影</router-link>
      </li>
      <li>
        <router-link class="book" to="/book">图书</router-link>
      </li>
      <li>
        <router-link class="podcast" to="/podcast">广播</router-link>
      </li>
      <li>
        <router-link class="group" to="/group">小组</router-link>
      </li>
      <li>
        <router-link class="search" to="/search">搜索</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 650px;
    padding: 0 18px;
    background: #ffffff;
    border-bottom: 1px solid #f3f3f3;
    margin: 0 auto;
    max-width: 650px;
    height: 47px;

    a{
      text-decoration: none;
      font-size: 15px;
      white-space: nowrap; //不换行
    }
    .title{
      flex-grow: 1; //等分剩余空间
      h1{
        font-weight:bold;
        color: #00b600;
        font-size: 20px;
      }
    }
    .nav{
      display: flex;
      justify-content: space-between;
      list-style: none;
      flex-grow: 1;

      .movie{
        color:#2384E8;
      }
      .book{
        color:#9F7860;
      }
      .podcast{
        color:#E4A813;
      }
      .group{
        color:#2AB8CC;
      }
      .search{
        color:#00b600;
      }
    }
  }
</style>
```



## footer组件

> 创建底部组件，样式如下，代码比较简单这里就不放：

![image-20200924150704251](http://img.joyceliu.icu/images/2020/11/06/image-20200924150704251.png)




# 1.home主页面

> home.vue由header+选项+recommendList组成，先创建这个recommendList.vue组件
>
> ![img](http://img.joyceliu.icu/images/2020/11/06/10886634-574991ecd89fb99c.jpg)


## recommendList首页推荐

> 用在home首页的推荐组件，样式如下：
>
> ![image-20200925165557806](http://img.joyceliu.icu/images/2020/11/06/image-20200925165557806.png)



> 因为还没有链接豆瓣api，我们获取的是data.js中的数据

```html
<div class="recommendList">
    <!-- 如有图片显示图片 -->
    <div v-if="hasImg">
        <div class="rightImg">
            <img :src="imgUrl" />
        </div>
        <div class="leftContent">
            <h3 class="title">{{listItem.title}}</h3>
            <p class="desc">{{listItem.target.desc}}</p>
        </div>
    </div>

    <!-- 没有图片，内容占100% -->
    <div v-else>
        <div class="leftContent" style="width:100%;">
            <h3 class="title">{{listItem.title}}</h3>
            <p class="desc">{{listItem.target.desc}}</p>
        </div>
    </div>

    <!-- 作者名字 -->
    <div class="author">
        <span>by {{listItem.target.author.name}}</span>
    </div>
</div>
```

```js
export default {
props:[
    'item', //接受来自home传来的data.js文章项目
  ],
data(){
    return {
      hasImg:'' ,//是否有图片
      imgUrl:'', //图片链接
      listItem: this.item //推荐文章列表
    }
  },
}
```

### 1.限定文本框行数

> 如果文章的文本过长，如何限定一个文本框的行数呢？可以使用一个非正式css属性技术[原理文档](https://www.html.cn/book/css/webkit/text/line-clamp.htm)
>
> ![image-20200927165558361](http://img.joyceliu.icu/images/2020/11/06/image-20200927165558361.png)

```css
p{
	//限定文本为3行，多出省略
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3; //块元素显示的文本的行数
}
```

### 2.从prop获取文章

> recommendList.vue承载的是一篇文章的组件，那么这个文章数据来之外部，home.vue通过prop传给recommendList，于是我们要创建一个接受文章的prop属性。

```html
<!--home.vue-->
<!--home获取到数据库中的数据通过item传给RecommendList组件-->
<RecommendList :item="item"></RecommendList>
```


## home页面

> 效果如下，由三部分组成，“header+选项+首页推荐”，"首页推荐"我们刚才已完成，再把前两部分搭起来：

>![img](http://img.joyceliu.icu/images/2020/11/06/10886634-574991ecd89fb99cfb25126e868c120c.jpg)

### 1.选项

```html
<ul class="subNav">
    <li class="subNavItem">
    <router-link to="">影院热映</router-link>
    </li>
    <li class="subNavItem">
    <router-link to="">近期值得看的美剧</router-link>
    </li>
    <li class="subNavItem">
    <router-link to="">豆瓣时间</router-link>
    </li>
    <li class="subNavItem">
    <router-link to="">使用豆瓣App</router-link>
    </li>
</ul>

<style lang="scss" scoped>
.subNav {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .subNavItem {
    width: 50%;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;
    a {
      display: block;
      padding: 10px;
      color: #494949;
      background: #f6f6f6;
      //不换行不溢出
      overflow: hidden;
      text-overflow: ellipsis; 
      white-space: nowrap;
    }
  }
}
</style>
```

![image-20200925154546589](http://img.joyceliu.icu/images/2020/11/06/image-20200925154546589.png)



### 2.插入推荐组件

> 组件recommendList.vue，已在公共组件中创立，这里我们引入就好了。
>
> 因为`创建的recommendList.vue只承载一篇文章内容`，因此，我们需要用v-for来把各篇文章传入`recommendList.vue`里，运用`prop属性`。

```html
<a v-for="item in recommendData" 
   :key="item.id"
   href=""
>
    <RecommendList :item="item"></RecommendList>
</a>
```

> 同时获取数据库data.js中文章列表数据，传给recommendData，根据v-for才能把文章渲染处理

```js
import RecommendList from "@/components/RecommendList.vue"; //引入推荐组件
import data from '@/data.js' //引入数据库

export default {
  data () {
    return {
      recommendData: data.recommendData
    }
  },
  components: {
    RecommendList
  }
};
```

# 2.movie主页面

> 搭建电影页面，先搭建 “电影和图书”公用的组件 columnBox.vue，因为两者页面相似，最后我们复用就可以了
>

![img](http://img.joyceliu.icu/images/2020/11/06/166f3c41ff556972.jpg)

## 1.columnBox封面展示组件

>从父级movie.vue中传递“title、items、type“到columnBox.vue中

![image-20200928164517305](http://img.joyceliu.icu/images/2020/11/06/image-20200928164517305.png)

```js
props:[
    "title", //标题
    "items", //电影数据
    "type", //电影还是图书
  ],
```

## 2.rate.vue评分展示

>评分满分为10分，满星为5颗，因此除以2取整，星级展示，分为金色星星数目+半色星星+灰色星星数目

```js
 
 data(){
    return{
      full: 0, //金色星星数目
      half: 0, //半星数目
      gray: 0, //灰色星星数目
    }
  },
methods:{
    // 满分为10分，满星为5颗，因此除以2后，比如8.5/2=4.25，那么：
    // 满星：parseInt(4.25)=4 取整
    // 半星：4.25-满星4=0.25 再 Math.ceil(0.25)=1 向上取整
    // 灰星：5-4.25=0.75 再 Math.floor(0.75)=0 向下取整
    getRating(){
      let value = this.rating
      let num = value / 2
      this.full = parseInt(num)
      this.half = Math.ceil(num-this.full)
      this.gray = Math.floor(5-num)
    }
  },
```



![image-20200930154515507](http://img.joyceliu.icu/images/2020/11/06/image-20200930154515507.png)





# api

>http://t.yushu.im/
>
>[https://api.xhboke.com/doc/movie/#%E8%B1%86%E7%93%A3%E6%90%9C%E7%B4%A2](https://api.xhboke.com/doc/movie/#豆瓣搜索)

https://blog.csdn.net/HaiJun_Aion/article/details/88832713/

https://blog.csdn.net/qq_36157085/article/details/84898334

http://www.doubanapi.com/



https://juejin.im/post/6844903905524973575#heading-5

https://www.cnblogs.com/xfcao/p/11656029.html



https://cli.vuejs.org/zh/config/#devserver-proxy

```bash
#正在热映
http://t.yushu.im/v2/movie/in_theaters
```

## 1.安装axios

> 利用axios达到异步请求。向服务器获取数据。

```bash
npm i axios -S
#安装axios 库
```

```bash
#在vue-cli入口文件main.js引入axios

import axios from 'axios' 
#引入axios库 
Vue.prototype.$axios = axios  
#把axios对象绑定到vue的原型链上，这样vue的实例都能用axios，全局使用 this.$axios
```

![image-20201009111914433](http://img.joyceliu.icu/images/2020/11/06/image-20201009111914433.png)

## 2.jsonp(没搞懂替换为proxy方法解决跨域)

> jsonp是使用script、img、iframe没有同源限制的标签，来绕过同源策略向外部服务器获取数据的方法，但vue axios不支持直接使用jsonp这种写法，于是我们要安装专门针对vue的jsonp包来使用。
>
> [npm jsonp包网址](https://www.npmjs.com/package/jsonp)

最基础的jsonp跨域例子：

> 通过设置`callback=`回调函数来处理获取到的返回数据

```html
// test.html
<script>
  function test(data) {
    console.log(data);
    return data;
  }
</script>
<script
  type="text/javascript"
  src="http://127.0.0.1:8090/v1/system/user/getTotal?callback=test"
></script>

```

### 2.1 vue中使用

> vue要使用jsonp，可以安装专用包

```bash
#安装jsonp
npm install jsonp -S
```

### 2.2 封装jsonp

> 新建一个文件`jsonp.js`，用来放我们封装的jsonp工具

```js
// jsonp.js

import originJSOP from 'jsonp'  //引入jsonp
```

> 根据jsonp的文档，我们知道jsonp需要三个参数:
>
> ### jsonp(url, opts, fn)
>
> - `url` (`String`) url to fetch（服务器端数据接口地址）
> - `opts`(`Object`), optional
> > - `param` (`String`) name of the query string parameter to specify the callback (defaults to `callback`)（默认是callback,这是与后端约定的参数名称，也可以随便定义，只要前后端统一）
> >  - `timeout` (`Number`) how long after a timeout error is emitted. `0` to disable (defaults to `60000`)（请求超时时间）
> > - `prefix` (`String`) prefix for the global callback functions that handle jsonp responses (defaults to `__jp`)（callback值的前缀，默认是__jp）
> >  - `name` (`String`) name of the global callback functions that handle jsonp responses (defaults to `prefix` + incremented counter)（指定全局注册的回调方法名，一般不会用到，因为默认是prefix+自增数字）
>
> - `fn` callback（回调方法，用es6 Promise，回调时会放入两个参数fn(err,data)，如果err，data会有错误信息)

其中`opts`需要配置一下

```js
var options = {
    parma: "callback",
    timeout: 5000,
    prefix: "",
    name: "callbackFun"
  };
  // jsonp会根据这个配置拼接url
  // 例如上面的配合拼接后是：url+?callback=callbackFun
  // 假如url中已经有参数了：url+&callback=callbackFun
```

## 3.devServer.proxy  解决跨域

> 因为调试jsonp不成功，这里改用devServer.proxy通过服务器代理方式绕过浏览器跨域。

### 3.1 开启proxy

>devServer.proxy是webpack中的设置参数，因为vue-cli是webpack的封装，我们只要在vue.config.js中设置devServer.proxy参数，启用代理api方式，把同源的请求替换成非同源请求，就可以跨域了。

> 在vue.config.js文件中配置一下内容：

```js
module.exports = {
  devServer: {
    //通过webpack的代理来处理跨域api
    proxy:{
      '/api':{ //匹配开头是‘/api/...’的url
        target:'https://api.xhboke.com/', //替换成‘https://api.xhboke.com/api/...’
        pathRewrite:{'^/api' : ''}, // 重写，去掉‘/api’,‘https://api.xhboke.com/...’
        changeOrigin:true, // target为域名时true
        secure:false, //不检查安全问题,可以接受运行在HTTPS上
      },
    }
  }
}
```

### 3.2 配合axios使用

> 因为配置了devServer.proxy，所以当请求url带有“/api”时，就会匹配规则来处理，先从浏览器发出同源的url，骗过游览器，请求到达服务器后修改为真正需要访问的非同源url



> 以要访问`https://api.xhboke.com/movie/search?s=肖申克的救赎&page=0`为例，
>
> 我们在前端先要访问的是自己同源的地址`http://localhost:8080/api/movie/search?s=肖申克的救赎&page=0`
>
> 骗过游览器后再通过代理修改成正确的地址。

```html
//movie.vue组件

<template>
    <div class="movie">  
    
        <button @click="search">search</button>

    </div>
</template>

<script>
export default {
//axios在入口文件中已经引入，具体看axios vue中的运用
methods:{
    search(){
        this.$axios({
            method:'get', 
            url:'/api/movie/search', 
            params: { 
              s:'肖申克的救赎',
              page:0
            }// 拼接成http://localhost:8080/api/movie/search?s=肖申克的救赎&page=0
        })
        .then((response)=>{
            //axios返回值会包含状态码等信息
            console.log(response)
            //返回值中的.data就是我们需要的搜索结果
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },
}

}
</script>
```

## 4.封装成一个js文件

> 如第三步的设置，我们可以把所有通过axios访问豆瓣服务器的请求，封装成在一个js文件里，这样方便我们管理。

### 4.1创建api.js文件

```js
// api.js 这里封装好通过axios向豆瓣服务器发起请求的函数，

import axios from 'axios' //引入axios

//movie.vue api
//1.搜索
//s:搜索关键字；page：页数
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
//export 把这个函数暴露出去
//return axios是一个promise对象，把axios整个返回出去，这样后面引用时才能用.then方法
```

### 4.2 引入api方法

>在movie.vue组件中引入api.js文件，导入apiSearch搜索方法，然后直接填入参数执行

```js
//movie.vue

import {
  apiSearch
} from '@/api.js' //引入封装的api

export default {
methods:{
    search(){
        //引入的搜索方法
        apiSearch('肖申克的救赎',0)
        .then((response)=>{ //成功时
            console.log(response)
        })
        .catch((error)=>{//失败时
            console.log(error)
        })
    }
}
}
```

>其他方法一样，通过在api.js文件中先封装，然后在各个组件中调用，这样方便管理api方法

# 其他问题

## 1.公共css样式引入顺序

> 项目中需要引入一个控制全局样式的`main.css`文件，打包后会和组件中的`scoped样式`有引入顺序的问题，这里整理一下

###  1、在main.js中引入

> 在打包的入口文件中引入main.css，若在`app.vue前引入`，`打包后main.css会在组件样式的前面`



 ![image-20200925105114099](http://img.joyceliu.icu/images/2020/11/06/image-20200925105114099.png)

 ![image-20200925105053630](http://img.joyceliu.icu/images/2020/11/06/image-20200925105053630.png)

*前面引入，打包后main.css在前面*

>若在`app.vue后引入`，`打包后main.css会在组件样式的最后面`

> 造成这原因是因为app.vue是所有组件的父级组件，引入app.vue才会引入其他的组件，因此，`先main.css后app.vue`这样后面修改组件中`scoped样式就能覆盖main.css的样式。`

### 2、在index.html中引入

> 还可以在模板页面index.html中引入公共的css样式文件，但我们发现index.html是属于`public文件夹`（即打包时不做处理，只是原样复制），因此我们在`index.html中引入的css样式地址也要放在public文件夹下`，这样css文件才不会被打包，打包后，index.html才能正确的根据引入地址找到css文件。

![image-20200925112248288](http://img.joyceliu.icu/images/2020/11/06/image-20200925112248288.png)



### 3、scoped的作用

> scoped的原理是给dom元素加上`data-v-编号`，从而只把样式作用于自己的私域中，而不污染别的组件。

> 按照这个原理，scoped的作用是组件样式只影响自己私域，不影响别的组件；而不是有的人误以为的，把组件的样式封闭起来不受别的样式影响，这句话的错误是，虽然加了scoped的组件样式不影响别的域，但是别的样式是可以影响这个scoped组件的。

```html
<!-- 组件样式 在前 -->
<style lang="scss" scoped>
p{
    color:red;
}
</style>

<!-- 全局样式 在后-->
<style lang="scss" >
p{
    color:blue;
}
</style>

<!--
根据上面提到的引入顺序，若最后打包 组件样式在前，全局样式在后，如这代码，那么，全局样式依然会覆盖之前的，最后 p的颜色是blue ，scoped只是保证自己样式不影响别的域，但别的样式是可以影响它自己。
-->
```

## 2.&&和||判断用法

> 本质是什么呢？&& 和 || 的作用只有一个(定义)：
>
> 进行布尔值的且和或的运算。**`当运算到某一个变量就得出最终结果之后，就返回哪个变量。`**



>**a || b：**如果a是true，那么b不管是true还是false，都返回true。因此不用判断b了，这个其实不就是返回a了吗，因为a是true，因此返回a。

> 如果a是false，那么就要判断b，如果b是true，那么返回true，如果b是false，返回false，其实不就是返回b了吗。

> **a&& b：**如果a是false，那么b不管是true还是false，都返回false，因此不用判断b了，这个时候刚好判断到a，因此返回a。

> 如果a是true，那么就要在判断b，和刚刚一样，不管b是true是false，都返回b。

## 3.v-for 直接循环数字

> 一般使用 `v-for=“item in array”`循环数组里面的项目次数；
>
> 但，直接`v-for="item in 5"`可以循环5次，因此可以直接循环数字次数，例如，用在星级评分组件：

```html
<span class="star full" v-for="{n, index} in full" :key="index"></span>

<span class="star half" v-for="{n, index} in half" :key="index"></span>

<span class="star gray" v-for="{n, index} in gray" :key="index"></span>
```

> 其中的“full”、“half”、“gray”表示“金色星星”、“半星”、“灰星”的数量，
>
> 如当full=5时，v-for=“n in 5",这样会循环复制三份一模一样的< span > DOM元素

