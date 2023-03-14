<template>
  <view class="friendList">
    <view class="top-bar">
      <view class="top-bar-center">通讯录</view>
      <view class="top-bar-right">
        <uni-icons type="search" size="25" @click="toSearch"></uni-icons>
        <uni-icons type="plus" size="25"></uni-icons>
      </view>
    </view>
    <view class="list-container">
      <view class="list-item" @click="toNewList">
        <view class="head-img">
          <image src="@/static/logo.png" mode="scaleToFill" />
        </view>
        <view class="message">
          <view class="friend-name">新的朋友</view>
        </view>
      </view>
      <view
        class="list-item"
        v-for="(item, index) in friendList"
        :key="item.name"
      >
        <view class="head-img">
          <image src="@/static/logo.png" mode="scaleToFill" />
        </view>
        <view class="message">
          <view class="friend-name">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import type { ResCommon } from "@/common/types";

interface Friend {
  id: string;
  friendId: string;
  name: string;
  imgUrl: string;
  introduce: string;
  state: string; // 0:请求中；1:已是好友
}
onShow(() => {
  searchFriends();
});

const friendList = ref<Friend[]>([]);

function searchFriends() {
  uni.request({
    url: "/api/searchfriends",
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      const resData = res.data as ResCommon<Friend[]>;
      if (resData.code === 200) {
        friendList.value = resData.data;
      }
    },
    fail: (err) => {},
  });
}

function toNewList() {
  uni.navigateTo({
    url: "/pages/newlist/newlist",
  });
}

function toSearch() {
  uni.navigateTo({
    url: "/pages/search/search",
  });
}
</script>

<style scoped lang="scss">
.friendList {
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
  .list-container {
    width: 100%;
    top: $uni-top-height;
    bottom: 0px;
    overflow-y: auto;
    position: fixed;
    .list-item {
      height: 120rpx;
      display: flex;
      justify-content: flex-start;
      padding: 10rpx $uni-spacing-col-lg;
      background-color: $uni-bg-color;
      .head-img {
        display: flex;
        align-items: center;
        position: relative;
        image {
          width: 60rpx;
          height: 60rpx;
        }
      }
      .message {
        margin-left: 60rpx;
        line-height: 100rpx;
      }
    }
  }
}
</style>
