import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    userId: window.localStorage.getItem('userId')
  },
  mutations: {
    changeName(state) {
      state.username = window.localStorage.getItem('username')
    },
    changeId(state) {
      state.userId = window.localStorage.getItem('userId')
    }
  },
  actions: {
    asyncChangeName(context) {
      context.commit('changeName')
    },
    asyncChangeId(context) {
      context.commit('changeId')
    }
  },
  getters: {
    getUsername(state) {
      return state.username
    },
    getUserId(state) {
      return state.userId
    }
  },
  modules: {
  }
})
