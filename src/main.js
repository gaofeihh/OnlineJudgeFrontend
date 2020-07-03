import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import Message from './components/Message/index.js'
import md5 from 'js-md5'

// 消息提示
Vue.prototype.$message = Message
// md5
Vue.prototype.$md5 = md5

Vue.config.productionTip = false
axios.defaults.withCredentials = true //跨域
// axios.defaults.baseURL = 'http://localhost:8080/api' // 打包时换成完整地址
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// http request 请求拦截器
axios.interceptors.request.use(request => {
    store.commit('load/addRequest')
    return request
})

// http response 响应拦截器
axios.interceptors.response.use(response => {
    store.commit('load/subRequest')
    if (response.status === 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
}, error => {
    store.commit('load/subRequest');
    if (error.response.status) {
        switch (error.response.status) {
            case 403:
                // window.sessionStorage.clear();
                // router.push('/login');
                Message.error(`403:${error.response.data.errors}`);
                break;
            case 401:
                Message.error(`拒绝访问,未获取相关权限,${error.response.data.errors}`);
                break;
            case 404:
                router.push({name: 404});
                Message.error('请求错误404');
                break;
            case 408:
                Message.error('请求超时408');
                break;
            case 500:
                Message.error('服务器内部错误500');
                break;
            case 502:
                Message.error('网络错误502');
                break;
            case 503:
                Message.error('服务不可用503');
                break;
            case 504:
                Message.error('网络超时504');
                break;
            default:
                // router.go(-1)
                Message.error(`错误${error.response.data.error}`)
        }
    } else {
        Message.error('连接服务器失败')
    }
})


Vue.prototype.$http = axios
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
