import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: ''
  },
  mutations: {
    changeName(state) {
      state.nickname = window.localStorage.getItem('nickname')
    }
  },
  actions: {
    asyncChangeName(context) {
      context.commit('changeName')
    }
  },
  getters: {
    getNickname(state) {
      return state.nickname
    }
  },
  modules: {
  }
})
