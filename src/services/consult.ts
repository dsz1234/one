import type {
  KnowledgeParams,
  KnowledgePage,
  PageParams,
  Image,
  DoctorPage,
  FollowType,
  TopDep
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

//请求科室的数据
export const getAllDep = () => request<TopDep[]>('/dep/all')

// 定义图片上传
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}

import type { ConsultOrderPreData, ConsultOrderPreParams } from '@/types/consult'
// 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)
