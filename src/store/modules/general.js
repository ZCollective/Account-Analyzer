const state = {
  progress: null,
  isLoading: false
}

// getters
const getters = {
  getProgress: state => state.progress,
  getLoading: state => state.isLoading
}

// actions
const actions = {
  setProgress ({ commit }, progress) {
    commit('setprogress', progress)
  },
  clearLoader ({ commit }) {
    commit('setloading', false)
    commit('setprogress', null)
  },
  setLoading ({ commit }, isLoading) {
    commit('setloading', isLoading)
  }
}

// mutations
const mutations = {
  setprogress (state, progress) {
    state.progress = progress
  },
  setloading (state, isLoading) {
    state.isLoading = isLoading
  }
}

export default {
  namespaced: true,
  name: 'general',
  state,
  getters,
  actions,
  mutations
}
