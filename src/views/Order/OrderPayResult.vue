<template>
  <div class="order-pay-result-page">
    <lgNavBar title="药品支付结果"></lgNavBar>
    <div class="result" v-if="order?.status === OrderType.MedicinePay">
      <van-icon name="clear"></van-icon>
      <p class="price">￥{{ order?.actualPayment }}</p>
      <p class="status">支付失败</p>
      <p class="tip">订单支付失败，可以点击查看订单继续支付，如有疑问联系客服~</p>
    </div>
    <div class="result" v-else>
      <van-icon name="checked"></van-icon>
      <p class="price">￥{{ order?.actualPayment }}</p>
      <p class="status">支付成功</p>
      <p class="tip">订单支付成功，已通知药房尽快发出， 请耐心等待~</p>
    </div>
    <div class="btn">
      <van-button type="primary" :to="`/order/${order?.id}`">查看订单</van-button>
      <van-button :to="`/room?orderId=${order?.roomId}`">返回诊室</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import {useRouter,useRoute} from 'vue-router'
import { ref } from 'vue'
// const router = useRouter()
// const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import { getMedicalOrderDetail } from '@/services/order'
import type { OrderDetail } from '@/types/order'
import { useRoute } from 'vue-router'
import { OrderType } from '@/enums'
const route = useRoute()
const order = ref<OrderDetail>()
// console.log(route)
const getDetailList = async () => {
  let res = await getMedicalOrderDetail(route.query.orderId as string)
  order.value = res.data
  // console.log(order.value)
}
getDetailList()
</script>

<style lang="scss" scoped>
.order-pay-result-page {
  padding-top: 46px;
  .result {
    text-align: center;
    width: 60%;
    margin: 10px auto;
    .van-icon {
      font-size: 75px;
      margin-top: 60px;
      color: var(--cp-primary);
    }
    .price {
      font-size: 17px;
    }
    .status {
      font-size: 13px;
      margin: 10px 0;
    }
    .tip {
      color: var(--cp-tip);
      font-size: 12px;
    }
  }
  .btn {
    width: 60%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
  }
}
::v-deep() {
  .van-nav-bar__title {
    font-weight: normal;
  }
}
</style>
