<template>
  <view class="chatroom">
    <view class="chatroom-top">
      <view class="top-bar-left">
        <uni-icons type="left" :size="25" @click="returnChatList"></uni-icons>
      </view>
      <view class="top-bar-center">名字</view>
    </view>
    <view class="chatroom-area">
      <view class="list-item" v-for="item in messageList">
        <view v-if="!isMySend(item.sendId)" class="list-other">
          <view class="head-img">
            <image src="@/static/logo.png" mode="scaleToFill" />
          </view>
          <view class="message">
            {{ item.message }}
          </view>
        </view>
        <view v-else class="list-my">
          <view class="message">
            {{ item.message }}
          </view>
          <view class="head-img">
            <image src="@/static/logo.png" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>
    <view class="chat-send">
      <input
        class="chat-send-input"
        v-model="inputMessage"
        @confirm="sendMessage"
      />
      <view class="chat-add">
        <uni-icons type="plus" :size="25"></uni-icons
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onReady, onUnload } from "@dcloudio/uni-app";
import type { ResCommon } from "@/common/types";
import { useUserStore } from "../../stores/user";
import { MessageType } from "./enum";
import { cloneDeep } from "lodash";

interface Message {
  sendId: string;
  receiveId: string;
  message: string;
  type: string; // 0 文本消息
  time: string;
}

let sessionId = "";
let receiveId = "";
const userStore = useUserStore();
let ws: WebSocket;

onReady(() => {
  ws = new WebSocket("ws://localhost:3000/message");
  ws.onopen = function () {
    console.log("ws消息连接成功");
    ws.send(
      JSON.stringify({
        initConnect: "1",
        sessionId,
      })
    );
  };
  ws.onerror = function () {
    console.log("ws消息连接失败");
  };
  ws.onmessage = function (event) {
    console.log(event.data);
    messageList.value.push(JSON.parse(event.data));
  };
});
onLoad((data: any) => {
  sessionId = data.sessionId;
  receiveId = data.receiveId;
  queryMessageList();
});
onUnload(() => {
  ws.close();
});

const messageList = ref<Message[]>([]);
const inputMessage = ref("");

function queryMessageList() {
  uni.request({
    url: "/api/querymessage",
    method: "POST",
    data: {
      sessionId,
      receiveId,
    },
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      const resData = res.data as ResCommon<Message[]>;
      if (resData.code === 200) {
        messageList.value = resData.data;
      }
    },
    fail: (err) => {},
  });
}

function sendMessage() {
  ws.send(
    JSON.stringify({
      sessionId,
      sendId: userStore.clientId,
      receiveId,
      message: inputMessage.value,
      type: MessageType.文本,
    })
  );
}

function isMySend(id: string) {
  return id === userStore.clientId;
}
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
    overflow-y: auto;
    width: 100%;
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
