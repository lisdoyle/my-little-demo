# 1.思路
>main.js 为入口js文件，用来加载vue、router、store还有渲染app.vue
>app.vue作为各个组件的入口文件。
>router设置好url后，会在<router-view>中显示

# 2.加入全局css 
>创建/src/main.css,用于控制全局样式,在main.js中引入
```js
// /src/main.js

import './main.css'
```

>通过 @import 在css文件中引入bootstap
```js
@import 'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css';
```

# 3.设置app.vue
> 作为根组件，url=‘/’时，显示app.vue, 在里面设置<router-view>，用于显示子组件。

# 4.创建loginpage.vue 
> loginpage.vue 用于显示 子组件 login和register组件。 
## 4.2 子路由嵌套
>通过children路由嵌套，在loginpage中<router-view>显示不同子组件
```js
{
  path: '/loginpage',
  name: 'loginpage',
  component: loginpage,
  children:[
    //http://localhost:8080/?#/loginpage/login
    {path:'login', component:login}, 
    //http://localhost:8080/?#/loginpage/register
    {path:'register', component:register},
  ]
},
```

# 5.处理静态资源
# 5.2 assets和public区别
>assets下面的资源，会被url-loader解析。
>
>>原理：在所有的*.vue文件中你所有的templates 和CSS 都被vue-html-loader 和css-loader 查询资源的URLs解析. 比如说, 在 <img src=”./logo.png” > 和background: url(./logo.png) 中./logo.png是一个相对资源路径，并且会被Webpack视为一个模块依赖来解析。 因为./logo.png并非一个Javascript，当将它作为模块依赖对待时，我们需要用url-loader和file-loader去处理它。这种公式化处理早已经为你配置了loader，所以你基本上可以获得诸如文件名指纹和有条件的内嵌base64，因此你能够使用相对/模块路径而不必担心部署问题。 自从这些资源可以在build期间被内联/复制/重命名，它们本质上来讲是你资源代码的一部分。事实上，你甚至不必将它们放进/src/assets：webpack打包时会把这些相对路径引用的资源当做模块/组件，用es6的require 方法引入，最终修改好依赖关系的路劲来正确引入。

```js
/* 例子：文件结构
index.html
  | 
  |src
  | |
  | |main.css
  | |
  | |img
  | |  |
  | |  |logo.png

*/

//比如 我们在/src/main.css 中引入了 background: url(./img/logo.png)

{
  background: url(./src/img/logo.png)
}

//main.css最终打包时会被注入index.html，这时index.html中的链接按道理应该是
<style>
{
  background: url(./src/img/logo.png)
}
</style>

//但因为url-loader的关系，链接会当做模块来解析，生成正确的依赖关系，并把图片复制、hash:8重命名、放入vue-cli中loader规则默认图片路径 name: 'img/[name].[hash:8].[ext]'

<style>
{
  background: url(/dist/img/logo.12a545f7.png) //index.html中的路径被处理成依赖关系
}
</style>
```

>public文件夹下的资源会被原封不动的复制一份放到出口路径，默认/dist/下，因此public下的资源一定要使用绝对路径来引用，不然用相对路径就会被loader解析成依赖关系。
>>因此，public适合放入
>>1、一些第三方的引用。
>>2、大量本应该放在服务器的产品图片，现在因为开发需求放在本地项目，这些图片不属于你的项目资源，只是后期需要从服务器垃取的，因此不必通过loader处理依赖关系。
>>3、在项目构建中需要指定一个不变的文件名，这种文件放入public中就不会被修改

# 6.处理商品列表
## 6.1 创建 @/view/List.vue 作为商品列表展示页，其中结构为：
>1. 筛选区
>2. 商品展示区 (Product组件)
>3. 如没商品，则显示提示语“暂无相关商品”
```JS
<!-- 列表控制项 -->
<div class="list-control">
  
</div>

<!-- 商品展示 -->
<Product>

</Product>

<!-- Product中没商品时显示 -->
<div class="product-not-found">
  暂无相关商品
</div>
```

## 6.2 处理商品列表数据
```js
computed:{
  // 1.全部商品数组
  list(){
    //从Vuex获取商品列表信息
    return this.$store.state.productList;
  },
  // 2.经过筛选的商品数组
  filteredAndOrderedList(){
    // 深拷贝
    let list = [...this.list]
    //...这里是筛选代码，筛选后返回list
    return list
  },
}
```
> 把筛选后的 filteredAndOrderedList 通过 v-for 渲染在商品组件 <Product v-for="item in filteredAndOrderedList">product</Product> 上