import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Login from '@/components/Login'
import Register from '@/components/Register'

import Container from '@/container/Container'
import UserContainer from '@/container/UserContainer'
import UserManage from '@/views/UserManage'
import GoodManage from '@/views/GoodManage'

import UserComment from '@/views/UserComment'
import GoodSearch from '@/views/GoodSearch'
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
      path: '/Container',
      redirect: '/Container/goodmanage',
      name: 'Container',
      component: Container,
      children: [
        {
          path: '/Container/usermanage', name: '用户管理', component: UserManage
        },
        {
          path: '/Container/goodmanage', name: '商品审核', component: GoodManage
        }
      ]
    },
    {
      path: '/UserContainer',
      redirect: '/UserContainer/goodsearch',
      name: 'UserContainer',
      component: UserContainer,
      children: [
        {
          path: '/UserContainer/goodsearch', name: '商品搜索', component: GoodSearch
        },
        {
          path: '/UserContainer/usercomment', name: '用户评论', component: UserComment
        }
      ]
    }
  ]
})
