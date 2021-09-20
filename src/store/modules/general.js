const state = {
  progress: null,
  isLoading: false,
  isDemo: false
}

// getters
const getters = {
  getProgress: state => state.progress,
  getLoading: state => state.isLoading,
  getDemo: state => state.isDemo
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
  },
  setDemo ({ commit }, isDemo) {
    commit('setdemo', isDemo)
  }
}

// mutations
const mutations = {
  setprogress (state, progress) {
    state.progress = progress
  },
  setloading (state, isLoading) {
    state.isLoading = isLoading
  },
  setdemo (state, isDemo) {
    state.isDemo = isDemo
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
