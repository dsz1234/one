const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码6个数字' }
]

const nameRules = [{ required: true, message: '请输入姓名' }]
const idCardRules = [{ required: true, message: '请输入身份证号' }]

export { codeRules, nameRules, idCardRules }
