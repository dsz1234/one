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
        <div class="icons">
          <cpIcons name="user-edit"></cpIcons>
        </div>
      </div>
      <div class="add-user" v-if="patientList.length <= 6">
        <cpIcons name="user-add"></cpIcons>
        <p>添加患者</p>
      </div>
      <p class="addNum">最多可添加6人</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
// const router = useRouter()
// const route = useRoute()
import lgNavBar from '@/components/lg-nav-bar.vue'
import cpIcons from '@/components/cp-icons.vue'
import type { PatientList } from '@/types/user'
import { getPatientList } from '@/services/user'
const patientList = ref<PatientList>([])
const initPatient = async () => {
  let res = await getPatientList()
  console.log(res)
  patientList.value = res.data
}
initPatient()
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
          width: 50px;
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
}
</style>
