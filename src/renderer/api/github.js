import axios from 'axios'

const http = (token) => {
  return axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': 'token '.concat(token)
    }
  })
}
export default {
  async getUserRepos(token) {
    return http(token).get('/user/repos')
  },

  async getReposIssues(token, args) {
    return http(token).get('/repos/'.concat(args.owner, '/', args.repository, '/issues'), {
      params: {
        page: args.page ? args.page : 1
      }
    })
  },

  async patchReposIssues(token, args) {
    return http(token).patch('/repos/'.concat(args.owner, '/', args.repository, '/issues/', args.number), args.issue)
  },

  async postReposIssues(token, args) {
    return http(token).post('/repos/'.concat(args.owner, '/', args.repository, '/issues'), args.issue)
  }
}