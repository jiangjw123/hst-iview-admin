// 路由相关配置写仔这里
import mainPage from '@/layouts/basicLayout'
/**
 * 基础路由
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/login/login')
  }
]

/**
 * 根路由
 */
export const rootRouter = {
  key: '',
  name: 'index',
  path: '/',
  component: mainPage,
  redirect: '/dashboard',
  meta: {
    title: '个人中心'
  },
  children: []
}

export const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true,
  meta: {
    hideInMenu: true
  }
}

/**
 * 其它路由(二级路由)
 */
export const asyncRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/index',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/dashboard/index',
        name: 'dashboard_home',
        meta: {
          title: '面板'
        },
        component: () => import('@/views/home.vue')
      },
      {
        path: '/table',
        name: 'table',
        redirect: '/table/index',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '表格'
        },
        children: [
          {
            path: '/table/index',
            name: 'index',
            meta: {
              title: '表格'
            },
            component: () => import('@/views/table.vue')
          },
          {
            path: 'index',
            name: 'index',
            meta: {
              title: '表格',
              hideInMenu: true
            },
            component: () => import('@/views/home.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/basic',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '用户'
    },
    children: [
      {
        path: '/user/basic',
        name: 'user_basic',
        component: () => import('@/views/user/base.vue'),
        meta: {
          title: '基本信息'
        }
      },
      {
        path: '/user/account',
        name: 'user_account',
        component: () => import('@/views/user/account.vue'),
        meta: {
          title: '账户信息'
        }
      },
      {
        path: '/user/password',
        name: 'user_password',
        component: () => import('@/views/user/base.vue'),
        meta: {
          title: '修改密码'
        }
      }
    ]
  }
]
