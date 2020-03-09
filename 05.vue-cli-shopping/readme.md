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
> 