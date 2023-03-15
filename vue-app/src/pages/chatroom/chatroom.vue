<template>
  <view class="chatroom">
    <view class="chatroom-top">
      <view class="top-bar-left">
        <uni-icons type="left" :size="25" @click="returnChatList"></uni-icons>
      </view>
      <view class="top-bar-center">名字</view>
    </view>
    <scroll-view class="chatroom-area" scroll-y>
      <view class="list-item" v-for="item in chatList">
        <view v-if="!item.isMy" class="list-other">
          <view class="head-img">
            <image src="@/static/logo.png" mode="scaleToFill" />
          </view>
          <view class="message">
            就拉萨看得见flask就flask剪短发了深刻的房间里
            就拉萨看得见flask就flask剪短发了深刻的房间里
            就拉萨看得见flask就flask剪短发了深刻的房间里
            就拉萨看得见flask就flask剪短发了深刻的房间里
            就拉萨看得见flask就flask剪短发了深刻的房间里
          </view>
        </view>
        <view v-else class="list-my">
          <view class="message">
            就拉萨看得见flask就flask剪短发了深刻的房间里
            就拉萨看得见flask就flask剪短发了深刻的房间里
            就拉萨看得见flask就flask剪短发了深刻的房间里
            就拉萨看得见flask就flask剪短发了深刻的房间里
            就拉萨看得见flask就flask剪短发了深刻的房间里
          </view>
          <view class="head-img">
            <image src="@/static/logo.png" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="chat-send">
      <input class="chat-send-input" v-model="sendMessage" />

      <view class="chat-add">
        <uni-icons type="plus" :size="25"></uni-icons
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

let sessionId = "";
onLoad((data: any) => {
  sessionId = data.sessionId;
});

const chatList = ref([
  {
    id: 1,
    user: "1",
    message: "",
    date: new Date(),
    isMy: false,
  },
  {
    id: 1,
    user: "1",
    message: "",
    date: new Date(),
    isMy: true,
  },
  {
    id: 1,
    user: "1",
    message: "",
    date: new Date(),
    isMy: false,
  },
]);
const sendMessage = ref("");

function returnChatList() {
  uni.switchTab({ url: "/pages/index/index" });
}
</script>

<style scoped lang="scss">
.chatroom {
  .chatroom-top {
    height: $uni-top-height;
    line-height: $uni-top-height;
    width: 100%;
    border-bottom: 0.5px solid $uni-border-color;
    padding: 0 $uni-spacing-col-lg;
    .top-bar-left {
      float: left;
    }
    .top-bar-center {
      text-align: center;
    }
  }
  .chatroom-area {
    position: fixed;
    top: $uni-top-height;
    bottom: $uni-bottom-height;
    background-color: #f5f3e5;
    .list-item {
      min-height: $uni-img-size-base;
      padding: 10rpx $uni-spacing-col-lg;
      .head-img {
        image {
          width: $uni-img-size-base;
          height: $uni-img-size-base;
        }
      }
      .list-other {
        display: flex;
        justify-content: flex-start;
        padding-right: calc($uni-img-size-base + $uni-spacing-col-lg);
        .message {
          padding: $uni-spacing-col-lg;
          margin-left: $uni-spacing-col-lg;
          background-color: white;
          border-radius: $uni-border-radius-lg;
        }
      }
      .list-my {
        display: flex;
        justify-content: flex-end;
        padding-left: calc($uni-img-size-base + $uni-spacing-col-lg);
        .message {
          padding: $uni-spacing-col-lg;
          margin-right: $uni-spacing-col-lg;
          background-color: white;
          border-radius: $uni-border-radius-lg;
        }
      }
    }
  }
  .chat-send {
    position: fixed;
    bottom: 0;
    height: $uni-bottom-height;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 $uni-spacing-col-lg;
    .chat-send-input {
      flex: 1;
      height: 60rpx;
      background-color: $uni-bg-color;
      padding-left: $uni-spacing-col-lg;
      border-radius: $uni-border-radius-lg;
    }
    .chat-add {
      margin-left: $uni-spacing-col-base;
    }
  }
}
</style>
