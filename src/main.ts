// 引入vant样式
import 'vant/lib/index.css'
// 引入公共样式
import './styles/main.scss'

import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
// console.log(router.currentRoute.value)  里面有fullPath和path 了解它俩的区别

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')

// console.log(import.meta.env)
// console.log(history.state.back)
