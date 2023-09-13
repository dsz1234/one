<template>
  <div class="room-page">
    <lgNavBar title="医生问诊室"></lgNavBar>
    <!-- <van-button @click="$router.push('/order/pay?id=6940261599346688')">购买药品</van-button> -->
    <RoomStatus :status="consult?.status" :countdown="consult?.countdown"></RoomStatus>
    <RoomAction
      @send-text="sendText"
      @send-image="sendImage"
      :disabled="consult?.status !== OrderType.ConsultChat"
    ></RoomAction>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <RoomMessage :list="list"></RoomMessage>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
const router = useRouter()
const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { OrderType } from '@/enums'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import dayjs from 'dayjs'
import type { Image } from '@/types/consult'

import { useUserStore } from '@/stores'
const store = useUserStore()

import { MsgType } from '@/enums'
import type { Message, TimeMessages } from '@/types/room'
import { getConsultOrderDetail } from '@/services/consult'
const list = ref<Message[]>([])
import type { ConsultOrderItem } from '@/types/consult'
import { showToast } from 'vant'

const consult = ref<ConsultOrderItem>()
let initialMsg = ref(true)
let socket: Socket
onUnmounted(() => {
  socket.close()
})
onMounted(async () => {
  // 建立连接，创建socketio实例
  socket = io('https://consult-api.itheima.net', {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  socket.on('connect', () => {
    // 建立连接成功
    console.log('建立连接成功')
    list.value = []
  })
  socket.on('error', (event) => {
    // 错误信息
    console.log('错误信息')
  })
  socket.on('disconnect', () => {
    // 已经断开连接
    console.log('已经断开连接')
  })

  // 聊天记录
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // 准备转换常规消息列表
    const arr: Message[] = []
    data.forEach((item, i) => {
      if (i === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    list.value.unshift(...arr)
    loading.value = false
    // console.log(list.value)
    if (!data.length) {
      return showToast('没有聊天记录了')
    }
    nextTick(() => {
      if (initialMsg.value) {
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      }
    })
  })
  // console.log(list.value)
  // 订单状态
  socket.on('statusChange', async () => {
    getOrder()
  })

  // 接收消息 在onMounted注册
  socket.on('receiveChatMsg', async (event) => {
    list.value.push(event)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })

  getOrder()
})

const getOrder = async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data
}

const sendText = (text: string) => {
  // 发送信息需要  发送人  收消息人  消息类型  消息内容
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: { content: text }
  })
}

const sendImage = (img: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: { picture: img }
  })
}

const loading = ref(false)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const onRefresh = () => {
  // 触发下拉
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
}
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
