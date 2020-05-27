import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    userId: window.sessionStorage.getItem('userId'),
    requestCount: 0
  },
  mutations: {
    changeName(state) {
      state.username = window.sessionStorage.getItem('username')
    },
    changeId(state) {
      state.userId = window.sessionStorage.getItem('userId')
    },
    addRequest(state) {
      state.requestCount++
    },
    subRequest(state) {
      state.requestCount--
    }
  },
  actions: {
    asyncChangeName(context) {
      context.commit('changeName')
    },
    asyncChangeId(context) {
      context.commit('changeId')
    },
    // asyncChangeAddRequest(context) {
    //   context.commit('addRequest')
    // },
    // asyncChangeSubRequest(context) {
    //   context.commit('subRequest')
    // }
  },
  getters: {
    getUsername(state) {
      return state.username
    },
    getUserId(state) {
      return state.userId
    },
    getRequestCount(state) {
      return state.requestCount
    }
  },
  modules: {
  }
})
