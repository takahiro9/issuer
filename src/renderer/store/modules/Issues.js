import github from '../../api/github'
const state = {
  issues: [],
  page: 1,
  isLast: false
}

const mutations = {
  REFRESH_ISSUES(state, issues) {
    state.issues = issues
    state.page = 1
    state.isLast = false
  },
  FETCH_NEXT(state, issues) {
    state.issues = state.issues.concat(issues)
    state.page += 1
    if (issues.length == 0) {
      state.isLast = true
    }
  },
  UPDATE(state, args) {
    const targetIndex = state.issues.findIndex(i => i.number == args.issue.number)
    state.issues[targetIndex] = Object.assign(args.issue, args.update)
  },
  CREATE(state, issue) {
    state.issues.unshift(issue)
  }
}

const actions = {
  async refreshIssues({ commit, rootState }, args) {
    const response = await github.getReposIssues(rootState.Credential.personalAccessToken, { owner: args.owner, repository: args.repository })
    commit('REFRESH_ISSUES', response.data.map(issue => {
      return {
        title: issue.title,
        body: issue.body,
        number: issue.number,
        owner: issue.user.login
      }
    }))
  },

  async fetchNext({ commit, rootState }) {
    if (!this.state.Issues.isLast) {
      const response = await github.getReposIssues(rootState.Credential.personalAccessToken, { owner: rootState.Repositories.selected.owner, repository: rootState.Repositories.selected.repository, page: this.state.Issues.page + 1 })
      commit('FETCH_NEXT', response.data.map(issue => {
        return {
          title: issue.title,
          body: issue.body,
          number: issue.number,
          owner: issue.user.login
        }
      }))
    }
  },

  async updateIssue({ commit, rootState }, args) {
    const params = {
      owner: args.owner,
      repository: args.repository,
      number: args.issue.number,
      issue: args.update
    }
    await github.patchReposIssues(rootState.Credential.personalAccessToken, params)
    commit('UPDATE', args)
  },

  async createIssue({ commit, rootState }, args) {
    const params = {
      owner: args.owner,
      repository: args.repository,
      issue: args.update
    }
    const response = await github.postReposIssues(rootState.Credential.personalAccessToken, params)
    commit('CREATE', {
      title: response.data.title,
      body: response.data.body,
      number: response.data.number,
      owner: response.data.user.login
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
