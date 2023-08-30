<template>
  <div class="">
    <van-nav-bar
      :title="title"
      :right-text="rightText"
      left-arrow
      @click-right="onClickRight"
      @click-left="onClickleft"
      fixed
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// const route = useRoute()
const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()
const emits = defineEmits(['click-right'])
const onClickRight = () => {
  emits('click-right')
}
const onClickleft = () => {
  if (props.back) {
    return props.back()
  }
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped></style>
