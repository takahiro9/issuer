import github from '../../api/github'
const state = {
  selected: {},
  repositories: []
}

const mutations = {
  SET_UP_REPOSITORY(state, repos) {
    state.repositories = repos
  },

  SELECT(state, repo) {
    state.selected = repo
  }
}

const actions = {
  async fetchRepoSummary({ commit, rootState }, http) {
    try {
      const response = await github.getUserRepos(rootState.Credential.personalAccessToken)
      commit('SET_UP_REPOSITORY', response.data.reduce((result, current) => {
        var owner = result.find(x => x.owner === current.owner.login)
        if (owner) {
          owner.repositories.push(current.name)
        } else {
          result.push({
            owner: current.owner.login,
            repositories: [current.name]
          })
        }

        return result
      }, []))
    } catch (err) {
      throw err
    }
  },

  async selectRepository({ commit, rootState }, args) {
    this.dispatch('Issues/refreshIssues', { http: args.http, owner: args.owner.owner, repository: args.repository })
    commit('SELECT', { owner: args.owner.owner, repository: args.repository })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
