<template>
  <div class="order-pay-page">
    <lgNavBar title="药品支付"></lgNavBar>
    <div class="head">
      <div class="tit">
        <van-icon name="location" />
        <span>北京市昌平区</span>
      </div>
      <div class="count">建材城西路金燕龙办公楼999号</div>
      <div class="file">李富贵 13211112222</div>
    </div>
    <div class="fg"></div>
    <div class="nav">
      <div class="top">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item" v-for="i in 2" :key="i">
        <img class="img" src="@/assets/ad.png" alt="" />
        <div class="info">
          <p class="name">
            <span>优赛明 维生素E乳</span>
            <span>x1</span>
          </p>
          <p class="size">
            <van-tag>处方药</van-tag>
            <span>80ml</span>
          </p>
          <p class="price">￥25.00</p>
        </div>
        <div class="desc">用法用量：口服，每次1袋，每天3次，用药3天</div>
      </div>
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" value="￥50" />
        <van-cell title="运费" value="￥4" />
        <van-cell title="优惠券" value="-￥0" />
        <van-cell title="实付款" value="￥54" class="price" />
      </van-cell-group>
    </div>
    <van-submit-bar
      :price="50 * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
const router = useRouter()
const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
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
