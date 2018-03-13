import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    }
  ]
})
