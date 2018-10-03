import Vue from 'vue'
import Router from 'vue-router'
import Token from '@/components/Token'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Token',
      component: Token
    }
  ]
})
