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

//购买药品订单详情
export type OrderDetail = {
  /** 药品订单ID */
  id: string
  /** 药品订单编号 */
  orderNo: string
  /** 订单类型 */
  type: number
  /** 创建时间 */
  createTime: string
  /** 处方ID */
  prescriptionId: string
  /** 订单状态 */
  status: OrderType
  /** 订单状态说明 */
  statusValue: string
  /** 药品清单 */
  medicines: Medical[]
  /** 支付倒计时时间 */
  countDown: number
  /** 收货地址 */
  addressInfo: Address
  /** 物流信息 */
  expressInfo: {
    /** 物流最新位置 */
    content: string
    /** 物流最新时间 */
    time: string
  }
  /** 支付时间 */
  payTime: string
  /** 支付方式 */
  paymentMethod?: 0 | 1
  /** 支付金额 */
  payment: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 邮费 */
  expressFee: number
  /** 实付金额 */
  actualPayment: number
  /** 问诊室ID */
  roomId: string
}

export type Express = {
  /** 物流信息ID */
  id: string
  /** 物流内容 */
  content: string
  /** 创建时间 */
  createTime: string
  /** 物流状态 */
  status: ExpressStatus
  /** 状态文章 */
  statusValue: string
}

export type Location = {
  /** 经度 */
  longitude: string
  /** 纬度 */
  latitude: string
}

export type Logistics = {
  /** 预计送达时间 */
  estimatedTime: string
  /** 物流公司名称 */
  name: string
  /** 物流编号 */
  awbNo: string
  /** 最新物流状态 */
  status: ExpressStatus
  /** 最新物流状态文字 */
  statusValue: string
  /** 物流信息数组 */
  list: Express[]
  /** 轨迹信息数组 */
  logisticsInfo: Location[]
  /** 当前运输位置 */
  currentLocationInfo: Location
}
