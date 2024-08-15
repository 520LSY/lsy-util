<template>
  <div class="rotationBox">
    <div class="rotation" ref="rotationRef">元素旋转</div>
  </div>
  <div id="gragBox" class="gragBox">
    <div id="gragDom"></div>
  </div>
  <div class="container">
    <transition-group name="flip-list">
      <div
        v-for="item in items"
        :key="item"
        draggable="true"
        class="items"
        @dragstart="dragstart(item)"
        @dragenter="dragenter(item)"
        @dragend="dragend"
      >
        {{ item }}
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import UtilCommJs from "../../../../src/index";
// 选中的元素
let rotationRef = ref();

const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const oldNum = ref(0);
const newNum = ref(0);

// 记录初始信息
const dragenter = (param: any) => {
  newNum.value = param;
};

// 做最终操作
const dragend = () => {
  if (oldNum.value !== newNum.value) {
    const oldIndex = items.value.indexOf(oldNum.value);
    const newIndex = items.value.indexOf(newNum.value);
    const newItems = [...items.value];
    // 删除老的节点
    newItems.splice(oldIndex, 1);
    // 在列表中目标位置增加新的节点
    newItems.splice(newIndex, 0, oldNum.value);
    // items改变transition-group就会起作用
    items.value = [...newItems];
  }
};
// 记录移动过程中信息
const dragstart = (param: any) => {
  oldNum.value = param;
};

onMounted(() => {
  setTimeout(() => {
    UtilCommJs.ElementRotation(rotationRef.value, 60, (r: number) => {
      //   console.log("r", r);
    });
    let targetDom = document.getElementById("gragDom") as HTMLElement;
    let gragBoxDom = document.getElementById("gragBox") as HTMLElement;
    // let left = 0;
    const { setLeft } = UtilCommJs.DomDragAndDrag(targetDom, gragBoxDom, [
      (data: any) => {
        console.log("这是元素移动", data);
      },
      (data: any) => {
        console.log("这是鼠标松开", data);
      },
    ]);
    // setInterval(() => {
    //   left += 100;
    //   setLeft(left);
    // }, 1000);
    // window.setLeft = setLeft;
    setLeft(10000);
  });
});
</script>
<style lang="postcss" scoped>
* {
  box-sizing: border-box;
}
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
  left: 0px;
  top: 0px;
  width: 400px;
  height: 400px;
  background-color: aqua;
  border: 1px solid rgba(3, 31, 172, 0.603);
  transform-origin: 0% 0%;
}

.items {
  width: 300px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: linear-gradient(45deg, #234, #567);
  color: pink;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
