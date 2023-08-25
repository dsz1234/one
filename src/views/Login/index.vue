<template>
  <div class="login">
    <!-- 导航栏 -->
    <lg-nav-bar :rightText="rightText" @click-right="$router.push('/register')"></lg-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h2>密码登录</h2>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]"
        />
        <van-field
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
import { showToast } from 'vant'
import { ref } from 'vue'
import { LoginApi } from '@/services/user'
import { useUserStore } from '@/stores'
import { showSuccessToast } from 'vant'
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const rightText = ref('注册')

const loginForm = ref({
  mobile: '13230000001',
  password: 'abc12345'
})
// 密码状态
const show = ref<boolean>(false)
// 我已同意的状态
const agree = ref<boolean>(false)

// 点击登录
const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
  let res = await LoginApi(loginForm.value.mobile, loginForm.value.password)
  console.log(res)
  store.setUser(res.data)
  router.push((route.query.returnUrl as string) || '/user')
  showSuccessToast('登录成功')
}
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
</style>
