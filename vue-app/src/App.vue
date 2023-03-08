<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  background-color: $uni-bg-color-grey;
}
@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/c/font_3939751_w10y2yp4g9.woff2?t=1678266666658")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_3939751_w10y2yp4g9.woff?t=1678266666658")
      format("woff"),
    url("//at.alicdn.com/t/c/font_3939751_w10y2yp4g9.ttf?t=1678266666658")
      format("truetype");
}
</style>
