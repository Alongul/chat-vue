<template>
  <view class="content">
    <view class="top-bar">
      <view class="top-bar-left">
        <image src="@/static/logo.png" mode="scaleToFill" />
      </view>
      <view class="top-bar-center">聊天</view>
      <view class="top-bar-right">
        <uni-icons type="search" size="25"></uni-icons>
        <uni-icons type="plus" size="25"></uni-icons>
      </view>
    </view>
    <scroll-view class="friend-list" scroll-y>
      <view class="list-item" v-for="item in chatList">
        <view class="head-img">
          <text class="message-tip">{{ item.tips }}</text>
          <image src="@/static/logo.png" mode="scaleToFill" />
        </view>
        <view class="message">
          <view class="friend-name">{{ item.name }}</view>
          <view class="new-message">asdf</view>
        </view>
        <view class="date">
          <text>2016</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {});

function getChatList() {}

const chatList = ref([
  {
    id: 1,
    name: "1",
    news: "",
    date: new Date(),
    tips: 2,
    imgUrl: "",
  },
  {
    name: "1",
  },
  {
    name: "1",
  },
  {
    name: "1",
  },
  {
    name: "1",
  },
  {
    name: "1",
  },
]);
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: var(--status-bar-height);
  .top-bar {
    height: 40px;
    width: 100%;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid $uni-border-color;
    padding: 0 $uni-spacing-col-lg;
    .top-bar-left {
      display: flex;
      align-items: center;
      image {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }
  .friend-list {
    width: 100%;
    position: fixed;
    top: 40px;
    bottom: $uni-bottom-height;

    .list-item {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      padding: 10rpx $uni-spacing-col-lg;
    }
    .head-img {
      display: flex;
      align-items: center;
      position: relative;
      .message-tip {
        position: absolute;
        z-index: 2;
        height: 36rpx;
        min-width: 36rpx;
        border-radius: 36rpx;
        background-color: red;
        color: white;
        text-align: center;
        line-height: 36rpx;
        right: -2px;
        top: 0px;
      }
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
    .message {
      margin-left: 60rpx;
      .new-message {
        margin-top: 10rpx;
      }
    }
    .date {
      margin-left: auto;
    }
  }
}
</style>
