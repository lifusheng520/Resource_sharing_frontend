import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import('../views/headerMenu/MainPage')
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
      path: '/recommend',
      name: 'RecommendationPage',
      component: () => import('../views/headerMenu/RecommendationPage')
    },
    {
      path: '/detail',
      name: 'ResourceDetailPage',
      component: () => import('../views/headerMenu/ResourceDetailPage')
    },
    {
      path: '/rank',
      name: 'UploadRankPage',
      component: () => import('../views/headerMenu/UploadRankPage')
    },
    {
      path: '/personal',
      name: 'PersonalCenterPage',
      component: () => import('../views/service/personal/PersonalCenterPage'),
      children: [
        {
          path: '/',
          name: 'PersonalInfo',
          component: () => import('../components/user/info/PersonalInfo')
        },
        {
          path: '/upload',
          name: 'AddUpload',
          component: () => import('../components/user/resource/AddUpload')
        },
        {
          path: '/resourceManagement',
          name: 'ResourceManagement',
          component: () => import('../components/user/resource/ResourceManagement')
        },
        {
          path: '/updatePass',
          name: 'UpdatePassword',
          component: () => import('../components/user/info/UpdatePassword')
        },
        {
          path: '/commentManager',
          name: 'CommentManager',
          component: () => import('../components/user/comment/CommentManager')
        },
      ]
    }
  ]
})
