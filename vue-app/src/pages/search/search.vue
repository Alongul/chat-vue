<template>
  <view class="search">
    <view class="search-top">
      <input
        class="search-input"
        type="text"
        confirm-type="search"
        v-model="searchKey"
        placeholder="搜索"
        placeholder-class="input-placeholder"
        @confirm="searchStart"
      />
      <text>取消</text>
    </view>
    <scroll-view class="search-bottom" scroll-y>
      <view class="list-item" v-for="item in searchList">
        <view class="head-img">
          <text class="message-tip">{{ item.tips }}</text>
          <image src="@/static/logo.png" mode="scaleToFill" />
        </view>
        <view class="message">
          <view class="friend-name">{{ item.name }}</view>
          <view class="new-message">asdf</view>
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

function searchStart() {}
</script>

<style lang="scss">
.search {
  padding: $uni-spacing-row-base 0;
  .search-top {
    display: flex;
    padding: $uni-spacing-row-base $uni-spacing-row-lg;
    .search-input {
      flex: 1;
      height: 60rpx;
      background-color: $uni-bg-color;
      margin-right: $uni-spacing-col-lg;
      padding-left: $uni-spacing-col-lg;
      border-radius: $uni-border-radius-base;
    }
    .input-placeholder {
      font-size: 28rpx;
    }
  }
  .search-bottom {
    width: 100%;
    top: 100rpx;
    bottom: 0px;
    position: fixed;
    padding: $uni-spacing-row-base $uni-spacing-row-lg;

    .list-item {
      height: 120rpx;
      display: flex;
      justify-content: flex-start;
      padding: 10rpx $uni-spacing-col-lg;
      background-color: $uni-bg-color;
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
