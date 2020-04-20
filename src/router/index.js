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
        },
        beforeEnter: (to, from, next) => {
          if(window.localStorage.getItem('nickname')) {
              next(false)
          }
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
        meta: {
            keepAlive: true,
            title: '注册'
        },
        beforeEnter: (to, from, next) => {
            if(window.localStorage.getItem('nickname')) {
                next(false)
            }
        }
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
