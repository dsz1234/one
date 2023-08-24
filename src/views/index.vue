<template>
  <div class="container">
    <div class="row">
      {{ userStore.user?.account }}
    </div>
    <button @click="handleLogin">登录</button>
    <van-button type="danger">hello</van-button>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { Button as VanButton } from 'vant'
const userStore = useUserStore()

const info = {
  id: 1,
  token: '123',
  account: '张三',
  mobile: '444',
  avatar: 'https://www.baidu.com'
}

const handleLogin = () => {
  userStore.setUser(info)
  // localStorage.setItem('user', JSON.stringify(info))
}
</script>

<style lang="scss" scoped></style>
