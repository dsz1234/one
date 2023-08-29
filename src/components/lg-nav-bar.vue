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
defineProps({
  title: {
    type: String
  },
  rightText: {
    type: String
  }
})
const emits = defineEmits(['click-right'])
const onClickRight = () => {
  emits('click-right')
}
const onClickleft = () => {
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped></style>
