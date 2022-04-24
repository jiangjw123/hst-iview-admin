import { asyncRouterMap, notFoundRouter, rootRouter } from '@/router/router.config'

/**
 * 动态生成菜单
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve) => {
    // 这里可设置异步请求 请求菜单内容
    const routes = []
    rootRouter.children = asyncRouterMap
    routes.push(rootRouter)
    routes.push(notFoundRouter)
    resolve(routes)
  })
}
