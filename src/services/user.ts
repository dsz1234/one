import request from '@/utils/request'
import type { User, CodeType, UserInfo, PatientList, Patient } from '@/types/user'

// 密码登录
export const LoginApi = (mobile: String, password: String) =>
  request<User>('/login/password', 'POST', { mobile, password })

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) =>
  request('/code', 'GET', { mobile, type })

//短信登录
export const loginByMobile = (mobile: string, code: string) =>
  request<User>('/login', 'POST', { mobile, code })

// 获取个人信息
export const getUserInfo = () => request<UserInfo>('/patient/myUser')

// 获取家庭患者信息
export const getPatientList = () => request<PatientList>('/patient/mylist')

// 添加家庭患者
export const addPatient = (data: Patient) => request('/patient/add', 'POST', data)

// 编辑家庭患者
export const editPatient = (data: Patient) => request('/patient/update', 'PUT', data)

// 删除患者信息
export const delPatient = (id: string) => request(`/patient/del/${id}`, 'DELETE')

// 查询患者详情
export const getPatientDetail = (id: string) => request<Patient>(`/patient/info/${id}`)
