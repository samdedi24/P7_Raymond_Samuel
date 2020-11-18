import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Posts from '@/components/Posts'
import CreateMessage from '@/components/CreateMessage'
import Account from '@/components/Account'

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
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/add',
      name: 'message-create',
      component: CreateMessage
    },
    {
      path: '/account/:id',
      name: 'account',
      component: Account
    },
  ]

  const router = new VueRouter({
    routes
  })

  export default router 