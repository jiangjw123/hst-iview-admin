const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  devServer: {
    disableHostCheck: true,
    hot: true,
    port: '80',
    historyApiFallback: {
      rewrites: [
        { from: /\//, to: '/index.html' }
      ],
    },
    // proxy: {
    //   '/': { 
    //     target: '***', // 设置代理
    //     changeOrigin: true,
    //     secure: false,
    //     bypass: function(req, res, proxyOptions) {
    //       console.log('===============>')
    //       console.log(req.originUrl)
    //       if (req.headers.accept.indexOf('html') !== -1) {
    //         return 'index.html'
    //       }
    //     },
    //     cookieDomainRewrite: {
    //       '*': 'localhost' // 把相应的 cookie 域都设置成 localhost，也可以配置成自己电脑的ip，或者指定的域名
    //     }
    //   },
    // },
    open: true
  },
  lintOnSave: true,
  runtimeCompiler: true,
  configureWebpack: config => {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          assets: resolve('./src/assets'),
          api: resolve('./src/api'),
          store: resolve('./src/store'),
          components: resolve('./src/components'),
          native: resolve('./src/native'),
          EventBus: resolve('./EventBus.js'),
          utils: resolve('./src/utils'),
          views: resolve('./src/views'),
          layout: resolve('./src/views/layout'),
          mixins: resolve('./src/mixins')
        }
      }
    }
  },
  css: {
    extract: true
  }
}