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
