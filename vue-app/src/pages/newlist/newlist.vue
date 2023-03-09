<template>
  <view class="newlist">
    <view class="newlist-top">
      <view class="top-bar-left">
        <uni-icons type="left" :size="25" @click="returnChatList"></uni-icons>
      </view>
      <view class="top-bar-center">新的朋友</view>
    </view>
    <scroll-view class="newlist-bottom" scroll-y>
      <view class="list-item" v-for="item in searchList">
        <view class="head-img">
          <uni-badge :text="item.tips" absolute="rightTop">
            <image src="@/static/logo.png" mode="scaleToFill" />
          </uni-badge>
        </view>
        <view class="message">
          <view class="friend-name">{{ item.name }}</view>
          <view class="introduce">asdf</view>
        </view>
        <view class="operate">
          <button size="mini">忽略</button>
          <button size="mini" type="primary">同意</button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {});

const searchKey = ref("");
const searchList = ref([
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
    position: fixed;
    top: $uni-top-height;
    bottom: 0;
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
