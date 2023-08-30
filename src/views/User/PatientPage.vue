<template>
  <div class="patient-page">
    <lgNavBar title="家庭档案"></lgNavBar>

    <div class="patient-page-nav">
      <div class="list" v-for="(item, index) in patientList" :key="index">
        <p>
          <span class="name">{{ item.name }}</span>
          <span class="pid">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}</span>
        </p>
        <p>
          <span class="gender">{{ item.genderValue }}</span>
          <span class="age">{{ item.age }}岁</span>
        </p>
        <span class="moren" v-if="item.defaultFlag == 1">默认</span>
        <div class="icons" @click="showPopup(item)">
          <cpIcons name="user-edit"></cpIcons>
        </div>
      </div>
      <div class="add-user" v-if="patientList.length <= 6" @click="showPopup()">
        <cpIcons name="user-add"></cpIcons>
        <p>添加患者</p>
      </div>
      <!-- <cpRadioBtn
        :options="options"
        :modelValue="gender"
        @update:model-value="gender = $event"
      ></cpRadioBtn> -->
      <p class="addNum">最多可添加6人</p>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model:show="showRight" position="right" :style="{ width: '100%', height: '100%' }">
      <cpNavBar
        :title="patient.id ? '编辑患者' : '添加患者'"
        rightText="保存"
        :back="hidePopup"
        @click-right="submit"
      ></cpNavBar>
      <van-form autocomplete="off">
        <van-field
          label="真实姓名"
          :rules="nameRules"
          v-model="patient.name"
          placeholder="请输入真实姓名"
        ></van-field>
        <van-field
          label="身份证号"
          v-model="patient.idCard"
          placeholder="请输入身份证号"
          :rules="idCardRules"
        ></van-field>
        <van-field label="性别" class="pb4">
          <template #input>
            <cpRadioBtn :options="options" v-model="patient.gender"></cpRadioBtn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox :icon-size="18" round v-model="defaultFlag"></van-checkbox>
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="remove">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
// import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
// const router = useRouter()
// const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import cpIcons from '@/components/cp-icons.vue'
import type { PatientList, Patient } from '@/types/user'
import { getPatientList } from '@/services/user'
import cpRadioBtn from '@/components/cp-radio-btn.vue'
import cpNavBar from '@/components/lg-nav-bar.vue'
import { nameRules, idCardRules } from '@/utils/rules'
import Validator from 'id-validator'
import { showConfirmDialog, showSuccessToast, showToast } from 'vant'
import { addPatient, editPatient, delPatient } from '@/services/user'

const patientList = ref<PatientList>([])
const initPatient = async () => {
  let res = await getPatientList()
  console.log(res)
  patientList.value = res.data
}
initPatient()
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

const patient = ref<Patient>({
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
})

// 添加患者
const showRight = ref<boolean>(false)
const showPopup = (item?: Patient) => {
  if (item) {
    // 如果点的是编辑，解构出后台需要的数据
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  }
  showRight.value = true
}

// 关闭弹出层
const hidePopup = () => {
  patient.value = { name: '', idCard: '', gender: 1, defaultFlag: 0 }
  showRight.value = false
}

const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})
// 点击保存
const submit = async () => {
  const validate = new Validator()
  if (!validate.isValid(patient.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validate.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不符')

  patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
  showRight.value = false
  initPatient()
  showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
}
// 删除患者
const remove = async () => {
  if (patient.value.id) {
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗 ？`
    })
    await delPatient(patient.value.id)
    showRight.value = false
    initPatient()
    showSuccessToast('删除成功')
  }
}
</script>

<style lang="scss">
.patient-page {
  padding: 50px 15px 0;
  margin-top: 15px;
  &-nav {
    .list {
      background-color: #f6f7f8;
      border-radius: 5px;
      padding: 15px;
      box-sizing: border-box;
      position: relative;
      margin-bottom: 15px;
      p {
        margin: 0;
        .name {
          font-weight: 600;
          font-size: 18px;
          margin-right: 25px;
          width: 55px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .gender {
          margin-right: 25px;
        }
      }
      p:first-child {
        margin-bottom: 15px;
      }
      p:last-child {
        font-size: 13px;
        color: var(--cp-dark);
      }
      .moren {
        background-color: var(--cp-primary);
        color: #fff;
        border-radius: 2px;
        width: 30px;
        height: 17px;
        display: inline-block;
        font-size: 11px;
        text-align: center;
        position: absolute;
        right: 60px;
        top: 19px;
      }
      .icons {
        color: var(--cp-dark) !important;
        position: absolute;
        top: 32px;
        right: 19px;
      }
    }
    .add-user {
      background-color: #f6f7f8;
      border-radius: 5px;
      padding: 15px;
      box-sizing: border-box;
      color: var(--cp-primary);
      text-align: center;
      .cp-icon {
        font-size: 26px !important;
      }
      p {
        margin: 0;
        font-size: 15px;
      }
    }
    .addNum {
      color: var(--cp-tag);
      font-weight: 600;
    }
  }
  .van-popup {
    padding-top: 46px;
  }
}
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
