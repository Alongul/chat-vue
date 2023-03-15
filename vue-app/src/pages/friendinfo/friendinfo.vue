<template>
  <view class="friendinfo">
    <view class="top-bar">
      <view class="top-bar-left">
        <uni-icons type="left" :size="25" @click="returnList"></uni-icons>
      </view>
    </view>
    <view class="friendinfo-top">
      <view class="friendinfo-header-pic">
        <image src="@/static/logo.png" mode="scaleToFill" />
      </view>
      <view class="friendinfo-top-info">
        <view>{{ friName }}</view>
        <view>{{ intro }}</view>
      </view>
    </view>
    <view class="friendinfo-bottom">
      <view class="friendinfo-send" @click="startSend">发消息</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { ResCommon } from "@/common/types";

const friName = ref("");
const intro = ref("");
let friId = "";

onLoad((data: any) => {
  friName.value = data.name;
  intro.value = data.introduce;
  friId = data.friendId;
});

function startSend() {
  uni.request({
    url: "/api/opensession",
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    data: {
      id: friId,
    },
    success: (res) => {
      const resData = res.data as ResCommon<{ sessionId: string }>;
      if (resData.code === 200) {
        toChatroom(resData.data?.sessionId ?? "");
      }
    },
    fail: (err) => {},
  });
}

function toChatroom(sessionId: string) {
  uni.navigateTo({
    url: `/pages/chatroom/chatroom?sessionId=${sessionId}`,
  });
}

function returnList() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
.friendinfo {
  .top-bar {
    height: $uni-top-height;
    line-height: $uni-top-height;
    width: 100%;
    border-bottom: 0.5px solid $uni-border-color;
    padding: 0 $uni-spacing-col-lg;
    background-color: $uni-bg-color;
    .top-bar-left {
      float: left;
    }
    .top-bar-center {
      text-align: center;
    }
  }
  .friendinfo-top {
    width: 100%;
    padding: 80rpx $uni-spacing-col-lg;
    display: flex;
    background-color: $uni-bg-color;
    .friendinfo-header-pic {
      width: 100rpx;
      height: 100rpx;
      image {
        width: 100rpx;
        height: 100rpx;
      }
    }
    .friendinfo-top-info {
      margin-left: 50rpx;
    }
  }
  .friendinfo-bottom {
    background-color: $uni-bg-color;
    padding: 0 $uni-spacing-col-lg;
    margin-top: $uni-spacing-row-lg;
    .friendinfo-send {
      line-height: 80rpx;
      height: 80rpx;
      text-align: center;
    }
  }
}
</style>
