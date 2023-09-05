<template>
  <div class="pay-page" v-if="payInfo && patient">
    <lgNavBar title="支付"></lgNavBar>
    <div class="top">
      <p class="tit">图文问诊 {{ payInfo.payment }} 元</p>
      <div class="bot">
        <img src="../../assets/avatar-doctor.svg" alt="" />
        <div class="right">
          <p class="one">极速问诊</p>
          <p class="two">自动分配医生</p>
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo.pointDeduction}`" />
      <van-cell title="实付款" :value="`-¥${payInfo.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient.name} | ${patient.genderValue} | ${patient.age}岁`"
      />
      <van-cell title="病情描述" :label="store.consult.illnessDesc" />
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>
    <van-submit-bar
      button-type="primary"
      :price="payInfo.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
      @click="submit"
      :loading="loading"
    />
    <!-- 选择付款方式抽屉 -->
    <van-action-sheet
      v-model:show="show"
      title="选择支付方式"
      :closeable="false"
      :close-on-popstate="false"
      @close="onclose"
    >
      <div class="content">
        <p class="tit">￥{{ payInfo.actualPayment.toFixed(2) }}</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="paymentMethod = 0">
            <template #icon>
              <cpIcons name="consult-wechat"></cpIcons>
            </template>
            <template #right-icon>
              <van-checkbox :checked="paymentMethod === 0"></van-checkbox>
            </template>
          </van-cell>
          <van-cell title="支付宝支付" @click="paymentMethod = 1">
            <template #icon>
              <cpIcons name="consult-alipay"></cpIcons>
            </template>
            <template #right-icon>
              <van-checkbox :checked="paymentMethod === 1"></van-checkbox>
            </template>
          </van-cell>
        </van-cell-group>
        <van-button round block class="btnPay" @click="pay">立即支付</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
const router = useRouter()
// const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import { getConsultOrderPre, createConsultOrder } from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/user'
import { showConfirmDialog, showDialog, showLoadingToast, showToast } from 'vant'
import cpIcons from '@/components/cp-icons.vue'
import { getConsultOrderPayUrl } from '@/services/consult'
const store = useConsultStore()

const payInfo = ref<ConsultOrderPreData>()
const loadData = async () => {
  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  // console.log(res)

  payInfo.value = res.data
  // 设置默认优惠券
  store.setCoupon(payInfo.value.couponId)
}

const patient = ref<Patient>()
const loadPatient = async () => {
  if (!store.consult.patientId) return
  const res = await getPatientDetail(store.consult.patientId)
  // console.log(res)

  patient.value = res.data
}

// 刷新页面，数据丢失，关后提示
onMounted(() => {
  if (
    !store.consult.type ||
    !store.consult.illnessType ||
    !store.consult.depId ||
    !store.consult.patientId
  ) {
    return showDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
  loadData()
  loadPatient()
})

const agree = ref(false)
const show = ref(false)
const loading = ref(false)
const orderId = ref('')
const paymentMethod = ref<0 | 1>()
// 点击立即支付
const submit = async () => {
  if (!agree.value) return showToast('请勾选我已同意支付协议')
  loading.value = true
  const res = await createConsultOrder(store.consult)
  // console.log(res)
  orderId.value = res.data.id
  loading.value = false
  //TODO 清空病情信息
  // store.clear()
  // 打开抽屉
  show.value = true
}
// 在离开当前路由前触发
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})

// 关闭抽屉式触发
const onclose = () => {
  // console.log(111)
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then(() => {
      show.value = true
      return false
    })
    .catch(() => {
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}

// 点击支付
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({ message: '跳转支付', duration: 0 })
  const res = await getConsultOrderPayUrl({
    orderId: orderId.value,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://localhost:5173/#/room'
  })
  window.location.href = res.data.payUrl
}
</script>

<style lang="scss">
.pay-page {
  padding-top: 46px;

  .top {
    padding: 15px;

    .tit {
      font-size: 17px;
    }

    .bot {
      display: flex;
      align-items: center;
      margin-top: 10px;

      img {
        width: 40px;
        height: 40px;
      }

      .right {
        margin-left: 10px;

        .one {
          font-size: 16px;
          margin-bottom: 2px;
        }

        .two {
          font-size: 13px;
          color: var(--cp-text3);
        }
      }
    }
  }

  .pay-price {
    ::v-deep() {
      .vam-cell__title {
        font-size: 16px;
      }

      .van-cell__value {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }

  .pay-space {
    background-color: #f6f7f9;
    height: 12px;
  }

  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      color: var(--cp-primary);
    }
  }
}
.content {
  padding-bottom: 10px;
  .tit {
    font-weight: 600;
    font-size: 17px;
    text-align: center;
    margin-bottom: 20px;
  }
  .van-cell__title {
    margin-left: 10px;
  }
  .cp-icon {
    font-size: 20px;
  }
}
.btnPay {
  background-color: var(--cp-primary);
  margin-top: 15px;
  .van-button__text {
    color: #fff;
  }
}
</style>
