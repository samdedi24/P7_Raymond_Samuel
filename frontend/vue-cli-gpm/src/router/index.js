import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Wall from '@/views/Wall'
import CreateMessage from '@/components/CreateMessage'
import Account from '@/components/Account'
import UpdatePost from '@/components/UpdatePost'
import AllUsers from '@/components/AllUsers'

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
      path: '/all',
      name: 'wall',
      component: Wall
    },
    {
      path: '/add',
      name: 'message-create',
      component: CreateMessage
    },
    {
      path: '/accounts/:id',
      name: 'account',
      component: Account
    },
    {
      path: '/posts/:id',
      name: 'updatePost',
      component: UpdatePost
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AllUsers
    }
  ]

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
  
  export default router;