import {getStorage} from "@/assets/config/storage";

const state = {
    role: 'STUDENT'
}

const mutations = {
    changeRole(state) {
        state.role = getStorage('role')
    }
}

const getters = {
    getUserRole(state) {
        return state.role
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
