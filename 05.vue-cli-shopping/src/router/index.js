import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import app from '../App.vue'
import loginpage from '../views/loginpage.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'

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
    name: 'loginpage',
    component: loginpage,
    children:[
      {path:'login', component:login},
      {path:'register', component:register},
    ]
  },
  {
    path: '/',
    redirect: '/loginpage/register'
  },
  
]

const router = new VueRouter({
  routes
})

export default router
