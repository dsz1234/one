import type {
  KnowledgeParams,
  KnowledgePage,
  PageParams,
  DoctorPage,
  FollowType
} from '@/types/consult'
import request from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

// 关注信息接口
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

// 关注与取消关注的接口
export const followOrUnfollow = (id: string, type: FollowType) =>
  request('/like', 'POST', { id, type })
