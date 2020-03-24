import Vue from 'vue'
import VueRouter from 'vue-router'
import Loginpage from '../views/Loginpage.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  
  {
    path: '/loginpage',
    name: 'Loginpage',
    component: Loginpage,
    children:[
      {path:'login', component:Login},
      {path:'register', component:Register},
    ]
  },
  {
    path: '/',
    redirect: '/loginpage/register'
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/product-info/:id',
    component: (resovle) => require(['../views/ProductInfo.vue'], resovle)
  }
]

const router = new VueRouter({
  routes
})

export default router
