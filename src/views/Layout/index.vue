<template>
  <div class="">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item :to="item.path" v-for="(item, index) in tabBarList" :key="index"
        >{{ item.name }}
        <template #icon="{ active }">
          <cp-icons :name="active ? item.active : item.default"></cp-icons>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
// import {useRouter,useRoute} from 'vue-router'
// import { ref } from 'vue'
// const router = useRouter()
// const route = useRoute()
import cpIcons from '@/components/cp-icons.vue'
const tabBarList = [
  {
    name: '首页',
    default: 'home-index-default',
    active: 'home-index-active',
    path: '/home'
  },
  {
    name: '健康百科',
    default: 'home-article-default',
    active: 'home-article-active',
    path: '/article'
  },
  {
    name: '消息中心',
    default: 'home-notice-default',
    active: 'home-notice-active',
    path: '/notify'
  },
  {
    name: '我的',
    default: 'home-mine-default',
    active: 'home-mine-active',
    path: '/user'
  }
]
</script>

<style lang="scss" scoped>
:deep() {
  .van-tabbar-item {
    &__icon {
      font-size: 21px;
      .cp-icon {
        // 和字体一样大
        width: 1em !important;
        height: 1em !important;
      }
    }

    &__text {
      font-size: 11px;
    }

    &:not(.van-tabbar-item--active) {
      color: var(--cp-text3);
    }
  }
}
</style>
