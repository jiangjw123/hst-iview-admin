import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/router/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

// 解决动态路由重复添加问题
const createRouter = () =>
  new Router({
    mode: 'history',
    base: '/',
    routes: constantRouterMap
  })

const router = createRouter()

// 定义一个resetRouter 方法，在退出登录时，调用即可
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
