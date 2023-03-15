<template>
  <view class="newlist">
    <view class="newlist-top">
      <view class="top-bar-left">
        <uni-icons type="left" :size="25" @click="returnChatList"></uni-icons>
      </view>
      <view class="top-bar-center">新的朋友</view>
    </view>
    <view class="newlist-bottom">
      <view class="list-item" v-for="item in newList">
        <view class="head-img">
          <image src="@/static/logo.png" mode="scaleToFill" />
        </view>
        <view class="message">
          <view class="friend-name">{{ item.name }}</view>
          <view class="introduce">{{ item.introduce }}</view>
        </view>
        <view class="operate">
          <button size="mini" type="primary" @click="agreeReq(item.id)">
            同意
          </button>
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
  searchNewFriends();
});

const newList = ref<Friend[]>([]);

function searchNewFriends() {
  uni.request({
    url: "/api/querynewfriends",
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      const resData = res.data as ResCommon<Friend[]>;
      if (resData.code === 200) {
        newList.value = resData.data;
      }
    },
    fail: (err) => {},
  });
}

function agreeReq(id: string) {
  uni.request({
    url: "/api/agree",
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    data: {
      id,
    },
    success: (res) => {
      const resData = res.data as ResCommon<Friend[]>;
      if (resData.code === 200) {
        newList.value = resData.data;
      }
    },
    fail: (err) => {},
  });
}

function returnChatList() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
.newlist {
  .newlist-top {
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
  .newlist-bottom {
    width: 100%;
    position: fixed;
    top: $uni-top-height;
    overflow-y: auto;
    bottom: 0;
    .list-item {
      height: $uni-list-height;
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
        .introduce {
          margin-top: 10rpx;
        }
      }
      .operate {
        margin-left: auto;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
