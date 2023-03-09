<template>
  <view class="myinfo">
    <view class="myinfo-top">
      <view class="myinfo-header-pic">
        <image src="@/static/logo.png" mode="scaleToFill" />
      </view>
      <view class="myinfo-top-info">
        <view>name</view>
        <view>个签</view>
      </view>
      <view></view>
    </view>
    <view class="myinfo-bottom">
      <view class="myinfo-setting">设置</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {});
</script>

<style scoped lang="scss">
.myinfo {
  .myinfo-top {
    padding: 80rpx $uni-spacing-col-lg;
    display: flex;
    background-color: $uni-bg-color;
    .myinfo-header-pic {
      width: 100rpx;
      height: 100rpx;
      image {
        width: 100rpx;
        height: 100rpx;
      }
    }
    .myinfo-top-info {
      margin-left: 50rpx;
    }
  }
  .myinfo-bottom {
    background-color: $uni-bg-color;
    padding-left: $uni-spacing-col-lg;
    margin-top: $uni-spacing-row-lg;
    .myinfo-setting {
      line-height: 80rpx;
      height: 80rpx;
    }
  }
}
</style>
