<template>
  <div class="room">
    <lgNavBar title="医生问诊室"></lgNavBar>
    <van-button @click="$router.push('/order/pay?id=6938549059629056')">购买药品</van-button>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
// import {ref,reactive} from 'vue'
const router = useRouter()
const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
</script>

<style lang="scss" scoped>
.room {
  background-color: #f6f7f9;
  padding-top: 46px;
  height: calc(100vh - 46px);
}
</style>
