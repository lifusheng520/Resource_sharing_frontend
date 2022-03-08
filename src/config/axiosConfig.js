import axios from 'axios'
import Element from 'element-ui'
import router from '../router/index'
import store from '../store/index.js'

// 配置项目后端URL基地址（真实请求URL=baseURL + /XXX）
axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8"

// // 前置拦截
// axios.interceptors.request.use(config => {
//   return config
// })
//
//
// // 后置拦截
// axios.interceptors.response.use(response => {
//     let res = response.data
//
//     console.log('===========================')
//     console.log(res)
//     console.log('===================')
//
//     if (res.code === 200) {
//       return response
//     } else {
//
//       Element.Message.error('错了哦，这是一条错误消息', {duration: 3 * 1000})
//
//       // 停止请求，阻止返回
//       return Promise.reject(response.data.msg)
//     }
//   },
//   error => {
//
//     console.log(error)
//
//     console.log(error.response.status)
//
//     // 返回数据不为空
//     if (error.response.data){
//       error.message = error.response.data.msg
//     }
//
//     if (error.response.status === 401) {
//       // 清除信息
//       store.commit('REMOVE_INFO')
//
//       // 跳转登录页面
//       router.push('/login')
//     }
//
//     Element.Message.error(error.message, {duration: 3 * 1000})
//
//     // 停止请求，阻止返回
//     return Promise.reject(error)
//   }
// )
