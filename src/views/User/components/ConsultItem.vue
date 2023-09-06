<template>
  <div class="consult-item">
    <div class="top">
      <img src="@/assets/avatar-doctor.svg" alt="" />
      <p>{{ item.docInfo.name || '极速问诊(自动分配医生)' }}</p>
      <span
        :class="{
          orange: item.status === Status.ConsultPay,
          green: item.status === Status.The3
        }"
        >{{ item.statusValue }}</span
      >
    </div>
    <div class="body" @click="tiaozhuan(item.id)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ item.payment.toFixed(2) }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">{{ item.createTime }}</div>
      </div>
    </div>
    <div class="foot" v-if="item.status === Status.The3">
      <van-button
        class="gray"
        plain
        size="small"
        round
        @click="onShowPrescription(item.prescriptionId as string)"
        >查看处方</van-button
      >
      <van-button type="primary" plain size="small" round :to="`/user/consult/${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === Status.The2">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="cancelConsultOrder(item)"
        >取消问诊</van-button
      >
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === Status.ConsultPay">
      <van-button
        v-if="item.prescriptionId"
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="cancelConsultOrder(item)"
      >
        取消问诊
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续支付
      </van-button>
    </div>
    <div class="foot" v-if="item.status === Status.The4">
      <!-- <div class="more">
        <van-popover
          placement="top-start"
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference> 更多 </template>
        </van-popover>
      </div> -->
      <ConsultItem
        @on-delete="deleteConsultOrder(item)"
        @on-preview="onShowPrescription(item.prescriptionId as string)"
      ></ConsultItem>
      <van-button class="gray" plain size="small" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button v-if="!item.evaluateId" type="primary" plain size="small" round>
        去评价
      </van-button>
      <van-button v-else class="gray" plain size="small" round> 查看评价 </van-button>
    </div>
    <div class="foot" v-if="item.status === Status.The5">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="deleteLoading"
        @click="deleteConsultOrder(item)"
        >删除订单</van-button
      >
      <van-button type="primary" plain size="small" round to="/">咨询其他医生</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
const router = useRouter()
const route = useRoute()
import type { ConsultOrderItem } from '@/types/consult'
import { Status } from '@/enums'
import { cancelOrder, deleteOrder } from '@/services/consult'
import { showSuccessToast, showFailToast } from 'vant'
import ConsultItem from '@/views/User/components/ConsultMore.vue'
const props = defineProps<{
  item: ConsultOrderItem
}>()
const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: !props.item.prescriptionId },
  { text: '删除订单' }
])

// // 取消订单
// const loading = ref(false)
// const cancelConsultOrder = async (item: ConsultOrderItem) => {
//   try {
//     loading.value = true
//     await cancelOrder(item.id)
//     item.status = Status.The5
//     item.statusValue = '已取消'
//     showSuccessToast('取消成功！')
//   } catch (error) {
//     showFailToast('取消失败')
//   } finally {
//     loading.value = false
//   }
// }

import { useCancelOrder } from '@/composable'
const { cancelConsultOrder, loading } = useCancelOrder()

// 删除订单
const deleteLoading = ref(false)
const deleteConsultOrder = async (item: ConsultOrderItem) => {
  try {
    deleteLoading.value = true
    await deleteOrder(item.id)
    showSuccessToast('删除成功！')
    emits('on-delete', item.id)
  } catch (error) {
    showFailToast('删除失败')
  } finally {
    deleteLoading.value = false
  }
}
const emits = defineEmits<{
  (e: 'on-delete', id: string): void
}>()
// 查看处方 引入hooks
import { useShowPrescription } from '@/composable'
const { onShowPrescription } = useShowPrescription()

// 跳转问诊详情
const tiaozhuan = (id: string | number) => {
  router.push(`/user/consult/${id}`)
}
</script>

<style lang="scss" scoped>
.consult-item {
  background-color: #fff;
  margin-bottom: 10px;
  .top {
    height: 45px;
    border-bottom: 1px solid var(--cp-bg);
    display: flex;
    align-items: center;
    padding: 0 15px;
    .orange {
      color: orange;
    }
    .green {
      color: var(--cp-primary);
    }
    img {
      width: 21px;
      height: 21px;
    }
    > p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
  }
  .body {
    padding: 10px 15px;
    .body-row {
      display: flex;
      margin-bottom: 7px;
      .body-label {
        width: 62px;
        font-size: 13px;
        color: var(--cp-tip);
      }
      .body-value {
        width: 250px;
        &.tip {
          color: var(--cp-tip);
        }
      }
    }
  }
  .foot {
    display: flex;
    padding: 0 15px 15px 15px;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
  }
}
</style>
