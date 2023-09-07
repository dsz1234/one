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
      path: '/user/patient',
      name: 'patient',
      component: () => import('../views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/pay',
      name: 'consultpay',
      component: () => import('../views/Home/ConsultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path: '/order/pay/result',
      name: 'pay',
      component: () => import('../views/Order/OrderPayResult.vue'),
      meta: { title: '药品支付结果' }
    },
    {
      path: '/consult/fast',
      name: 'fast',
      component: () => import('../views/Home/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      name: 'dep',
      component: () => import('../views/Home/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      name: 'illness',
      component: () => import('../views/Home/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/Room/index.vue'),
      meta: { title: '问诊室' }
    },
    {
      path: '/order/pay',
      component: () => import('../views/Order/OrderPay.vue'),
      meta: { title: '药品支付' }
    },
    {
      path: '/order/:id',
      component: () => import('../views/Order/OrderDetail.vue'),
      meta: { title: '药品订单详情' }
    },
    {
      path: '/user/consult',
      name: 'consult',
      component: () => import('@/views/User/ConsultPage.vue'),
      meta: { title: '问诊记录' }
    },
    {
      path: '/user/consult/:id',
      name: 'consultdetail',
      component: () => import('@/views/User/ConsultDetail.vue'),
      meta: { title: '问诊详情' }
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
