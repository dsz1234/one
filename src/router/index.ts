import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Zhuce/index.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/Order/index.vue')
    },
    {
      path: '/user/patient',
      name: 'patient',
      component: () => import('../views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      name: 'fast',
      component: () => import('../views/Home/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/Layout/index.vue'),
      children: [
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User/index.vue'),
          meta: { title: '个人中心' }
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('../views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          name: 'notify',
          component: () => import('../views/Notify/index.vue'),
          meta: { title: '消息通知' }
        }
      ]
    }
  ]
})
const whileList = ['/404', '/register', '/']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const store = useUserStore()
  if (store.user?.token) {
    if (to.path == '/') {
      next('/home')
    } else {
      next()
    }
  } else {
    if (whileList.includes(to.path)) {
      next()
    } else {
      next('/')
    }
  }
})

router.afterEach((to) => {
  document.title = `优医问诊-${to.meta.title || ''}`
  NProgress.done()
})
NProgress.configure({
  showSpinner: false
})

export default router
