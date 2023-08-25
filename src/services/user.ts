import request from '@/utils/request'
import type { User } from '@/types/user'

export const LoginApi = (mobile: String, password: String) =>
  request<User>('/login/password', 'POST', { mobile, password })
