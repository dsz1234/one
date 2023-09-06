<template>
  <van-action-sheet
    :show="props.show"
    @update:show="$emit('update:show', $event)"
    title="选择支付方式"
    :closeable="false"
    :close-on-popstate="false"
    @close="onClose"
  >
    <div class="content">
      <p class="tit">￥{{ actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon>
            <cpIcons name="consult-wechat"></cpIcons>
          </template>
          <template #right-icon>
            <van-checkbox :checked="paymentMethod === 0"></van-checkbox>
          </template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon>
            <cpIcons name="consult-alipay"></cpIcons>
          </template>
          <template #right-icon>
            <van-checkbox :checked="paymentMethod === 1"></van-checkbox>
          </template>
        </van-cell>
      </van-cell-group>
      <van-button round block class="btnPay" @click="pay">立即支付</van-button>
    </div>
  </van-action-sheet>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { showLoadingToast, showToast } from 'vant'
import { getConsultOrderPayUrl } from '@/services/consult'
const router = useRouter()
const route = useRoute()
const props = defineProps<{
  orderId: string
  show: boolean
  actualPayment: number
  onClose?: () => void
}>()
const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()
const paymentMethod = ref<0 | 1>()
// 点击支付
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({ message: '跳转支付', duration: 0 })
  const res = await getConsultOrderPayUrl({
    orderId: props.orderId,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://localhost:5173/#/room'
  })
  window.location.href = res.data.payUrl
}
</script>

<style lang="scss" scoped></style>
