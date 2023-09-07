import type { OrderPre, AddressItem } from './../types/order.d'
import request from '@/utils/request'

// 查询药品订单信息
export const getMedicalOrderPre = (params: { prescriptionId: string }) =>
  request<OrderPre>('/patient/medicine/order/pre', 'GET', params)

//获取收获地址列表
export const getAddressList = () => request<AddressItem[]>('/patient/order/address')
