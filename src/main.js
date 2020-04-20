import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import Message from './components/Message/index.js'

// 消息提示
Vue.prototype.$message = Message

Vue.config.productionTip = false
axios.defaults.withCredentials = true //跨域
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'


// http response 响应拦截器 登录过期重定向
axios.interceptors.response.use(async response => {
  if (response.data.code === 401) {
        await Message.error('身份过期，请重新登录')
        await this.$router.push('/login')
  }
  return response
}, error => {
  if (error.response) {
    // 返回接口返回的错误信息
    return Message.error(error.response.data.errors)

  }
})

// 跟随页面修改标题
router.beforeEach((to, from, next) => {

  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})

Vue.prototype.$http = axios
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
