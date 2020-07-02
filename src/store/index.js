import Vue from 'vue'
import Vuex from 'vuex'
import load from './modules/load'
import auth from './modules/auth'
import {getStorage} from "@/assets/config/storage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    userId: getStorage('userId'),
  },
  mutations: {
    changeName(state) {
      state.username = getStorage('username')
    },
    changeId(state) {
      state.userId = getStorage('userId')
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
