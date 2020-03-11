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