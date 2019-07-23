const state = {
  personalAccessToken: ''
}

const mutations = {
  SAVE_CREDENTIAL(state, token) {
    state.personalAccessToken = token
  }
}

const actions = {
  saveCredential({ commit }, token) {
    commit('SAVE_CREDENTIAL', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
