<template>
  <div>
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
  </div>
  <div>
    <input id="inputId" type="file" />
  </div>
  <div>
    <input id="base64" type="file" @change="getBase64" accept=".json" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import UtilCommJs from "../../../../src/index";
let fileText = ref();
let fileName = ref();
let downloadFileObj = reactive({
  url: "",
  name: "",
});
function DataConversionFile() {
  UtilCommJs.DataConversionFile(
    fileText.value || "测试",
    fileName.value || "test.txt"
  );
}
function DownloadFile() {
  UtilCommJs.DownloadFile(downloadFileObj.url, downloadFileObj.name);
}
// 内容转文件

function getBase64(inputDOM: any) {
  let fileText = inputDOM.target.files[0];
  let reader = new FileReader();
  reader.readAsText(fileText, "UTF-8");
  reader.onload = function () {
    // 这里的代码将在FileReader完成工作之后运行
    let content = reader.result as string;
    let JSONobject = JSON.parse(content);

    JSONobject.assets.forEach((item: any) => {
      if (item.id.indexOf("image_") == 0) {
        UtilCommJs.downloadBlob(UtilCommJs.CoverBase64ToImg(item.p), item.id);
      }
    });
  };
}
</script>
