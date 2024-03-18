<template>
  <div>
    <input type="text" v-model="colorInput" />=>
    <input type="text" v-model="newColorInput" />
    <button @click="colorConversion">颜色转换</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import UtilCommJs from "../../../../src/index";
let colorInput = ref();
let newColorInput = ref();

function colorConversion() {
  newColorInput.value = UtilCommJs.ColorConversion(colorInput.value);
}
</script>
