import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import {getStorage} from "@/assets/config/storage";

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
        props: (route) => ({id: route.params.id, contestId: route.query.contestId}),
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
        path: '/contest',
        name: 'Contest',
        component: () => import('../views/Contest'),
        props: (route) => ({page: parseInt(route.query.page)}),
        meta: {
            title: '竞赛'
        }
    },
    {
        path: '/rankList',
        name: 'RankList',
        component: () => import('../views/RankList'),
        props: (route) => ({page: parseInt(route.query.page)}),
        meta: {
            title: '排名'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        beforeEnter: (to, from, next) => {
            if (getStorage('username')) {
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
            if (getStorage('username')) {
                return next('/')
            }
            next()
        },
        meta: {
            title: '注册'
        },
    },
    {
        path: '/user/:username',
        name: 'User',
        component: () => import('../views/User'),
        props: (route) => ({getUsername: route.params.username}),
        // beforeEnter: (to, from, next) => {
        //     if(!window.sessionStorage.getItem('username')) {
        //         return next('/')
        //     }
        //     next()
        // },
        meta: {
            title: '个人信息'
        },

    },
    {
        path: '/history',
        name: 'History',
        component: () => import('../views/SubmitHistory'),
        props: (route) => ({
            page: parseInt(route.query.page),
            user: route.query.user,
            language: route.query.language,
            problem: route.query.problem,
            result: route.query.result,
            similar: route.query.similar
        }),
        meta: {
            title: '提交记录'
        }
    },
    {
        path: "/admin",
        name: "Admin",
        component: () => import('../views/Admin'),
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/getUserRole'] !== 'ADMIN') {
                return next('/')
            }
            next()
        },
        children: [
            {
                path: 'personCount',
                name: 'PersonCount',
                component: resolve => require(['@/components/Admin/AdminPersonCount'], resolve),
                meta: {
                    title: '在线用户'
                },
            },
            {
                path: 'uploadProblem',
                name: 'UploadProblem',
                component: resolve => require(['@/components/Admin/AdminUploadProblem'], resolve),
                meta: {
                    title: '上传题目'
                },
            },
            {
                path: 'createContest',
                name: 'CreateContest',
                component: resolve => require(['@/components/Admin/AdminCreateContest'], resolve),
                meta: {
                    title: '创建比赛'
                },
            },
        ],
    },
    {
        path: '/contest-detail/:id',
        name: 'ContestDetail',
        component: () => import('../views/ContestDetail'),
        props: (route) => ({contestId: route.params.id})
    },
    // 捕获非法路径
    {
        path: '*',
        name: '404',
        component: () => import('../views/Notfound'),
        meta: {
            title: '404'
        }
    },
]

const router = new VueRouter({
    routes,
    // mode: 'history',
})

// 跟随页面修改标题
// todo:页面被拦截不修改标题
router.beforeEach((to, from, next) => {

    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

// 解决跳转路由相同报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
export default router
