<template>
  <div class="">
    <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <DoctorCard :item="item"></DoctorCard>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts" setup>
// import {useRouter,useRoute} from 'vue-router'
import { ref } from 'vue'
// const router = useRouter()
// const route = useRoute()
import { getDoctorPage } from '@/services/consult'
import DoctorCard from './DoctorCard.vue'
import type { DoctorList } from '@/types/consult'

import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

// const widthValue = ref(0)
// const setWidth = () => (widthValue.value = width.value)
// onMounted(() => {
//   setWidth()
//   window.addEventListener('resize', setWidth)
// })
// onUnmounted(() => {
//   window.removeEventListener('resize', setWidth)
// })

const doctorParams = ref({
  current: 1,
  pageSize: 5
})

const list = ref<DoctorList>([])
const loadData = async () => {
  let res = await getDoctorPage(doctorParams.value)
  // console.log(res)
  list.value = res.data.rows
  // console.log(list.value)
}
loadData()
</script>

<style lang="scss" scoped></style>
