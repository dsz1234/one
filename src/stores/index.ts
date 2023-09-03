import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(persist)

export default pinia

// import { useUserStore } from './user'
// const userStore = useUserStore()
// export { userStore }
// export { useUserStore }
export * from '@/stores/user'
export * from '@/stores/consult'
