import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import { mapState } from 'vuex';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios.create({
  baseURL: 'https://api.github.com'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  computed: Object.assign(
    mapState('Repositories', {
      selected: state => state.selected
    })
  ),
  data: function () {
    return {
      isConnecting: false
    }
  },
  methods: {
    startWatchingScroll: function () {
      document.addEventListener('scroll', () => {
        const documentHeight = document.querySelector('html').offsetHeight
        const windowHeight = window.innerHeight
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        const scrollRate = (documentHeight + windowHeight) / scrollTop

        if (scrollRate > 0.8 && this.selected.owner && this.isConnecting == false) {
          this.isConnecting = true
          this.$store.dispatch('Issues/fetchNext').then(x => this.isConnecting = false)
        }
      })
    }
  }
}).$mount('#root')

app.startWatchingScroll()