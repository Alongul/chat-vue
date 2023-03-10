<template>
  <view class="logon">
    <view class="logon-top">
      <uni-icons type="left" :size="25" @click="returnLogin"></uni-icons>
    </view>
    <view class="logon-center">
      <view class="logon-title">欢迎加入自由联盟</view>
      <view class="logon-name">
        <input :maxlength="20" v-model="loginName" placeholder="请输入用户名" />
      </view>
      <view class="logon-password">
        <input
          class="uni-input"
          placeholder="请输入密码"
          :password="showPassword"
          maxlength="20"
          v-model="password"
        />
        <uni-icons
          type="eye"
          class="logon-eye"
          :color="eyeColor"
          :size="25"
          @click="changePassword"
        ></uni-icons>
      </view>
      <view class="logon-tip" v-if="logonTips">{{ logonTips }}</view>
    </view>
    <view class="logon-bottom">
      <button type="primary" @click="toLogon">注册</button>
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
const logonTips = ref("");

function changePassword() {
  showPassword.value = !showPassword.value;
  if (!showPassword.value) {
    eyeColor.value = "#465cff";
  } else {
    eyeColor.value = "#333333";
  }
}
function toLogon() {
  uni.request({
    url: "/api/adduser",
    method: "POST",
    data: {
      name: loginName.value,
      password: password.value,
    },
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      logonTips.value = "注册成功";
      setTimeout(() => {
        returnLogin();
      }, 1000);
    },
    fail: (err) => {
      logonTips.value = "注册失败";
    },
  });
}

function returnLogin() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
.logon {
  padding: $uni-spacing-row-base $uni-spacing-col-lg;
  .logon-center {
    margin-top: 100rpx;
    .logon-title {
      margin-bottom: 50rpx;
    }
    input {
      height: 80rpx;
      border-bottom: 0.5px solid $uni-border-color;
    }
    .logon-password {
      margin-top: 50rpx;
      position: relative;
      .logon-eye {
        position: absolute;
        right: 10rpx;
        bottom: 15rpx;
      }
    }
    .logon-tip {
      color: red;
      margin-top: $uni-spacing-row-base;
    }
  }
  .logon-bottom {
    margin-top: 100rpx;
  }
}
</style>
