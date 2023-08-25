import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { type Method } from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'
const instance = axios.create({
  baseURL: '/dev-api',
  timeout: 10000
})

// console.log(axios)

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useUserStore()
    // 通过token设置请求头
    if (store.user?.token) {
      config.headers.Authorization = 'Bearer ' + store.user.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// console.log(_axios)

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code !== 10000) {
      // 成功提示
      showToast(res.data.message)
      // 错误的业务码返回出去
      return Promise.reject(res.data)
    }
    return res.data
  },
  (error) => {
    // token过期处理
    if (error.response.status === 401) {
      showToast('token失效了')
      // 1.清空本地的用户信息和token和pinia里面的用户信息和token
      const store = useUserStore()
      store.delUser()
      // 2.回到登录页（但是继续登陆后继续回到以前浏览的页面）
      router.push(`/login?${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(error)
  }
)

// cosnt obj = {name:'jeck'} obj.name
// obj['name']
// const test = 'name'
// const obj = {
//   [test]:'jeck'
// }

type Data<T> = {
  code: number
  message: string
  data: T
}

const request = <T>(url: string, method: Method = 'get', submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

// request('/list',)
// _axios.get params
// _axios.post data
// _axios({
//   url: '',
//   method: '',
//   data: {}
// })

export default request
