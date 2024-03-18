<template>
  <div class="text-copy">
    <input type="text" v-model="textInput" />
    <Button @click="AdhesiveBoard">点击复制</Button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import UtilCommJs from "../../../../src/index";
const textInput = ref("");
const AdhesiveBoard = () => {
  UtilCommJs.AdhesiveBoard(textInput.value);
};
</script>
