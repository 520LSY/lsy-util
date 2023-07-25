# lsy-util 简介

本插件只是用于封装本人工作时常用的一些功能方法。

### 使用手册

#### 引入

```js
// 全部引入
import LsyUtil from "lsy-util";
// 按需引入
import { FormatTimestamp } from "lsy-util";
// 或者结合
import LsyUtil, { FormatTimestamp } from "lsy-util";
```

### 方法介绍

#### 1.时间戳转指定格式时间

```js
// 这里的第一个参数格式不限，但是YYYY是年，MM是月等等
// 举例：如果你传的第一个参数是YYYY年MM是月，后面的一次日，时，分，秒；
// 返回的就是2023年6月，这里的"年"可以替换成任意字符串

LsyUtil.FormatTimestamp("YYYY-MM-DD HH:mm:ss", new Date().getTime(), true); // 2023-06-14 32:32:32
LsyUtil.FormatTimestamp("YYYY年MM-DD HH:mm:ss", new Date().getTime(), false); // 2023年6-14 32:32:32
```

#### 2.百度坐标系(BD-09)转火星坐标系 (GCJ-02)的转换

```js
LsyUtil.Bd09togcj02(104.072227, 30.663461); //[number,number]
```

#### 3.火星坐标系(GCJ-02)转百度坐标系 (BD-09) 的转换

```js
LsyUtil.Gcj02tobd09(104.06574486310292, 30.657390983078812); //[number,number]
```

#### 4.WGS84 转 GCj02

```js
LsyUtil.Wgs84togcj02(104.06574486310292, 30.657390983078812); //[number,number]
```

#### 5.GCJ02 转换为 WGS84

```js
LsyUtil.Gcj02towgs84(104.06324221711895, 30.659815387523782); //[number,number]
```

#### 6.防抖函数

```js
// 注意第三个参数，如果传true则防抖函数会立即执行一次
const debounceFun = LsyUtil.Debounce(
  () => {
    // 要执行的方法代码
  },
  500,
  true
);
debounceFun();
```

#### 7.节流函数

```js
const throttleFun = LsyUtil.Throttle(() => {
  // 要执行的方法代码
}, 500);
throttleFun();
```

#### 8.防抖节流结合函数

```js
const fun = LsyUtil.DebounceAndThrottle(
  () => {
    // 要执行的方法代码
  },
  500,
  500
);
fun();
```

#### 9.经纬度坐标批量转换

```js
// 其中第二个（当前类型）以及第三个（目标类型）参数，
当前有且仅接收三个参数"BD09" | "GCJ02" | "WGS84"
LsyUtil.BatchCoordinateTransformation([], "BD09", "GCJ02");
```

#### 10.文本复制

```js
// 结束一个字符串数据，然后将其放在剪切板
LsyUtil.AdhesiveBoard("这是要复制的内容");
```

#### 11.rgb/rgba 与十六进制颜色互转

```js
// rgb/rgba与十六进制颜色互转
LsyUtil.ColorConversion("rgb(255,255,255)"); // #ffffff
LsyUtil.ColorConversion("rgba(255,255,255,0.8)"); // #ffffffcc
LsyUtil.ColorConversion("#ffffff"); // rgb(255,255,255)
LsyUtil.ColorConversion("#ffffffcc"); // rgba(255,255,255,0.8)
```

#### 12.数据转存文件（Firefox、Chrome 内核）

```js
// 该方法接收两个参数，第一个是要转存的数据（注意是string类型）
// 第二个是转存后的文件名称以及类型，默认为.txt类型
LsyUtil.DataConversionFile("本应椿去湫来，奈何北冥有鱼", "lsy.txt");
```

#### 13.鼠标控制元素旋转

```js
// 实现鼠标控制dom元素360度旋转
/**
 * 方法接收三个参数，前两个必传
 * 1.要控制的DOM元素节点
 * 2.元素的初始旋转角度
 * 3.回调函数（每次旋转都会执行）
 */
LsyUtil.ElementRotation(document.getElementId("test"), 0, () => {});
```
