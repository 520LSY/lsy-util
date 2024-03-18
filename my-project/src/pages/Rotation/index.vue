<template>
  <div class="rotationBox">
    <div class="rotation" ref="rotationRef">元素旋转</div>
  </div>
  <div id="gragBox" class="gragBox">
    <div id="gragDom"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import UtilCommJs from "../../../../src/index";
// 选中的元素
let rotationRef = ref();

onMounted(() => {
  setTimeout(() => {
    UtilCommJs.ElementRotation(rotationRef.value, 60, (r: number) => {
      //   console.log("r", r);
    });
    let targetDom = document.getElementById("gragDom") as HTMLElement;
    let gragBoxDom = document.getElementById("gragBox") as HTMLElement;
    UtilCommJs.DomDragAndDrag(targetDom, gragBoxDom, () => {});
  });
});
</script>
<style lang="postcss" scoped>
.rotationBox {
  position: relative;
  width: 500px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rotation {
  width: 200px;
  height: 200px;
  background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.gragBox {
  position: relative;
  width: 100%;
  height: 400px;
  margin-left: 100px;
}
#gragDom {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 400px;
  height: 400px;
  background-color: aqua;
  border: 1px solid rgba(3, 31, 172, 0.603);
  transform-origin: 0% 0%;
}
</style>
