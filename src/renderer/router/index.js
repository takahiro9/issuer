import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/MainPage').default
    },
    {
      path: '/setting',
      name: 'setting-page',
      component: require('@/components/SettingPage').default
    },
    {
      path: '/issue',
      name: 'detail-page',
      component: require('@/components/IssueDetailPage').default,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
