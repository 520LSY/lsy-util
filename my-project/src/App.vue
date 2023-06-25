<template>
  <div>
    <button @click="antiShaking">防抖</button>
    <button @click="Throttling">节流</button>
    <button @click="combination">防抖节流结合</button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import UtilCommTs from "../../src/indexTs";
import UtilCommJs from "../../src/index";

const test: () => void = () => {
  console.log("节流");
};
const antiShaking = UtilCommJs.Debounce(
  () => {
    console.log("防抖");
  },
  800,
  true
);
const Throttling = UtilCommJs.Throttle(test, 800);
const combination = UtilCommJs.DebounceAndThrottle(
  () => {
    console.log("防抖节流结合");
  },
  500,
  500
);
onMounted(() => {
  fetch("./light.json")
    .then((res) => {
      return res.json();
    })
    .then((res2) => {
      //   console.log(res2);
      //   let newObj: Array<any> = [];
      console.log(
        UtilCommTs.BatchCoordinateTransformation(res2, "BD09", "GCJ02")
      );
      console.log(
        UtilCommJs.BatchCoordinateTransformation(res2, "BD09", "GCJ02")
      );
    });
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
