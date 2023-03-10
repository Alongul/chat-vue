<template>
  <view class="login">
    <view class="login-top">
      <text @click="toLogon">注册</text>
    </view>
    <view class="login-center">
      <view class="login-title">欢迎来到自由联盟</view>
      <view class="login-name">
        <input :maxlength="20" v-model="loginName" placeholder="请输入用户名" />
      </view>
      <view class="login-password">
        <input
          class="uni-input"
          placeholder="请输入密码"
          :password="showPassword"
          maxlength="20"
          v-model="password"
        />
        <uni-icons
          type="eye"
          class="login-eye"
          :color="eyeColor"
          size="25"
          @click="changePassword"
        ></uni-icons>
      </view>
    </view>
    <view class="login-bottom">
      <button type="primary" @click="toLogin">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {});

const loginName = ref("");
const password = ref("");
const showPassword = ref(true);
const eyeColor = ref("#333333");

function changePassword() {
  showPassword.value = !showPassword.value;
  if (!showPassword.value) {
    eyeColor.value = "#465cff";
  } else {
    eyeColor.value = "#333333";
  }
}

function toLogin() {
  uni.request({
    url: "/api/login",
    method: "POST",
    data: {
      name: loginName.value,
      password: password.value,
    },
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      console.log(res);
    },
    fail: (err) => {
      
    },
  });
}

function toLogon() {
  uni.navigateTo({
    url: "/pages/logon/logon",
  });
}
</script>

<style scoped lang="scss">
.login {
  padding: $uni-spacing-row-base $uni-spacing-col-lg;
  .login-top {
    height: 50rpx;
  }
  .login-center {
    margin-top: 100rpx;
    .login-title {
      margin-bottom: 50rpx;
    }
    input {
      height: 80rpx;
      border-bottom: 0.5px solid $uni-border-color;
    }
    .login-password {
      margin-top: 50rpx;
      position: relative;
      .login-eye {
        position: absolute;
        right: 10rpx;
        bottom: 15rpx;
      }
    }
  }
  .login-bottom {
    margin-top: 100rpx;
  }
}
</style>
