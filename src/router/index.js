import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            title: 'About'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        beforeEnter: (to, from, next) => {
          if(window.localStorage.getItem('username')) {
              return next('/')
          }
          next()
        },
        meta: {
            title: '登录',
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
        beforeEnter: (to, from, next) => {
            if(window.localStorage.getItem('username')) {
                return next('/')
            }
            next()
        },
        meta: {
            title: '注册'
        },
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/User'),
        beforeEnter: (to, from, next) => {
            if(!window.localStorage.getItem('username')) {
                return next('/')
            }
            next()
        },
        meta: {
            title: '用户信息'
        },

    }
]

const router = new VueRouter({
    routes
})

// 跟随页面修改标题
router.beforeEach((to, from, next) => {

    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
