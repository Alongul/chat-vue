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
      <text @click="returnBack">取消</text>
    </view>
    <view class="search-bottom">
      <view
        class="list-item"
        v-for="(item, index) in searchList"
        :key="item.name"
      >
        <view class="head-img">
          <image src="@/static/logo.png" mode="scaleToFill" />
        </view>
        <view class="message">
          <view class="friend-name">{{ item.name }}</view>
          <view class="new-message">{{ item.introduce }}</view>
        </view>
        <view class="operate">
          <button class="add-friend" type="primary" @click="addFriend(item.id)">
            加好友
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { ResCommon } from "@/common/types";
import type { SearchItem } from "./search-type";
import { watch } from "vue";

onLoad(() => {});

const searchKey = ref("");
const searchList = ref<SearchItem[]>([]);

function searchStart() {
  if (searchKey.value === "") {
    searchList.value = [];
    return;
  }
  uni.request({
    url: "/api/searchusers",
    method: "POST",
    data: {
      name: searchKey.value,
    },
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      const resData = res.data as ResCommon<SearchItem[]>;
      if (resData.code === 200) {
        searchList.value = resData.data;
      }
    },
    fail: (err) => {},
  });
}

function addFriend(id: string) {
  uni.request({
    url: "/api/reqfriend",
    method: "POST",
    data: {
      id,
    },
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      const resData = res.data as ResCommon<SearchItem[]>;
      console.log(res.data);
    },
    fail: (err) => {},
  });
}

function returnBack() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
.search {
  .search-top {
    display: flex;
    align-items: center;
    padding: 0 $uni-spacing-row-lg;
    height: $uni-top-height;
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
    top: $uni-top-height;
    bottom: 0px;
    overflow-y: auto;
    position: fixed;
    padding: $uni-spacing-row-sm 0;

    .list-item {
      height: 120rpx;
      display: flex;
      justify-content: flex-start;
      padding: 15rpx $uni-spacing-col-lg;
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
        .new-message {
          // margin-top: 10rpx;
        }
      }
      .operate {
        margin-left: auto;
        display: flex;
        align-items: center;
        .add-friend {
          font-size: $uni-font-size-sm;
          height: 50rpx;
          line-height: 50rpx;
          border-radius: $uni-border-radius-lg;
        }
      }
    }
  }
}
</style>
