import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Index from '@/pages/index'
import EnterIndex from '@/pages/enterIndex'
import Settings from '@/pages/settings'
import Recruit from '@/pages/enterprise/recruit'
import Apply from '@/pages/apply/apply'
import Detail from '@/pages/apply/detail'
import Resume from '@/pages/apply/resume'
import UserInfo from '@/pages/apply/info'
import Deliver from '@/pages/apply/deliver'
import EnterDeliver from '@/pages/enterprise/deliver'
import Certificate from '@/pages/enterprise/certificate'
import EnterInfo from '@/pages/enterprise/info'
import Job from '@/pages/enterprise/job'

Vue.use(Router)

export default new Router({
  routes: [
    // 用户端
    {
      path: '/',
      name: '首页',
      component: Index,
      redirect: '/login',
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
              component: UserInfo
            },
            {
              path: 'resume',
              name: '我的简历',
              component: Resume
            },
            {
              path: 'deliver',
              name: '我的投递',
              component: Deliver
            }
          ]
        },
        {
          path: 'apply',
          name: '找工作',
          component: Apply,
        },
        {
          path: 'detail/:job_id',
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
              component: Job
            },
            {
              path: 'deliver',
              name: '投递管理',
              component: EnterDeliver
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
