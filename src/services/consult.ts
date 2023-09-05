import type {
  KnowledgeParams,
  KnowledgePage,
  PageParams,
  Image,
  DoctorPage,
  FollowType,
  TopDep,
  PartialConsult
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

// 生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)

// 获取支付地址 0是微信 1是支付宝
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)

// 查询问诊记录所有信息
import type { ConsultOrderPage, ConsultOrderListParams } from '@/types/consult'
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)

// 取消订单
export const cancelOrder = (id: string) => request(`/patient/order/cancel/${id}`, 'PUT')

// 删除订单
export const deleteOrder = (id: string) => request(`/patient/order/${id}`, 'DELETE')
