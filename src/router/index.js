import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Login from '@/components/Login'
import Register from '@/components/Register'
import AdminIndex from '@/components/AdminIndex'

import Container from '@/container/Container'
import UserManage from '@/views/UserManage'
import GoodManage from '@/views/GoodManage'

import UserContainer from '@/UserContainer/UserContainer'
import UserComment from '@/views/UserComment'
import GoodComment from '@/views/GoodComment'
Vue.use(Router)
Vue.prototype.$axios = Axios

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/AdminIndex',
      name: 'AdminIndex',
      component: AdminIndex
    },
    {
      path: '/Container',
      redirect: '/goodmanage',
      name: 'Container',
      component: Container,
      children: [
        {
          path: '/usermanage', name: '用户管理', component: UserManage
        },
        {
          path: '/goodmanage', name: '商品审核', component: GoodManage
        },
        {
          path: '/goodscan', name: '商品搜索', component: UserManage
        }
      ]
    },
    {
      path: '/UserContainer',
      redirect: '/usercomment',
      name: 'UserContainer',
      component: UserContainer,
      children: [
        {
          path: '/usercomment', name: '用户评论', component: UserComment
        },
        {
          path: '/goodcomment', name: '商品评论', component: GoodComment
        }
      ]
    }
  ]
})
