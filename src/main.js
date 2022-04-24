import Vue from 'vue'
import App from './App.vue'
import vueAxios from 'vue-axios'
import axios from '@/axios'
import store from '@/store'
import router from '@/router'
import iView from 'iview'


/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

// import './index.less'
import 'iview/dist/styles/iview.css';
import '@/assets/icons/iconfont.css'
import '@/router/permission'

Vue.use(vueAxios, axios)
Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
