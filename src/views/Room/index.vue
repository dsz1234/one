<template>
  <div class="room-page">
    <lgNavBar title="医生问诊室"></lgNavBar>
    <!-- <van-button @click="$router.push('/order/pay?id=6940261599346688')">购买药品</van-button> -->
    <RoomStatus></RoomStatus>
    <RoomAction></RoomAction>
    <RoomMessage :list="list"></RoomMessage>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
const router = useRouter()
const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'

import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import { useUserStore } from '@/stores'
const store = useUserStore()

import { MsgType } from '@/enums'
import type { Message, TimeMessages } from '@/types/room'
const list = ref<Message[]>([])

let scoket: Socket
onUnmounted(() => {
  scoket.close()
})
onMounted(async () => {
  // 建立连接，创建socketio实例
  scoket = io('https://consult-api.itheima.net', {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  scoket.on('connect', () => {
    // 建立连接成功
    console.log('建立连接成功')
  })
  scoket.on('error', (event) => {
    // 错误信息
    console.log('错误信息')
  })
  scoket.on('disconnect', () => {
    // 已经断开连接
    console.log('已经断开连接')
  })

  // 聊天记录
  scoket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // 准备转换常规消息列表
    const arr: Message[] = []
    data.forEach((item, i) => {
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    list.value.unshift(...arr)
  })
  console.log(list.value)
})
</script>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
