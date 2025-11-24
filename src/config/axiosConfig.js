import axios from 'axios'
import Element from 'element-ui'
import router from '../router/index'
import store from '../store/index.js'
import cookies from 'vue-cookies'

// 配置项目后端URL基地址（真实请求URL=baseURL + /XXX）
//axios.defaults.baseURL = 'http://localhost:8080'; 4.237.56.63
axios.defaults.baseURL = 'http://4.237.56.63:8080'; 
// 对所有 axios 请求做处理，携带cookie
axios.defaults.withCredentials = true;


// 前置拦截
axios.interceptors.request.use(config => {
  config.withCredentials = true;
//   // config.proxy = true;
  return config
});

// 后置拦截
axios.interceptors.response.use(response => {
  let resData = response.data;

  //用户登录已经过期，或者用户未登录
  if (resData.code == 1008 || resData.code == 1006) {
    cookies.remove('username');
    cookies.remove('user_id');
    cookies.remove('user_icon');
    store.pageTitle = 'Login';
    Element.Message.error(resData.code + '~~~~' + resData.message, {duration: 2000});
    router.push('/login');
    return Promise.reject(response);
  }

  return response;
});
