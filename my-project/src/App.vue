<template>
  <div>
    <button @click="antiShaking">防抖</button>
    <button @click="Throttling">节流</button>
    <button @click="combination">防抖节流结合</button>
    <button @click="AdhesiveBoard">文本复制</button>
    <div>
      <input type="text" v-model="colorInput" />=>
      <input type="text" v-model="newColorInput" />
      <button @click="colorConversion">颜色转换</button>
    </div>
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
    <div>
      <input type="text" v-model="fileText" placeholder="文件内容" />&
      <input
        type="text"
        v-model="fileName"
        placeholder="文件名称，例：test.txt"
      />
      <button @click="DataConversionFile">内容转文件</button>
    </div>
    <div>
      <input
        type="text"
        v-model="downloadFileObj.url"
        placeholder="文件地址"
      />&
      <input
        type="text"
        v-model="downloadFileObj.name"
        placeholder="文件名称，例：test.txt"
      />
      <button @click="DownloadFile">文件下载</button>
    </div>
    <a
      :href="downloadFileObj.url"
      :download="downloadFileObj.name"
      target="_blank"
      >下载</a
    >
    <div class="rotationBox">
      <div class="rotation" ref="rotationRef">元素旋转</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import UtilCommTs from "../../src/indexTs";
import UtilCommJs from "../../src/index";
let colorInput = ref();
let newColorInput = ref();
let timeObj = reactive({
  oldValue: "YYYY年MM月DD日 HH时mm分ss秒",
  newValue: "",
});
// 内容转文件
let fileText = ref();
let fileName = ref();
let downloadFileObj = reactive({
  url: "",
  name: "",
});
// 选中的元素
let rotationRef = ref();
const test: () => void = () => {
  console.log("节流");
};
const antiShaking = UtilCommTs.Debounce(
  () => {
    console.log("防抖");
  },
  800,
  true
);
const Throttling = UtilCommTs.Throttle(test, 800);
const combination = UtilCommTs.DebounceAndThrottle(
  () => {
    console.log("防抖节流结合");
  },
  500,
  500
);
const AdhesiveBoard = () => {
  UtilCommTs.AdhesiveBoard("测试");
};
function colorConversion() {
  newColorInput.value = UtilCommTs.ColorConversion(colorInput.value);
}
function formatTimestamp() {
  timeObj.newValue = UtilCommTs.FormatTimestamp(
    timeObj.oldValue,
    new Date().getTime()
  );
}
function DataConversionFile() {
  UtilCommTs.DataConversionFile(
    fileText.value || "测试",
    fileName.value || "test.txt"
  );
}
function DownloadFile() {
  //   UtilCommTs.DownloadFile(downloadFileObj.url, downloadFileObj.name);
}
onMounted(() => {
  UtilCommTs.ElementRotation(rotationRef.value, 60, (r: number) => {
    console.log("r", r);
  });
  //   UtilCommJs.DataConversionFile("321", "222.json");
  //   fetch("./light.json")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res2) => {
  //       //   console.log(res2);
  //       //   let newObj: Array<any> = [];
  //     //   console.log(
  //     //     UtilCommTs.BatchCoordinateTransformation(res2, "BD09", "GCJ02")
  //     //   );
  //     //   console.log(
  //     //     UtilCommJs.BatchCoordinateTransformation(res2, "BD09", "GCJ02")
  //     //   );
  // });
});
</script>

<style scoped>
.rotationBox {
  position: relative;
  width: 500px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
.timeInput {
  width: 300px;
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
</style>
