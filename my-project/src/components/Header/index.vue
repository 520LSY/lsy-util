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
import { useRouter } from "vue-router";
import { headerList } from "@/components/Header/index";
const router = useRouter();

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
