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
      path: '/focus',
      name: 'FocusPage',
      component: () => import('../views/headerMenu/FocusPage')
    },
    {
      path: '/uploadData',
      name: 'UploadParsePage',
      component: () => import('../views/headerMenu/UploadParsePage')
    },
    {
      path: '/downloadData',
      name: 'DownloadParsePage',
      component: () => import('../views/headerMenu/DownloadParsePage')
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
          path: '/deletedResourceManagement',
          name: 'DeletedResourceManager',
          component: () => import('../components/user/resource/DeletedResourceManager')
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
        {
          path: '/focusManager',
          name: 'FocusManager',
          component: () => import('../components/user/focus/FocusManager')
        },
        {
          path: '/favouriteManager',
          name: 'FavouriteManager',
          component: () => import('../components/user/favourite/FavouriteManager')
        },
      ]
    }
  ]
})
