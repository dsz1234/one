<template>
  <div class="login">
    <!-- 导航栏 -->
    <lg-nav-bar :rightText="rightText" @click-right="$router.push('/register')"></lg-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h2>{{ isPass ? '密码登录' : '短信验证码登录' }}</h2>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group van-cell-group>
        <van-field
          v-model="loginForm.mobile"
          name="loginForm.mobile"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]"
        />
        <van-field
          v-if="isPass"
          v-model="loginForm.password"
          :type="show ? 'text' : 'password'"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #button>
            <img src="@/assets/eye-off.svg" alt="" @click="show = !show" v-if="!show" />
            <img src="@/assets/eye-on.svg" alt="" @click="show = !show" v-else />
          </template>
        </van-field>
        <van-field v-else placeholder="短信验证码" v-model="loginForm.code" :rules="codeRules">
          <template #button>
            <span class="btn-send" @click="send">{{
              time > 0 ? `${time}s后再次发送` : '发送验证码'
            }}</span>
          </template>
        </van-field>
      </van-cell-group>
      <div class="cp-cell">
        <van-checkbox v-model="agree"></van-checkbox>
        <span>我已同意</span>
        <a href="javascript:;">用户协议</a>
        <span>及</span>
        <a href="javascript:;">隐私条款</a>
      </div>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>
      </div>
      <p class="wantMm">忘记密码?</p>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { showToast, showSuccessToast, type FormInstance } from 'vant'
import { ref } from 'vue'
import { LoginApi, sendMobileCode, loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores'
import { codeRules } from '@/utils/rules'
import { onUnmounted } from 'vue'
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const rightText = ref('注册')

const loginForm = ref({
  mobile: '13230000001',
  password: 'abc12345',
  code: ''
})
// 密码状态
const show = ref<boolean>(false)
// 我已同意的状态
const agree = ref<boolean>(false)

// 点击登录
const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
  let res = isPass.value
    ? await LoginApi(loginForm.value.mobile, loginForm.value.password)
    : await loginByMobile(loginForm.value.mobile, loginForm.value.code)
  // console.log(res)
  store.setUser(res.data)
  router.push((route.query.returnUrl as string) || '/home')
  showSuccessToast('登录成功')
}

// 切换验证码状态
const isPass = ref(true)

const form = ref<FormInstance>()
const time = ref(0)
let timeId: number
const send = async () => {
  if (time.value > 0) return
  // 验证不通过报错，阻止程序继续执行
  await form.value?.validate('mobile')
  let res = await sendMobileCode(loginForm.value.mobile, 'login')
  // console.log(res)
  loginForm.value.code = res.data.code
  showSuccessToast('发送成功')
  time.value = 60
  // 倒计时
  clearInterval(timeId)
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
  }, 1000)
}
onUnmounted(() => {
  window.clearInterval(timeId)
})
</script>

<style lang="scss" scoped>
.login {
  &-head {
    height: 50px;
    padding: 60px 30px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      color: var(--cp-text1);
      font-size: 14px;
    }
    h2 {
      font-weight: 500;
      font-size: 25px;
    }
  }
}
.van-form {
  img {
    width: 20px;
    height: 20px;
  }
  .cp-cell {
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-top: 15px;
    span {
      color: var(--cp-text1);
      font-size: 15px;
      margin: 0 5px;
    }
    a {
      color: var(--cp-primary);
      font-size: 15px;
    }
  }
}
.wantMm {
  padding: 0 30px;
  box-sizing: border-box;
  font-size: 15px;
}
.login-other {
  margin-top: 40px;
  padding: 0 30px;

  .icon {
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
.btn-send {
  color: var(--cp-primary);
}
</style>
