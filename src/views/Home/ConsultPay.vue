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
      <van-checkbox>我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>
    <van-submit-bar button-type="primary" :price="2900" button-text="立即支付" text-align="left" />
  </div>
</template>

<script lang="ts" setup>
// import {useRouter,useRoute} from 'vue-router'
import { ref, onMounted } from 'vue'
// const router = useRouter()
// const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import { getConsultOrderPre } from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/user'
const store = useConsultStore()

const payInfo = ref<ConsultOrderPreData>()
const loadData = async () => {
  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  console.log(res)

  payInfo.value = res.data
  // 设置默认优惠券
  store.setCoupon(payInfo.value.couponId)
}

const patient = ref<Patient>()
const loadPatient = async () => {
  if (!store.consult.patientId) return
  const res = await getPatientDetail(store.consult.patientId)
  console.log(res)

  patient.value = res.data
}

onMounted(() => {
  loadData()
  loadPatient()
})
</script>

<style lang="scss" scoped>
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
</style>
