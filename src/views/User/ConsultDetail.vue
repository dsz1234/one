<template>
  <div class="detail" v-if="detailList">
    <lgNavBar title="问诊详情"></lgNavBar>
    <div class="top">
      <div class="head">
        <div class="tit">
          <h3>图文问诊 {{ detailList.actualPayment }} 元</h3>
          <p>服务医生信息</p>
        </div>
        <p class="awit">
          {{ detailList.statusValue }}
        </p>
      </div>
      <div class="whirt">
        <img src="../../assets//avatar-doctor.svg" alt="" />
        <div class="count">
          <p>极速问诊</p>
          <p>{{ detailList.docInfo?.name || '自动分配医生' }}</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${detailList.patientInfo.name} | ${detailList.patientInfo.genderValue} | ${detailList.patientInfo.age}岁`"
        />
        <van-cell title="患病时长" :value="getIllnessTimeText(detailList.illnessTime as number)" />
        <van-cell title="就诊情况" :value="getConsultFlagText(detailList.consultFlag as number)" />
        <van-cell title="病情描述" :label="detailList.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="fg"></div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy" @click="onCopy">复制</span>
            {{ detailList.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="detailList.createTime" />
        <van-cell title="应付款" :value="`￥${detailList.actualPayment}`" />
        <van-cell title="优惠券" :value="`-￥${detailList.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${detailList.pointDeduction}`" />
        <van-cell title="实付款" :value="`-￥${detailList.payment}`" class="price" />
      </van-cell-group>
    </div>
    <!-- 待支付 -->
    <div class="foot" v-if="detailList.status === OrderType.ConsultPay">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ detailList.actualPayment }}</span>
      </div>
      <van-button type="default" round @click="cancelConsultOrder(detailList)" :loading="loading"
        >取消问诊</van-button
      >
      <van-button type="primary" round @click="show = true">继续支付</van-button>
    </div>
    <!-- 待接诊 -->
    <div class="foot" v-if="detailList.status === OrderType.ConsultWait">
      <van-button type="default" round @click="cancelConsultOrder(detailList)" :loading="loading"
        >取消问诊</van-button
      >
      <van-button type="primary" round :to="`/room?orderId=${detailList.id}`">继续沟通</van-button>
    </div>
    <!-- 咨询中 -->
    <div class="foot" v-if="detailList.status === OrderType.ConsultChat">
      <van-button type="default" round v-if="detailList.prescriptionId">查看处方</van-button>
      <van-button type="primary" round :to="`/room?orderId=${detailList.id}`">继续沟通</van-button>
    </div>
    <!-- 已完成 -->
    <div class="foot" v-if="detailList.status === OrderType.ConsultComplete">
      <ConsultMore
        :disabled="!detailList.prescriptionId"
        @on-preview="onShowPrescription(detailList.prescriptionId as string)"
        @on-delete="deleteConsultOrder(detailList)"
      ></ConsultMore>
      <van-button type="default" round :to="`/room?orderId=${detailList.id}`">问诊记录</van-button>
      <van-button type="default" round v-if="detailList.evaluateId">查看评价</van-button>
      <van-button type="primary" round v-else>写评价</van-button>
    </div>
    <!-- 取消问诊 -->
    <div class="foot" v-if="detailList.status === OrderType.ConsultCancel">
      <van-button type="default" round>删除订单</van-button>
      <van-button type="primary" round to="/">咨询其他医生</van-button>
    </div>
    <cp-pay-sheet
      v-model:show="show"
      :order-id="detailList.id"
      :actualPayment="detailList.actualPayment"
    />
  </div>
  <div class="guJiaP" v-else>
    <lgNavBar title="问诊详情"></lgNavBar>
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
const router = useRouter()
const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'

import { OrderType } from '@/enums'
import { deleteOrder, getConsultDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
const detailList = ref<ConsultOrderItem>()
import ConsultMore from './components/ConsultMore.vue'
const getXqList = async () => {
  let res = await getConsultDetail(route.params.id as string)
  // console.log(res)
  detailList.value = res.data
  console.log(detailList.value)
}
getXqList()

// 查看处方
import { useShowPrescription } from '@/composable'
const { onShowPrescription } = useShowPrescription()

// 复制
import { useClipboard } from '@vueuse/core'
import { showFailToast, showSuccessToast, showToast } from 'vant'
const { copy, isSupported } = useClipboard()
// 点击复制
const onCopy = async () => {
  if (!isSupported.value) return showToast('未授权，不支持')
  await copy(detailList.value?.orderNo || '')
  showToast('已复制')
}

// 取消问诊
import { useCancelOrder } from '@/composable'
const { cancelConsultOrder, loading } = useCancelOrder()

// 删除订单
const emits = defineEmits<{
  (e: 'on-delete', id: string): void
}>()
const deleteConsultOrder = async (item: ConsultOrderItem) => {
  try {
    await deleteOrder(item.id)
    showSuccessToast('删除成功！')
    router.push('/user/consult')
    emits('on-delete', item.id)
  } catch (error) {
    showFailToast('删除失败')
  }
}

const show = ref(false)
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 46px;
  .top {
    padding: 15px;
    height: 90px;
    background: linear-gradient(#f7fcfc, #daf2ef);
    border-radius: 0 0 30px 30px;
    position: relative;
    .head {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .tit {
        h3 {
          font-size: 16px;
        }
        p {
          font-size: 13px;
          color: var(--cp-text3);
          margin-top: 5px;
        }
      }
      .awit {
        color: var(--cp-primary);
        font-size: 15px;
        font-weight: 600;
      }
    }
    .whirt {
      background-color: #fff;
      border-radius: 5px;
      padding: 15px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 0 8px var(--cp-line);
      position: absolute;
      width: 92%;
      box-sizing: border-box;
      bottom: -31px;
      left: 15px;
      img {
        width: 40px;
        height: 40px;
      }
      .count {
        flex: 1;
        padding-left: 10px;
      }
    }
  }
  .fg {
    height: 12px;
    background-color: #f6f7f9;
  }
  .detail-patient {
    margin-top: 50px;
  }
  .detail-order {
    h3 {
      padding: 15px 0 10px 15px;
      font-size: 17px;
      font-weight: normal;
    }
    .copy {
      color: var(--cp-primary);
      border: 1px solid var(--cp-primary);
      background-color: #ebf8f6;
      padding: 3px 8px;
      border-radius: 13px;
      font-size: 12px;
      margin-right: 10px;
    }
    :deep(.van-cell__title) {
      width: 70px;
      flex: none;
    }
    .price :deep(.van-cell__value) {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
  .foot {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    justify-content: flex-end;
    bottom: 0;
    left: 0;
    background-color: #fff;
    .price {
      flex: 1;
      > span:last-child {
        font-size: 18px;
        color: var(--cp-price);
        padding-left: 5px;
      }
    }
    .van-button {
      margin-left: 10px;
    }
    :deep(.van-button--default) {
      background-color: var(--cp-bg);
      color: var(--cp-text3);
    }
  }
}
</style>
