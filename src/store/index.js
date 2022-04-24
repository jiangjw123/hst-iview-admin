import Vuex from 'vuex'
import Vue from 'vue'
import user from './module/user'
import permission from './module/async-router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    permission
  }
})