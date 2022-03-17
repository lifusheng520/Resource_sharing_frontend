import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import('../views/service/MainPage')
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('../views/service/auth/LoginPage')
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: () => import('../views/service/auth/RegisterPage')
    },
    {
      path: '/forgetpass',
      name: 'ForgetPasswordPage',
      component: () => import('../views/service/auth/ForgetPasswordPage')
    },
    {
      path: '/personal',
      name: 'PersonalCenterPage',
      component: () => import('../views/service/personal/PersonalCenterPage'),
      children: [
        {
          path: '/',
          name: 'PersonalInfo',
          component: () => import('../components/user/PersonalInfo')
        },
        {
          path: '/upload',
          name: 'AddUpload',
          component: () => import('../components/user/AddUpload')
        }
      ]
    }
  ]
})
