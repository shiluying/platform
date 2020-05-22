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
import Good from '@/views/Good'
import GoodInfo from '@/views/GoodInfo'
import OrderInfo from '@/views/OrderInfo'
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
      redirect: '/UserContainer/good',
      name: 'UserContainer',
      component: UserContainer,
      children: [
        {
          path: '/UserContainer/good', name: '主页', component: Good
        },
        {
          path: '/UserContainer/userComment', name: '用户评论', component: UserComment
        },
        {
          path: '/UserContainer/goodInfo', name: '商品信息', component: GoodInfo
        },
        {
          path: '/UserContainer/orderInfo', name: '订单信息', component: OrderInfo
        }
      ]
    }
  ]
})
