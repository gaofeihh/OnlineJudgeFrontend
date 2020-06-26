import Vue from 'vue'
import Vuex from 'vuex'
import load from './modules/load'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    userId: window.sessionStorage.getItem('userId'),
  },
  mutations: {
    changeName(state) {
      state.username = window.sessionStorage.getItem('username')
    },
    changeId(state) {
      state.userId = window.sessionStorage.getItem('userId')
    },
  },
  actions: {
    asyncChangeName(context) {
      context.commit('changeName')
    },
    asyncChangeId(context) {
      context.commit('changeId')
    },
  },
  getters: {
    getUsername(state) {
      return state.username
    },
    getUserId(state) {
      return state.userId
    },
  },
  modules: {
    load,
    auth
  }
})
