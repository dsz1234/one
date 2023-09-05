<template>
  <div class="cosult-page">
    <lgNavBar title="问诊记录"></lgNavBar>

    <van-tabs sticky>
      <van-tab title="极速问诊"><ConsultList :type="ConsultType.Fast"></ConsultList></van-tab>
      <van-tab title="找医生"><ConsultList :type="ConsultType.Doctor"></ConsultList></van-tab>
      <van-tab title="开药门诊"><ConsultList :type="ConsultType.Medication"></ConsultList></van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
// import { useRouter, useRoute } from 'vue-router'
// import { ref, reactive } from 'vue'
// const router = useRouter()
// const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import ConsultList from './components/ConsultList.vue'
import { ConsultType } from '@/enums'
</script>

<style lang="scss" scoped>
.cosult-page {
  padding-top: 46px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
</style>
