<template>
  <view class="content">
    <view class="top-bar">
      <view class="top-bar-center">聊天</view>
      <view class="top-bar-right">
        <uni-icons type="search" size="25" @click="toSearch"></uni-icons>
        <uni-icons type="plus" size="25"></uni-icons>
      </view>
    </view>
    <view class="session-list">
      <view class="list-item" v-for="item in chatList" @click="toChat">
        <view class="head-img">
          <image src="@/static/logo.png" mode="scaleToFill" />
        </view>
        <view class="message">
          <view class="friend-name">{{ item.name }}</view>
          <view class="new-message">{{ item.latestMsg }}</view>
        </view>
        <view class="date">
          <text>{{ format(new Date(item.time), "HH:mm") }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow, onReady } from "@dcloudio/uni-app";
import type { ResCommon } from "@/common/types";
import { format } from "date-fns";

interface SessionItem {
  name: string;
  latestMsg: string;
  time: string;
  imgUrl: string;
}

onReady(() => {
  const ws = new WebSocket("ws://localhost:3000/");
  ws.onopen = function () {
    console.log("成功");
  };
  ws.onerror = function () {
    console.log("失败");
  };
  ws.onmessage = function (event) {
    console.log("消息");
  };
});
onShow(() => {
  getChatList();
});

const chatList = ref<SessionItem[]>([]);

function getChatList() {
  uni.request({
    url: "/api/querysessionlist",
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      const resData = res.data as ResCommon<SessionItem[]>;
      if (resData.code === 200) {
        chatList.value = resData.data;
      }
    },
    fail: (err) => {},
  });
}

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
    overflow-y: auto;
    top: $uni-top-height;
    bottom: $uni-bottom-height;
    background-color: $uni-bg-color;

    .list-item {
      height: $uni-list-height;
      display: flex;
      justify-content: flex-start;
      padding: 10rpx $uni-spacing-col-lg;
    }
    .head-img {
      display: flex;
      align-items: center;
      position: relative;
      image {
        width: $uni-img-size-lg;
        height: $uni-img-size-lg;
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
