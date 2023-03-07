<template>
  <view class="logon">
    <view class="logon-top">
      <fui-icon
        name="arrowleft"
        :size="50"
        @click="returnLogin"
      ></fui-icon>
    </view>
    <view class="logon-center">
      <view class="logon-title">欢迎加入自有联盟</view>
      <view class="logon-name">
        <text>用户名</text>
        <input :maxlength="20" v-model="loginName" placeholder="请输入用户名" />
      </view>
      <view class="logon-password">
        <text>密码</text>
        <input
          class="uni-input"
          placeholder="请输入密码"
          :password="showPassword"
          maxlength="20"
          v-model="password"
        />
        <fui-icon
          class="logon-eye"
          :color="eyeColor"
          name="visible"
          :size="50"
          @click="changePassword"
        ></fui-icon>
      </view>
    </view>
    <view class="logon-bottom">
      <fui-button>注册</fui-button>
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

function returnLogin() {}
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
  }
  .logon-bottom {
    margin-top: 100rpx;
  }
}
</style>
