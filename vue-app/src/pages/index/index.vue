<template>
  <view class="content">
    <view class="top-bar">
      <view class="top-bar-center">聊天</view>
      <view class="top-bar-right">
        <uni-icons type="search" size="25" @click="toSearch"></uni-icons>
        <uni-icons type="plus" size="25"></uni-icons>
      </view>
    </view>
    <scroll-view class="session-list" scroll-y>
      <view class="list-item" v-for="item in chatList" @click="toChat">
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
import { onLoad, onReady } from "@dcloudio/uni-app";

onReady(() => {
  const ws = new WebSocket("ws://localhost:3000/");
  ws.onopen = function () {
    console.log("成功");
  };
  ws.onerror = function () {
    console.log("失败");
  };
  ws.onmessage = function (event) {
    console.log('消息');
  };
});
onLoad(() => {});
const chatList = ref([
  {
    id: 1,
    name: "1",
    news: "",
    date: new Date(),
    tips: 2,
    imgUrl: "",
  },
]);

function getChatList() {}

function toChat() {
  uni.navigateTo({
    url: "/pages/chatroom/chatroom",
  });
}

function toSearch() {
  uni.navigateTo({
    url: "/pages/search/search",
  });
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: var(--status-bar-height);
  .top-bar {
    position: relative;
    height: $uni-top-height;
    width: 100%;
    line-height: $uni-top-height;
    border-bottom: 0.5px solid $uni-border-color;
    padding: 0 $uni-spacing-col-lg;
    .top-bar-center {
      text-align: center;
    }
    .top-bar-right {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .session-list {
    width: 100%;
    position: fixed;
    top: $uni-top-height;
    bottom: $uni-bottom-height;
    background-color: $uni-bg-color;

    .list-item {
      height: 120rpx;
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
