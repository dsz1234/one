<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ConsultItem
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        @on-delete="onDelete"
      ></ConsultItem>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
const router = useRouter()
const route = useRoute()
import ConsultItem from './ConsultItem.vue'
import { getConsultOrderList } from '@/services/consult'
import { ConsultType } from '@/enums'
import type { ConsultOrderListParams, ConsultOrderItem } from '@/types/consult'

const props = defineProps<{
  type: ConsultType
}>()

const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})

const list = ref<ConsultOrderItem[]>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  let res = await getConsultOrderList(params.value)
  // console.log(res)
  list.value.push(...res.data.rows)
  if (params.value.current < res.data.pageTotal) {
    params.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}

// 父组件删除更新
const onDelete = (id: string) => {
  list.value = list.value.filter((item) => item.id !== id)
  if (!list.value.length) onLoad()
}
</script>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
