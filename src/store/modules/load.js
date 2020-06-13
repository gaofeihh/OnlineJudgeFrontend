const state = {
    requestCount: 0
}

const mutations = {
    addRequest(state) {
        state.requestCount++
    },
    subRequest(state) {
        state.requestCount--
    }
}

const getters = {
    getRequestCount(state) {
        return state.requestCount
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
