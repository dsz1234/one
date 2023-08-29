<template>
  <div class="">
    <svg aria-hidden="true" class="cp-icon">
      <use :href="`#icon-${name}`" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
// import { useRouter, useRoute } from 'vue-router'
// import { ref, reactive } from 'vue'
// const router = useRouter()
// const route = useRoute()

defineProps<{ name: string }>()
</script>

<style lang="scss" scoped>
.cp-icon {
  // 和字体一样大
  width: 1em;
  height: 1em;
}
</style>
