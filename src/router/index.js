import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Index from '@/pages/index'
import EnterIndex from '@/pages/enterIndex'
import Settings from '@/pages/settings'
import Recruit from '@/pages/enterprise/recruit'
import Apply from '@/pages/apply/apply'
import Detail from '@/pages/apply/detail'
import Certificate from '@/pages/enterprise/certificate'
import EnterInfo from '@/pages/enterprise/info'

Vue.use(Router)

export default new Router({
  routes: [
    // 用户端
    {
      path: '/',
      name: '首页',
      component: Index,
      children: [
        {
          path: 'settings',
          name: '个人中心',
          component: Settings,
          redirect: 'settings/info',
          children: [
            {
              path: 'info',
              name: '基本信息',
            },
            {
              path: 'resume',
              name: '我的简历',
            },
            {
              path: 'deliver',
              name: '我的投递',
            }
          ]
        },
        {
          path: 'apply',
          name: '找工作',
          component: Apply,
        },
        {
          path: 'detail',
          name: '职位详情',
          component: Detail
        }
      ]
    },
    // 企业端
    {
      path: '/enterprise',
      name: '企业首页',
      component: EnterIndex,
      redirect: '/enterprise/recruit',
      children: [
        {
          path: 'settings',
          name: '企业中心',
          component: Settings,
          redirect: 'settings/info',
          children: [
            {
              path: 'info',
              name: '基本信息',
              component: EnterInfo
            },
            {
              path: 'certificate',
              name: '企业认证',
              component: Certificate
            },
            {
              path: 'position',
              name: '职位编辑',
            },
            {
              path: 'deliver',
              name: '投递管理',
            }
          ]
        },
        {
          path: 'recruit',
          name: '发布职位',
          component: Recruit
        },
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    // 管理员端
    {
      path: '/admin',
      name: '后台管理'
    }
  ]
})
