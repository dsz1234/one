<template>
  <div class="knowledge-page">
    <div class="knowledge-page-head">
      <img :src="item.creatorAvatar" alt="" />
      <div class="con">
        <p class="name">{{ item.creatorName }}</p>
        <p class="dec">
          {{ item.creatorHospatalName }} {{ item.creatorDep }} {{ item.creatorTitles }}
        </p>
      </div>
      <van-button :loading="loading" @click="follow(item)" class="btn" size="small" round>{{
        item.likeFlag === 1 ? '已关注' : '+ 关注'
      }}</van-button>
    </div>
    <div class="knowledge-page-body">
      <h3 class="title van-ellipsis">{{ item.title }}</h3>
      <p class="intro van-multi-ellipsis--l2">
        {{ item.content.replace(/<[^>]+>/g, '') }}
      </p>
      <div class="imgs" :class="{ large: item.coverUrl.length === 1 }">
        <van-image v-for="(url, i) in item.coverUrl" :key="i" :src="url" />
      </div>
      <p class="logs">
        <span>{{ item.collectionNumber }} 收藏</span>
        <span>{{ item.commentNumber }} 评论</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import {useRouter,useRoute} from 'vue-router'
// import {ref,reactive} from 'vue'
// const router = useRouter()
// const route = useRoute()
import type { Knowledge } from '@/types/consult'
import { useFollow } from '@/composable'
const { loading, follow } = useFollow('knowledge')

defineProps<{
  item: Knowledge
}>()
</script>

<style lang="scss" scoped>
.knowledge-page {
  margin-bottom: 10px;
  border-bottom: 1px solid var(--cp-line);
  padding-bottom: 10px;
  &-head {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
    }
    .con {
      width: 200px;
      margin: 0 15px;
      p {
        margin: 0;
      }
      .name {
        color: var(--cp-text2);
      }
      .dec {
        color: var(--cp-tip);
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    img {
      width: 35px;
      height: 35px;
    }
    .btn {
      height: 28px;
      width: 72px;
      border-color: var(--cp-primary);
      color: var(--cp-primary);
    }
  }
  &-body {
    .title {
      font-size: 16px;
      margin-top: 10px;
      font-weight: normal;
    }
    .intro {
      margin-top: 7px;
      line-height: 2;
      color: var(--cp-text3);
    }
    .imgs {
      margin-top: 7px;
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 12px;
        border-radius: 12px;
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .logs {
      margin-top: 10px;
      > span {
        color: var(--cp-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
