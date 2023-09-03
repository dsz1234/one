<template>
  <div class="consultFast-page">
    <lgNavBar title="极速问诊" right-text="问诊记录"></lgNavBar>
    <div class="consultFast-page-logo">
      <img class="img" src="@/assets/bg.png" alt="" />
      <p class="text"><span>20s</span> 快速匹配专业医生</p>
    </div>
    <div class="fast-type">
      <router-link to="/consult/dep" class="item" @click="store.setIllnessType(1)">
        <cpIcons class="pic" name="consult-doctor"></cpIcons>
        <div class="info">
          <p>三甲图文问诊</p>
          <p>三甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
      <router-link to="/consult/dep" class="item" @click="store.setIllnessType(0)">
        <cpIcons class="pic" name="consult-message"></cpIcons>
        <div class="info">
          <p>普通图文问诊</p>
          <p>二甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import lgNavBar from '@/components/lg-nav-bar.vue'
import cpIcons from '@/components/cp-icons.vue'
import { useConsultStore } from '@/stores'
const store = useConsultStore()
</script>

<style lang="scss" scoped>
.consultFast-page {
  padding-top: 46px;
  &-logo {
    padding: 30px 0;
    text-align: center;
    img {
      width: 240px;
    }
  }
  .fast-type {
    padding: 15px;
    .item {
      display: flex;
      padding: 16px;
      border-radius: 4px;
      align-items: center;
      margin-bottom: 16px;
      border: 0.5px solid var(--cp-line);
    }
    .pic {
      font-size: 35px;
    }
    .info {
      margin-left: 12px;
      flex: 1;
      > p:first-child {
        font-size: 16px;
        color: var(--cp-text1);
        margin-bottom: 4px;
      }
      > p:last-child {
        font-size: 13px;
        color: var(--cp-tag);
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
</style>
