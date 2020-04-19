import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            keepAlive: true,
            title: '首页'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            keepAlive: true,
            title: 'About'
        }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
          keepAlive: true,
          title: '登录'
      }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
        meta: {
            keepAlive: true,
            title: '注册'
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
