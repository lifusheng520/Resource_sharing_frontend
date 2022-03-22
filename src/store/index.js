import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// 组件通信中央仓库，为每个组件提供数据
export default new Vuex.Store({
  // 全局属性
  state: {
    // 页面标题
    pageTitle: '',
    token: localStorage.getItem('token'),
    isLogin: false,
    user_id: null,
    username: '',
    isEnable: '',
    roles: [],
  },
  // set  修改参数
  mutations: {
    // state:上面的全局属性state载体
    SET_TOKEN: (state, token) => {
      state.token = token;

    },
    SET_PAGETITLE: (state, title) => {
      this.pageTitle = title;

    },
    SET_USERNAME: (state, name) => {
      state.username = name;

    },
    SET_IsLogin: (state, login) => {
      if (login) {
        state.isLogin = login;
      }
    }

  },
  // get  获取参数
  getters: {
    getIsLogin: state => state.isLogin,
    getUser: state => state.username,
    getToken: state => {
      return state.token;
    }
  },
  actions: {

  },
  modules: {}
})
