const state = {
    role: 'STUDENT'
}

const mutations = {
    changeRole(state) {
        state.role = window.sessionStorage.getItem('role')
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
