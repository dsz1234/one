<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-page-head">
      <div class="con">
        <h1>优医</h1>
        <div class="search">
          <cpIcons name="home-search"></cpIcons>
          搜一搜:疾病/症状/医生/健康知识
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="home-page-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cpIcons name="home-doctor"></cpIcons>
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/consult/fast" class="nav" @click="setType">
            <cpIcons name="home-graphic"></cpIcons>
            <p class="title">极速问诊</p>
            <p class="desc">20s医生极速回复</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cpIcons name="home-prescribe"></cpIcons>
            <p class="title">开药门诊</p>
            <p class="desc">线上买药更方便</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cpIcons name="home-order"></cpIcons>
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cpIcons name="home-docs"></cpIcons>
            <p class="title">健康档案</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cpIcons name="home-rp"></cpIcons>
            <p class="title">我的处方</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cpIcons name="home-find"></cpIcons>
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="home-banner">
      <van-swipe indicator-color="#fff">
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 标签 -->
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注">
        <div class="doctorNav">
          <div class="top">
            <p>推荐关注</p>
            <p class="more">查看更多 ></p>
          </div>
          <div class="body">
            <FollowDoctor></FollowDoctor>
          </div>
        </div>
        <KnowledgeBar type="like"></KnowledgeBar>
      </van-tab>
      <van-tab title="推荐"><KnowledgeBar type="recommend"></KnowledgeBar></van-tab>
      <van-tab title="减脂"><KnowledgeBar type="recommend"></KnowledgeBar></van-tab>
      <van-tab title="饮食"><KnowledgeBar type="food"></KnowledgeBar></van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
// import {useRouter,useRoute} from 'vue-router'
import { ref } from 'vue'
// const router = useRouter()
// const route = useRoute()
import cpIcons from '@/components/cp-icons.vue'
import KnowledgeBar from './components/KnowledgeBar.vue'
import FollowDoctor from './components/FollowDoctor.vue'
import { useConsultStore } from '@/stores/'
import { ConsultType } from '@/enums'
const active = ref(0)

const setType = () => {
  const store = useConsultStore()
  store.setType(ConsultType.Fast)
}
</script>

<style lang="scss">
.home-page {
  padding-bottom: 50px;
  height: 100vh;
  &-head {
    height: 90px;
    background-color: #4ccccb;
    border-radius: 0 0 25px 25px;
    position: relative;
    .con {
      width: 90%;
      margin: 10px auto;
      position: absolute;
      top: 10px;
      right: 10px;
      height: 100px;
      h1 {
        color: #fff;
        font-size: 20px;
        margin: 0;
        font-weight: 500;
      }
      .search {
        height: 40px;
        border-radius: 20px;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0 15px;
        margin-top: 20px;
        box-shadow: 0 0 10px #ccc;
        color: var(--cp-dark);
        font-size: 14px;
      }
    }
  }
  &-navs {
    margin-top: 35px;
    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      .cp-icon {
        font-size: 48px;
      }
      p {
        margin: 0;
      }
      .title {
        font-weight: 500;
        margin-top: 5px;
        color: var(--cp-text1);
      }
      .desc {
        font-size: 11px;
        color: var(--cp-tag);
        margin-top: 2px;
      }
    }
    .min {
      .cp-icon {
        font-size: 31px;
      }
      .title {
        font-size: 13px;
        color: var(--cp-text2);
        font-weight: normal;
      }
    }
  }
  .home-banner {
    padding: 10px 15px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.doctorNav {
  background-color: #f6f7f9;
  height: 250px;
  .top {
    padding: 0 15px;
    font-size: 13px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .more {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
