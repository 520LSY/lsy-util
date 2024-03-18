<template>
  <div>
    <div class="row">
      <div class="button">
        <Button @click="antiShaking">防抖</Button>: {{ data.antiShaking }}
      </div>
    </div>
    <div class="row">
      <div class="button">
        <Button @click="Throttling">节流</Button>: {{ data.throttling }}
      </div>
    </div>
    <div class="row">
      <div class="button">
        <Button @click="combination">防抖节流结合</Button>:
        {{ data.throttlingAndAntiShaking }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import UtilCommJs from "../../../../src/index";
import { reactive } from "vue";
const data = reactive({
  // 节流
  throttling: 0,
  // 防抖
  antiShaking: 0,
  // 防抖节流
  throttlingAndAntiShaking: 0,
});
const test: () => void = () => {
  console.log("节流");
  data.throttling++;
};
const antiShaking = UtilCommJs.Debounce(
  () => {
    console.log("防抖");
    data.antiShaking++;
  },
  800,
  true
);
const Throttling = UtilCommJs.Throttle(test);
const combination = UtilCommJs.DebounceAndThrottle(
  () => {
    console.log("防抖节流结合");
    data.throttlingAndAntiShaking++;
  },
  500,
  500
);
</script>
<style scoped lang="postcss">
.row {
  margin-bottom: 10px;
  height: 50px;
  line-height: 50px;
  user-select: none;
  .button {
    /* width: 100px; */
    /* text-align: right; */
    cursor: pointer;
  }
}
</style>
