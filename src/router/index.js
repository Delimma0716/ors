import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Index from '@/pages/index'
import Positions from '@/pages/apply/positions'
import Detail from '@/pages/apply/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index,
      children: [
        {
          path: 'apply',
          name: '找工作',
          component: Positions,
        },
        {
          path: 'recruit',
          name: '发布职位'
        },
        {
          path: '/detail/:po_id',
          name: '职位详情',
          component: Detail
        },
      ]
    },
    
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/settings',
      name: '个人中心',
    }
  ]
})
