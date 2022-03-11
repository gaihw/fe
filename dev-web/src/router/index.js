import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ProjectManage from '../components/auto/ProjectManage'
import InterfaceManage from '../components/auto/InterfaceManage'
import CaseManage from '../components/auto/CaseManage'
import CaseExecute from '../components/auto/CaseExecute'
import Deposit from '../components/tool/account/Deposit'
import UserInfo from '../components/tool/account/UserInfo'
import Auto from '../components/auto/Auto'
import Tool from '../components/tool/Tool'
import Account from '../components/tool/account/Account'
import Report from '../components/auto/Report'
import Check from '../components/tool/check/Check'
import UserCheck from '../components/tool/check/UserCheck'
import Balance from '../components/tool/check/Balance'
import SmsCode from '../components/tool/SmsCode'
import Partner from '../components/tool/account/Partner'
import ThroughPositions from '../components/tool/check/ThroughPositions'
import UpdateMarket from '../components/tool/UpdateMarket'

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
      redirect: '/test/tool/account/info',
      children: [{
        name: '账户',
        path: '/test/tool/account',
        component: Account,
        redirect: '/test/tool/account/info',
        children: [
          {
            path: '/test/tool/account/info',
            name: '用户信息',
            component: UserInfo
          },
          {
            path: '/test/tool/account/deposit',
            name: '充值',
            component: Deposit
          },
          {
            path: '/test/tool/account/partner',
            name: '合伙人',
            component: Partner
          }
        ]
      },
      {
        name: '对账',
        path: '/test/tool/check',
        component: Check,
        redirect: '/test/tool/check/balance',
        children: [
          {
            path: '/test/tool/check/balance',
            name: '账单同步',
            component: Balance
          },
          {
            path: '/test/tool/check/userCheck',
            name: '单用户',
            component: UserCheck
          },
          {
            path: '/test/tool/check/throughPositions',
            name: '爆仓计算',
            component: ThroughPositions
          }
        ]
      },
      {
        name: '短信验证码',
        path: '/test/tool/smsCode',
        component: SmsCode
      },
      {
        name: '行情推送',
        path: '/test/tool/symbol',
        component: UpdateMarket
      }
    ]
    }
  ],
  mode: "history"
})

