import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Account from '@/components/Account'
import Posts from '@/components/Posts'
import CreateMessage from '@/components/CreateMessage'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/account/:id',
      name: 'account',
      component: Account,
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: 'add/',
      name: 'message-create',
      component: CreateMessage
    },
  ]
  
  const router = new VueRouter({
    routes
  })
  
  export default router