import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Login from '@/views/Login/Login'
import AdminLogin from '@/views/Login/AdminLogin'

import AdminContainer from '@/views/container/AdminContainer'
import Container from '@/views/container/Container'
import UserManage from '@/views/Admin/UserManage'
import GoodManage from '@/views/Admin/GoodManage'

import UserComment from '@/views/comment/UserComment'
import Good from '@/views/good/Good'
import GoodInfo from '@/views/good/GoodInfo'
import OrderInfo from '@/views/order/OrderInfo'
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
      path: '/AdminLogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/AdminContainer',
      redirect: '/AdminContainer/goodmanage',
      name: 'AdminContainer',
      component: AdminContainer,
      children: [
        {
          path: '/AdminContainer/usermanage', name: '用户管理', component: UserManage
        },
        {
          path: '/AdminContainer/goodmanage', name: '商品审核', component: GoodManage
        }
      ]
    },
    {
      path: '/Container',
      redirect: '/Container/good',
      name: 'Container',
      component: Container,
      children: [
        {
          path: '/Container/good', name: '主页', component: Good
        },
        {
          path: '/Container/userComment', name: '用户评论', component: UserComment
        },
        {
          path: '/Container/goodInfo', name: '商品信息', component: GoodInfo
        },
        {
          path: '/Container/orderInfo', name: '订单信息', component: OrderInfo
        }
      ]
    }
  ]
})
