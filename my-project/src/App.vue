<template>
  <div class="container">
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
    <div id="gragBox" class="gragBox">
      <div id="gragDom"></div>
    </div>
    <div>
      <input id="inputId" type="file" />
    </div>
    <div>
      <input id="base64" type="file" @change="getBase64" accept=".json" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
// import UtilCommTs from "../../src/indexTs";
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
const antiShaking = UtilCommJs.Debounce(
  () => {
    console.log("防抖");
  },
  800,
  true
);
const Throttling = UtilCommJs.Throttle(test);
const combination = UtilCommJs.DebounceAndThrottle(
  () => {
    console.log("防抖节流结合");
  },
  500,
  500
);
const AdhesiveBoard = () => {
  UtilCommJs.AdhesiveBoard("测试");
};
function getBase64(inputDOM: any) {
  let fileText = inputDOM.target.files[0];
  let reader = new FileReader();
  reader.readAsText(fileText, "UTF-8");
  reader.onload = function () {
    //这里的代码将在FileReader完成工作之后运行
    let content = reader.result as string;
    let JSONobject = JSON.parse(content);
    console.log("JSONobject", JSONobject);

    JSONobject.assets.forEach((item: any) => {
      if (item.id.indexOf("image_") == 0) {
        UtilCommJs.downloadBlob(UtilCommJs.CoverBase64ToImg(item.p), item.id);
      }
    });
  };
}
function colorConversion() {
  newColorInput.value = UtilCommJs.ColorConversion(colorInput.value);
}
function formatTimestamp() {
  timeObj.newValue = UtilCommJs.FormatTimestamp(
    timeObj.oldValue,
    String(new Date().getTime())
  );
}
function DataConversionFile() {
  UtilCommJs.DataConversionFile(
    fileText.value || "测试",
    fileName.value || "test.txt"
  );
}
function DownloadFile() {
  //   UtilCommTs.DownloadFile(downloadFileObj.url, downloadFileObj.name);
}
onMounted(() => {
  window.CoverBase64ToImg = (url: any) => {
    UtilCommJs.downloadBlob(UtilCommJs.CoverBase64ToImg(url), "text");
  };
  let targetDom = document.getElementById("gragDom") as HTMLElement;
  let gragBoxDom = document.getElementById("gragBox") as HTMLElement;
  UtilCommJs.ElementRotation(rotationRef.value, 60, (r: number) => {
    console.log("r", r);
  });
  UtilCommJs.DomDragAndDrag(targetDom, gragBoxDom, (res) => {
    console.log("res", res);
  });
  nextTick(() => {
    UtilCommJs.ExcelJson();
  });
  //   UtilCommJs.DomDragAndDrag(targetDom, gragBoxDom);
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

  //   let stringText =
  //     "102.2251169293233914 31.8993595729625170 2583.2630711980164051, 102.2246695605755065 31.8997466023956591 2583.9566451366990805, 102.2247941046693711 31.9001514187624409 2584.4643541909754276, 102.2251757003750754 31.8999975269162306 2584.6044906023889780, 102.2252265281069583 31.9000096702691387 2584.9411731846630573, 102.2254208067011518 31.9000474256146482 2593.2068695053458214, 102.2270068814213317 31.9006585556081284 2654.6934871952980757, 102.2282368964911115 31.9004053584073688 2669.3209248213097453, 102.2300045957815655 31.8986047359801077 2635.5938927214592695, 102.2331883625679012 31.8971694923829823 2657.8699506577104330, 102.2406325295810916 31.8943258627605033 2653.8750203913077712, 102.2401068182006725 31.8939802979669338 2610.5718563469126821, 102.2401178687907048 31.8939163305640072 2602.4833247009664774, 102.2399156550098525 31.8936238969131658 2597.6502491012215614, 102.2397007790212342 31.8933277135826856 2590.2359152836725116, 102.2388319179498239 31.8928749623085643 2589.6944080572575331, 102.2380291628424942 31.8936912698556014 2588.9364471146836877, 102.2367553829975861 31.8940990903133716 2588.7890293663367629, 102.2367846883073952 31.8936501951275311 2590.3531974451616406, 102.2364877378399513 31.8931441011065928 2594.4661663323640823, 102.2363274405375506 31.8927135860021913 2621.4161859536543489, 102.2355902459755725 31.8924270555824556 2637.6847183555364609, 102.2353607715348289 31.8920946262192189 2625.5000800034031272, 102.2332627784653738 31.8928243926415327 2679.4961479352787137, 102.2292671023014776 31.8948119951511266 2664.0171951800584793, 102.2290797750101063 31.8957386368064917 2618.5859328079968691, 102.2292402445802821 31.8958724248590926 2585.3378299707546830, 102.2291231348607710 31.8959778645016030 2585.2262141732499003, 102.2291231348607710 31.8959778645016030 2585.2262141732499003, 102.2251169293233914 31.8993595729625170 2583.2630711980164051";
  //   let stringText =
  //     "102.2178327686284405 31.9038048802916379 2579.7580138742923737, 102.2177557931860292 31.9037176328606158 2579.6209932956844568, 102.2174126631117446 31.9036083479967125 2579.9160708729177713, 102.2172564879561207 31.9035674772276074 2589.2506834687665105, 102.2168015420265732 31.9033667910147543 2579.5931575549766421, 102.2167783919746995 31.9033457706884960 2579.5675794603303075, 102.2169834852905410 31.9029687469826868 2579.8264253670349717, 102.2185031608787824 31.9003599664099013 2581.7968266652897000, 102.2188358609824519 31.9001260474590822 2581.9707038374617696, 102.2202984436357553 31.8992496767679228 2614.5117463730275631, 102.2218377123553097 31.8989844312343962 2612.4333178587257862, 102.2219414642458162 31.8989027993617071 2597.4616135079413652, 102.2220561545272659 31.8986704870490847 2597.2032555742189288, 102.2216774770926691 31.8970159352519680 2627.0748993288725615, 102.2220138150468216 31.8973177539481938 2619.4494196791201830, 102.2222071345018719 31.8975609475741031 2626.1077664531767368, 102.2225729998947088 31.8976401200023467 2651.3979928866028786, 102.2231522844799230 31.8976043791624591 2630.4419830078259110, 102.2238402029512514 31.8970320624457848 2639.1668137116357684, 102.2264696178660870 31.8967250064209651 2617.2644699858501554, 102.2264407695577830 31.8973325499108675 2583.8665667446330190, 102.2265490290437384 31.8979970464198530 2583.9319561375305057, 102.2256706872728529 31.8986462472734296 2584.0526366867125034, 102.2248723205787826 31.8995160403748095 2583.3370659323409200, 102.2245864168440335 31.8996752651059872 2583.7181774796918035, 102.2247762130025848 31.9000438554738537 2584.5652615930885077, 102.2248339058544957 31.9001588431022824 2584.4405742483213544, 102.2248640156342248 31.9001821609939853 2584.7110450910404325, 102.2249963242653195 31.9003329677731955 2592.9146440513432026, 102.2247421350009660 31.9005101917613025 2598.6585570927709341, 102.2248764205425999 31.9009898510534953 2600.1032487060874701, 102.2248198166776092 31.9015930760609052 2623.9688602006062865, 102.2245657953359910 31.9024488761036693 2664.3234665533527732, 102.2244345843870690 31.9028501997494942 2626.6863038241863251, 102.2246511190650295 31.9033209578113173 2615.9002640619874001, 102.2275473686423624 31.9047184656249279 2634.5134371668100357, 102.2279731109539256 31.9049569665104471 2662.3561112880706787, 102.2279834083838921 31.9056527328333281 2602.0792329376563430, 102.2278599908140677 31.9057874845616212 2601.5986392302438617, 102.2276626612865300 31.9059866856882373 2601.6203577127307653, 102.2273592259617203 31.9063094852707003 2630.5076292427256703, 102.2265747264841309 31.9060053450297048 2635.0954506527632475, 102.2261538265155423 31.9055490793363425 2644.0553115457296371, 102.2242602453616769 31.9044707645077956 2637.6628457223996520, 102.2228386608388462 31.9027191350975343 2621.0831311661750078, 102.2203692548426801 31.9037447936820229 2641.8502621101215482, 102.2188457360853988 31.9045698136976021 2625.0033573955297470, 102.2181243098145700 31.9041128712537834 2579.5116587020456791, 102.2178327686284405 31.9038048802916379 2579.7580138742923737";
  //   let stringArr = stringText.split(",");
  //   let arr = [];
  //   console.log(stringArr);

  //   stringArr.forEach((item: string) => {
  //     let newArr = item.split(" ");
  //     let arr2 = [];
  //     newArr.forEach((res: string) => {
  //       if (res != "") {
  //         arr2.push(Number(res));
  //       }
  //     });
  //     arr.push(arr2);
  //   });
  //   console.log(arr);
});
</script>

<style scoped>
.container {
  width: 100%;
  overflow: hidden;
}
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
  width: 200px;
  height: 200px;
  background-color: aqua;
  border: 1px solid rgba(3, 31, 172, 0.603);
  transform-origin: 0% 0%;
  transform: scale(2);
}
</style>
