import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'RegisterPage',
      component: () => import('../views/service/auth/RegisterPage')
    },
    {
      path: '/',
      name: 'MainPage',
      component: () => import('../views/service/MainPage'),
      children: [
        {
          path: '/',
          component: () => import('../components/sys/MyIndex')
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('../views/service/auth/LoginPage'),
      children: [

      ]
    }
  ]
})
