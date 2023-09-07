<template>
  <div class="order-detail">
    <lgNavBar title="药品订单详情"></lgNavBar>
    <div class="top">
      <div class="file">
        <div class="file-one">
          <p>【东莞市】您的包裹已由物流公司揽收</p>
          <p>2019-07-14 17:42:12</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </div>
    </div>
    <div class="item" v-for="med in order?.medicines" :key="med.id">
      <img class="img" :src="med.avatar" alt="" />
      <div class="info">
        <p class="name">
          <span>{{ med.name }}</span>
          <span>x{{ med.quantity }}</span>
        </p>
        <p class="size">
          <van-tag v-if="med.prescriptionFlag === 1">处方药</van-tag>
          <span>{{ med.specs }}</span>
        </p>
        <p class="price">￥{{ med.amount }}</p>
      </div>
      <div class="desc">{{ med.usageDosag }}</div>
    </div>
    <div class="order-detail" v-if="order">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${order.payment}`" />
        <van-cell title="运费" :value="`￥${order.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${order.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${order.actualPayment}`" class="price" />
        <van-cell title="订单编号" :value="order.orderNo" />
        <van-cell title="创建时间" :value="order.createTime" />
        <template
          v-if="
            order.status === OrderType.MedicineSend ||
            order.status === OrderType.MedicineTake ||
            order.status === OrderType.MedicineComplete
          "
        >
          <van-cell title="支付时间" :value="order.payTime" />
          <van-cell title="支付方式" :value="order.paymentMethod === 0 ? '微信' : '支付宝'" />
        </template>
      </van-cell-group>
    </div>
    <van-action-bar>
      <van-action-bar-button type="primary" text="确认收货" />
    </van-action-bar>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
const router = useRouter()
const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import type { OrderDetail } from '@/types/order'
import { getMedicalOrderDetail } from '@/services/order'
import { OrderType } from '@/enums'
const order = ref<OrderDetail>()
console.log(route)
const getDetailList = async () => {
  let res = await getMedicalOrderDetail(route.params.id as string)
  order.value = res.data
  // console.log(order.value)
}
getDetailList()
</script>

<style lang="scss" scoped>
.order-detail {
  padding-top: 46px;
  .top {
    width: 100%;
    height: 80px;
    background: linear-gradient(#fff, #e0f3f1);
    border-radius: 0 0 25px 25px;
    position: relative;
    .file {
      padding: 15px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 6px;
      width: 90%;
      position: absolute;
      bottom: -15px;
      left: 18px;
      box-shadow: 0 0 8px #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        &:first-child {
          color: var(--cp-primary);
          font-size: 15px;
        }
        &:last-child {
          color: var(--cp-tag);
          font-size: 13px;
          margin-top: 5px;
        }
      }
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    border-top: 1px solid var(--cp-line);
    margin-top: 15px;
    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }
    .info {
      padding-left: 15px;
      width: 250px;
      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;
        > span:first-child {
          width: 200px;
        }
        > span:last-child {
          width: 50px;
          text-align: right;
        }
      }
      .size {
        margin-bottom: 5px;
        .van-tag {
          background-color: var(--cp-primary);
          vertical-align: middle;
        }
        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--cp-tag);
          vertical-align: middle;
        }
      }
      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }
    .desc {
      width: 100%;
      background-color: var(--cp-bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--cp-tip);
    }
  }
}
</style>
