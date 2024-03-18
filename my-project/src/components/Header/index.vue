<template>
  <div class="header-box">
    <div
      class="header-row"
      v-for="item in headerList"
      @click="goToPage(item.page)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const headerList = reactive([
  {
    name: "防抖节流",
    page: "/",
  },
  {
    name: "文本复制",
    page: "/textCopy",
  },
  {
    name: "颜色转换",
    page: "/colorConversion",
  },
  {
    name: "时间格式",
    page: "/timeFormat",
  },
  {
    name: "文件",
    page: "/file",
  },
  {
    name: "页面元素",
    page: "/rotation",
  },
  {
    name: "测试",
    page: "/test",
  },
]);
const goToPage = (url: string) => {
  router.push(url);
};
</script>
<style lang="postcss" scoped>
* {
  box-sizing: border-box;
}
.header-box {
  position: absolute;
  display: flex;
  align-items: center;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 70px;
  padding: 20px;
  font-size: 18px;
  box-shadow: 0px 0px 1px #999;
  .header-row {
    cursor: pointer;
    padding: 0 5px;
    width: auto;
    &:hover {
      color: red;
    }
  }
}
</style>
