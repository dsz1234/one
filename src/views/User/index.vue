<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <img :src="user?.avatar" alt="" />
        <div class="right">
          <p>{{ user?.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ user?.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order">全部订单<van-icon name="arrow" /></router-link>
      </div>
      <van-row>
        <van-col span="6">
          <cpIcons name="user-paid" />
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <cpIcons name="user-shipped" />
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <cpIcons name="user-received" />
          <p>待收获</p>
        </van-col>
        <van-col span="6">
          <div class="aa"><cpIcons name="user-finished" /></div>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>

    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell
        v-for="(item, index) in tools"
        :title="item.label"
        :key="index"
        is-link
        :border="false"
      >
        <template #icon><cpIcons :name="`user-tool-0${index + 1}`" /></template>
      </van-cell>
    </div>

    <a class="logout" href="javascript:;" @click="logOut">退出登录</a>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getUserInfo } from '@/services/user'
import type { UserInfo } from '@/types/user'
import cpIcons from '@/components/cp-icons.vue'
import { useUserStore } from '@/stores'
import { showConfirmDialog } from 'vant'
const router = useRouter()

const user = ref<UserInfo>()
const initUserList = async () => {
  let res = await getUserInfo()
  // console.log(res)
  user.value = res.data
  // console.log(user.value)
}
initUserList()

const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]
// 退出登录
const logOut = async () => {
  const store = useUserStore()
  await showConfirmDialog({
    title: '温馨提示',
    message: '您确认要退出优医问诊吗？'
  })
  store.delUser()
  router.push('/')
}
</script>

<style lang="scss">
.user-page {
  min-height: calc(100vh - 50px);
  background: var(--cp-bg);
  padding: 0 15px 65px;

  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;

    .top {
      display: flex;
      align-items: center;
      padding-top: 35px;

      .right {
        padding-left: 15px;

        p:first-child {
          font-size: 17px;
          font-weight: 600;
        }

        p:last-child {
          color: var(--cp-primary);
        }
      }

      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }

    .van-row {
      margin-top: 15px;
      margin: 0 -15px;

      p {
        text-align: center;
        margin: 0 5px;

        &:first-child {
          font-weight: 700;
          font-size: 17px;
        }

        &:last-child {
          font-size: 13px;
          color: var(--cp-dark);
        }
      }
    }
  }

  &-order {
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;

    .head {
      display: flex;
      justify-content: space-between;

      h3 {
        margin: 0;
        font-size: 18px;
      }

      a {
        color: var(--cp-dark);
      }
    }
    .van-row {
      margin: 10px 0;
      .van-col {
        text-align: center;
        .cp-icon {
          font-size: 30px;
        }
        p {
          margin: 0;
          padding-top: 4px;
        }
      }
    }
  }
  &-group {
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    h3 {
      margin: 0;
      font-size: 18px;
    }
    .van-cell {
      align-items: center;
      padding: 5px 10px;
      margin-bottom: 5px;
      .cp-icon {
        font-size: 20px;
      }
    }
  }
}
.logout {
  width: 100%;
  display: inline-block;
  text-align: center;
  margin: 10px 0;
}
</style>
