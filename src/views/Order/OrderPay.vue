<template>
  <div class="order-pay-page" v-if="address && orderPre">
    <lgNavBar title="药品支付"></lgNavBar>
    <div class="head">
      <div class="tit">
        <van-icon name="location" />
        <span>{{ address.province }}{{ address.city }}{{ address.county }}</span>
      </div>
      <div class="count">{{ address.addressDetail }}</div>
      <div class="file">
        {{ address.receiver }} {{ address.mobile.replace(/^(\d{3})\d+(\d{4})$/, '\$1****\$2') }}
      </div>
    </div>
    <div class="fg"></div>
    <div class="nav">
      <div class="top">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item" v-for="med in orderPre.medicines" :key="med.id">
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
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${orderPre.payment}`" />
        <van-cell title="运费" :value="`￥${orderPre.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${orderPre.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${orderPre.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <van-submit-bar
      :price="orderPre.actualPayment * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
  </div>
  <div class="order-pay-page" v-else>
    <lgNavBar title="药品支付" />
    <van-skeleton title avatar row="2" style="margin-top: 15px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
const router = useRouter()
const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import { getAddressList, getMedicalOrderPre } from '@/services/order'
import type { AddressItem, OrderPre } from '@/types/order'
// console.log(route.query.id)

// 预支付信息
const orderPre = ref<OrderPre>()
const loadOrderPre = async () => {
  const res = await getMedicalOrderPre({ prescriptionId: route.query.id as string })
  console.log(res)
  orderPre.value = res.data
}
loadOrderPre()

// 获取收货地址
const address = ref<AddressItem>()
const loadAddress = async () => {
  const addRes = await getAddressList()
  if (addRes.data.length) {
    address.value = addRes.data[0]
  }
  // console.log('11', address.value)
}
loadAddress()
</script>

<style lang="scss">
.order-pay-page {
  padding-top: 46px;
  .van-nav-bar {
    background-color: var(--cp-primary);
    &__arrow {
      color: #fff;
    }
    &__title {
      color: #fff;
    }
  }
  .head {
    padding: 15px;
    .tit {
      color: var(--cp-tag);
      margin-bottom: 5px;
      .van-icon-location {
        color: #ff7702;
        font-size: 14px;
      }
    }
    .count {
      font-size: 18px;
      margin-bottom: 5px;
    }
  }
  .fg {
    height: 12px;
    background-color: #f6f7f9;
  }
  .nav {
    background-color: #fff;
    padding: 0 15px;
    .top {
      display: flex;
      align-items: center;
      height: 54px;
      h3 {
        font-size: 16px;
        font-weight: normal;
      }
      small {
        font-size: 13px;
        color: var(--cp-tag);
        margin-left: 10px;
      }
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      border-top: 1px solid var(--cp-line);
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
}
</style>
