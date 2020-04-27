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


// http response 响应拦截器
axios.interceptors.response.use(response => {
  if(response.status === 200) {
    return Promise.resolve(response)
  }
  else {
    return Promise.reject(response)
  }
}, error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 403: this.$router.push('/login')
            .then(r => {
              console.log(r)
              Message.error('身份过期请登录')
            })
          break;
        case 500: Message.error('服务器内部错误')
              break;
        case 404: Message.error('404') // 修改到指定页面
              break;

      }
    }
})



Vue.prototype.$http = axios
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
