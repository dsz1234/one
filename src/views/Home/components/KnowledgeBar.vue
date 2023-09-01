<template>
  <div class="know">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="0"
    >
      <KnowledgeList v-for="(item, i) in list" :key="i" :item="item"></KnowledgeList>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
// import {useRouter,useRoute} from 'vue-router'
import { ref } from 'vue'
// const router = useRouter()
// const route = useRoute()
import KnowledgeList from './KnowledgeList.vue'
import type { KnowledgeType, KnowledgeParams, KnowledgeLista } from '@/types/consult'
import { getKnowledgePage } from '@/services/consult'
const list = ref<KnowledgeLista>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  // console.log('loading')
  // 模拟加载更多
  // setTimeout(() => {
  //   const data = [1, 2, 3, 4, 5]
  //   list.value.push(...data)
  //   // 模拟加载完毕
  //   if (list.value.length > 20) {
  //     finished.value = true
  //   }
  //   loading.value = false
  // }, 1000)
  const res = await getKnowledgePage(params.value)
  // console.log(res)
  list.value.push(...res.data.rows)
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}

const props = defineProps<{
  type: KnowledgeType
}>()

const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
</script>

<style lang="scss" scoped>
.know {
  padding: 10px 15px 55px;
}
</style>
