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

## 6.3把商品列表里每一项传给Product.vue
>注册新的prop属性:info="item"就可以把每一项（item）商品传给Product.vue组件
```html
<Product  v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
```

# 7.Product.vue组件
## 7.1 注册prop属性
>在Product.vue组件内部注册了info属性后，6.3 步骤的item就会传给info了，也就拿到当个商品的信息
```js
props:{
  info: Object //初始化，注册info属性，使info可以接受List.vue中:info="item"传递的单个商品信息
},
```
## 7.2根据info内容搭建商品展示页
>根据info依次显示商品图片、名称、销量、颜色、单价，加入购物车

## 7.3点击跳转详情页ProductInfo.vue
>实现效果为 url=  http://localhost:8080/#/product-info/[商品id号]
```html
<router-link :to="'/product-info/' + info.id"  class="product-main"> 
```

# 8.创建商品详情页ProductInfo.vue
## 8.1 获取路由中的id
>因为在router.js中设置了'/product-info/:id',因此，点击商品后，url跳转为
url = http://localhost:8080/#/product-info/[商品id号], 路由自动匹配[商品id号] 为:id，并可以通过 this.$route.params.id属性获取到[商品id号]

所以在ProductInfo.vue中可以获取商品id号
```js
data(){
  return {
    // 获取路由'/product-info/:id'中的占位符：id的参数
    id: parseInt(this.$route.params.id)
  }
}
```
## 8.2 通过id获取当前商品信息
>从 'this.$store.state.productList'中获取所有商品列表，再通过find匹配出当前id号的商品信息。
```js
getProduct(){
  // 异步获取数据：所有从外部获取数据的操作都用异步处理，防止获取时间过长而导致长时间等待
  setTimeout(() => {
    this.product = this.$store.state.productList.find(item => item.id === this.id);
  },500);
}
```

# 9.处理List.vue中的筛选
## 9.1 ES6 Set类型，数组去重方法
>set对象允许存储任何类型的唯一值,无论是原始值或者是对象引用;
>因此，通过set储存的元素不能有重复项。
```js
var arr = [1,2,3,4,4];
var set = new Set(arr) //数组转换set对象
set //{1,2,3,4}

//从对象转换为数组
[...set] //[1,2,3,4]
```
## 9.2引用去重后的数组
>getters直接计算出去重后的brands和colors数组，List.vue中直接引用getters.brands就能引用数组
>
>mutations只有改变state的作用，因此一些共用方法如：getFilterArray(),我们将它卸载store外面，一个全局的方法
```js
//---- 一些公共方法----
// 1.数组去重方法
function getFilterArray(arrary){
  var set = new Set(arrary)
  var arr = [...set]
  return arr
}
//---- 一些公共方法----

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
```
## 9.3点击筛选品牌功能
>通过css和@click处理按钮样式，
```html
<span>排序:</span>
<button class="btn btn-default"
        :class="{'btn-primary': order ===''}"
        @click="order=''"
>默认</button>
<button class="btn btn-default"
        :class="{'btn-primary': order ==='sales'}"
        @click="order='sales'"
>销量
  <span v-if="order === 'sales'">↓</span>
</button>
<button class="btn btn-default"
        :class="{'btn-primary': order.indexOf('cost')>-1}"
        @click="handleOrderCost"
>价格
  <span v-if="order === 'cost-desc'">↓</span>
  <span v-if="order === 'cost-asc'">↑</span>
</button>
```
>当点按“品牌”或“颜色”筛选按钮时，“filterBrand”和“filterColor”不为空，根据此判断对全部商品列表list，做匹配提取，用的的js的数组方法Array.filter
```js
filteredAndOrderedList(){
  var $this = this
  // 深拷贝
  let list = [...this.list]

  //----筛选操作----//

  // 1.筛选品牌
  if(this.filterBrand !== '' ){
    list = list.filter(function(item){
      return item.brand === $this.filterBrand
    })
  }
  
  // 2.筛选颜色
  if(this.filterColor !== '' ){
    list = list.filter(function(item){
      return item.color === $this.filterColor
    })
  }
}
```

>当点击"排序"按钮时，赋予order不同的值，然后filteredAndOrderedList()根据order值的不同来进行排序工作
```js
if(this.order !==''){
  switch(this.order){
    case 'sales':
      list = list.sort(function(a,b){
        return b.sales-a.sales
      })
    break
    case 'cost-desc':
      list = list.sort(function(a,b){
        return b.cost - a.cost
      })
    break
    case 'cost-asc':
      list = list.sort(function(a,b){
        return a.cost - b.cost
      })
    break
  }
}
```
# 10.创建购物车 Cart.vue
 


# 其它问题
## 1.vue-router 按需加载 
>vue的路由配置文件(routers.js)，一般使用import引入的写法，当项目打包时路由里的所有component都会打包在一个js中，在项目刚进入首页的时候，就会加载所有的组件，所以导致首页加载较慢，而用require会将component分别打包成不同的js，按需加载，访问此路由时才会加载这个js，所以就避免进入首页时加载内容过多。

require: 运行时调用，理论上可以运用在代码的任何地方，import：编译时调用，必须放在文件开头

- import写法：
```js
import userCenter from '@/page/usercenter/index.vue'
export default [
  {
    path: '/userCenter',
    name: 'user-center',
    component: userCenter
  },
  {
    path: '/news/detail',
    name: 'news-detail',
    component: () => import('@/page/news/detail.vue')
  }
]
```

- require写法：
```js

export default [
  {
    path: '/userCenter',
    name: 'user-center',
    component: resolve => require(['@/page/userCenter/index.vue'], resolve)
  },
  {
    path: '/news/detail',
    name: 'news-detail',
    component: () => resolve => require(['@/page/news/detail.vue'], resolve)
  }
]
```

## 2.内容溢出
>内容溢出可以用 overflow：hidden
>文字溢出可以用 text-overflow: ellipsis; 溢出时省略号表示
>文本不会换行white-space: nowrap [具体使用文档](https://www.runoob.com/cssref/pr-text-white-space.html)

```css
/* 文本不换行，当宽度不够时，不会溢出，而是显示省略号 */
p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```