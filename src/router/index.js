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
        path: '/onlineJudge',
        name: 'OnlineJudge',
        component: () => import('../views/OnlineJudge'),
        props: (route) => ({page: parseInt(route.query.page)}),
        meta: {
            title: '题库'
        }
    },
    {
        path: '/problem/:id',
        name: 'Problem',
        component: () => import('../views/ProblemDetail'),
        props: true,
        // meta: {
        //     title: '题目详情'
        // }
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
            title: '个人信息'
        },

    },
    // 捕获非法路径
    {
        path: '*',
        component: () => import('../views/Notfound'),
        meta: {
            title: '404'
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
