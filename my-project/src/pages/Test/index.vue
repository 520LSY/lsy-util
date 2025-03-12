<template>
  <div>
    <dialog id="dialogDom">
      <p>Greetings, one and all!</p>

      <button @click="clearDialog">OK</button>
    </dialog>
    <button @click="clickDialog">点击打开弹窗</button>
    <Button :name="'测试'"></Button>
  </div>
</template>
<script lang="ts" setup>
import Button from "@/components/vueJSX/Button";
const clickDialog = () => {
  const dom = document.getElementById("dialogDom") as HTMLDialogElement;
  dom.showModal();
};
const clearDialog = () => {
  const dom: any = document.getElementById("dialogDom");
  dom.close();
};
</script>
