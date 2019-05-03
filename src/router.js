import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Error from './views/404.vue'
import Index from './components/Index'
import UserInfo from './components/UserInfo'
import FundList from './components/FundList'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },{
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'index',
          component: Index
        },{
          path: 'userinfo',
          name: 'userinfo',
          component: UserInfo
        },{
          path: 'fundlist',
          name: 'fundlist',
          component: FundList 
        }
      ]
    },{
      path: '/register',
      name: 'register',
      component: Register
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path:'*',
      name: 'Error',
      component: Error
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
