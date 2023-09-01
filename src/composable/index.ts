import { ref } from 'vue'
import type { FollowType } from '@/types/consult'
import { followOrUnfollow } from '@/services/consult'

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
