import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ProjectManage from '../components/auto/ProjectManage'
import InterfaceManage from '../components/auto/InterfaceManage'
import CaseManage from '../components/auto/CaseManage'
import CaseExecute from '../components/auto/CaseExecute'
import Deposit from '../components/tool/account/Deposit'
import Auto from '../components/auto/Auto'
import Tool from '../components/tool/Tool'
import Account from '../components/tool/account/Account'
import Report from '../components/auto/Report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: '首页',
      component: Home
    },
    {
      path: '/test',
      redirect: '/dashboard',
    },
    {
      path: '/test/auto',
      name: '接口自动化',
      component: Auto,
      redirect: '/test/auto/project',
      children:[
        {
          path: '/test/auto/project',
          name: '项目管理',
          component: ProjectManage
        },
        {
          path: '/test/auto/interface',
          name: '接口管理',
          component: InterfaceManage
        },
        {
          path: '/test/auto/case',
          name: '用例管理',
          component: CaseManage
        },
        {
          path: '/test/auto/execute',
          name: '用例执行',
          component: CaseExecute
        },
        {
          path: '/test/auto/report',
          name: '报告查看',
          component: Report
        }
      ]
    },
    {
      name: '常用工具',
      path: '/test/tool',
      component: Tool,
      redirect: '/test/tool/account/deposit',
      children: [{
        name: '账户',
        path: '/test/tool/account',
        component: Account,
        redirect: '/test/tool/account/deposit',
        children: [
          {
            path: '/test/tool/account/deposit',
            name: '充值',
            component: Deposit
          }
        ]
      }]
    }
  ],
  mode: "history"
})

