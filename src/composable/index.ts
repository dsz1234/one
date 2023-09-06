import { ref } from 'vue'
import type { ConsultOrderItem, FollowType } from '@/types/consult'
import { cancelOrder, followOrUnfollow } from '@/services/consult'

import { OrderType } from '@/enums'

export const useFollow = (type: FollowType) => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}

import { getPrescriptionPic } from '@/services/consult'
import { showFailToast, showImagePreview, showSuccessToast } from 'vant'
// 点击查看处方
export const useShowPrescription = () => {
  const onShowPrescription = async (id: string) => {
    const res = await getPrescriptionPic(id)
    // console.log(res)
    showImagePreview([res.data.url])
  }
  return { onShowPrescription }
}

export const useCancelOrder = () => {
  // 取消订单
  const loading = ref(false)
  const cancelConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await cancelOrder(item.id)
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      showSuccessToast('取消成功！')
    } catch (error) {
      showFailToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return {
    cancelConsultOrder,
    loading
  }
}
