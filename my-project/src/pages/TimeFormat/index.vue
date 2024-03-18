<template>
  <div>
    <input
      type="text"
      class="timeInput"
      v-model="timeObj.oldValue"
      placeholder="输入格式，例：YYYY年MM月DD日 HH时mm分ss秒"
    />=>
    <input type="text" class="timeInput" v-model="timeObj.newValue" />
    <button @click="formatTimestamp">时间格式</button>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import UtilCommJs from "../../../../src/index";
let timeObj = reactive({
  oldValue: "YYYY年MM月DD日 HH时mm分ss秒",
  newValue: "YYYY年MM月DD日 HH时mm分ss秒",
});
function formatTimestamp() {
  timeObj.newValue = UtilCommJs.FormatTimestamp(
    timeObj.oldValue,
    String(new Date().getTime())
  );
}
</script>
