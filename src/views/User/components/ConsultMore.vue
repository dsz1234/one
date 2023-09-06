<template>
  <div class="more">
    <van-popover
      placement="top-start"
      v-model:show="showPopover"
      :actions="actions"
      @select="onSelect"
    >
      <template #reference> 更多 </template>
    </van-popover>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
const router = useRouter()
const route = useRoute()

const props = defineProps<{
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'on-delete'): void
  (e: 'on-preview'): void
}>()
const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: props.disabled },
  { text: '删除订单' }
])
const onSelect = (action: { text: string }, i: number) => {
  if (i === 1) {
    // 删除
    emit('on-delete')
  }
  if (i === 0) {
    // 查看处方
    emit('on-preview')
  }
}
</script>

<style lang="scss" scoped>
.more {
  flex: 1;
  color: var(--cp-tag);
  font-size: 13px;
}
</style>
