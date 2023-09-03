<template>
  <div class="consult-dep-page">
    <lgNavBar title="选择科室"></lgNavBar>
    <div class="consult">
      <van-sidebar v-model="active" @change="submitChange">
        <van-sidebar-item v-for="(item, index) in initGetIllness" :key="index" :title="item.name" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          v-for="(child, i) in chirdList"
          :key="i"
          @click="store.setDep(child.id)"
          >{{ child.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
const router = useRouter()
const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import { getAllDep } from '@/services/consult'
import type { TopDep } from '@/types/consult'
import { useConsultStore } from '@/stores'
const active = ref(0)
const store = useConsultStore()
const initGetIllness = ref<TopDep[]>([])
const getIllnessList = async () => {
  let res = await getAllDep()
  initGetIllness.value = res.data
  chirdList.value = initGetIllness.value[0].child
  console.log(initGetIllness.value)
}
getIllnessList()

const chirdList = ref()
// 左侧标签栏切换时触发
const submitChange = (index: number) => {
  console.log(index)
  chirdList.value = initGetIllness.value[index].child
  console.log(chirdList.value)
}
</script>

<style lang="scss" scoped>
.consult-dep-page {
  padding-top: 46px;
  .consult {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      height: 100%;
      overflow-y: auto;
      flex: 1;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
  .van-sidebar {
    width: 110px;
    &-item {
      padding: 14px;
      &--select {
        font-weight: normal;
      }
      &::before {
        display: none;
      }
    }
  }
}
</style>
