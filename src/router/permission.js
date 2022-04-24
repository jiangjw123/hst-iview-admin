import router from '@/router'
import store from '@/store'
import iView from 'iview'

import { getToken } from '@/utils/util'
// import cookie 

const allowList = ['login'] // no redirect allowList
const loginRoutePath = '/login'
const defaultRoutePath = '/dashboard'

router.beforeEach((to, from, next) => {
  // 刷新显示loading
  iView.LoadingBar.start() // start progress bar
  let token = getToken()

  /* has token */
  if (token) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      iView.LoadingBar.finish()
    } else {
      if (store.getters.addRouters.length === 0) {
        store.dispatch('getUserInfo').then(() => {
          store.dispatch('generateRoutes').then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next()
    } else {
      if (to.path === '/') {
        next({ path: loginRoutePath })
        iView.LoadingBar.finish()
      }
    }
  }
})

router.afterEach(() => {
  iView.LoadingBar.finish() // finish progress bar
})
