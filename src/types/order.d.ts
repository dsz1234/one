// 数据信息---收货地址
export type AddressItem = {
  /**
   * 详细地址
   */
  addressDetail: string
  /**
   * 所在城市名称
   */
  city: string
  /**
   * 所在城市编码
   */
  cityCode: string
  /**
   * 所在区县名称
   */
  county: string
  /**
   * 所在区/县编码
   */
  countyCode: string
  /**
   * 收货地址id
   */
  id: string
  /**
   * 是否为默认1为是，0为否
   */
  isDefault: number
  /**
   * 联系方式
   */
  mobile: string
  /**
   * 所在省份名称
   */
  province: string
  /**
   * 所在省份编码
   */
  provinceCode: string
  /**
   * 收货人姓名
   */
  receiver: string
}

//返回数据
export type OrderPre = {
  /**
   * 实际支付
   */
  actualPayment: number
  /**
   * 优惠券抵扣
   */
  couponDeduction: number
  /**
   * 使用的优惠券id
   */
  couponId: string
  /**
   * 运费
   */
  expressFee: number
  /**
   * 处方id
   */
  id: string
  /**
   * 药品信息
   */
  medicines: Medicine[]
  /**
   * 应付金额(药品总价格)
   */
  payment: number
  /**
   * 积分可抵扣
   */
  pointDeduction: number
}

// 返回卡片内容的信息
export type Medicine = {
  /**
   * 药品价格
   */
  amount: string
  /**
   * 药品图片
   */
  avatar: string
  /**
   * 主键id
   */
  id: string
  /**
   * 药品名称
   */
  name: string
  /**
   * 是否是处方药0不是1是
   */
  prescriptionFlag: number
  /**
   * 选择的药品数量
   */
  quantity: number
  /**
   * 药品规格
   */
  specs: string
  /**
   * 药品用法用量
   */
  usageDosag: string
}
