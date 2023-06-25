class UtilComm {
  // 静态参数
  static state = {
    x_PI: (3.14159265358979324 * 3000.0) / 180.0,
    PI: 3.1415926535897932384626,
    a: 6378245.0,
    ee: 0.00669342162296594323,
  };
  /**
   * 纬度转换
   * @param {number} lng 经度
   * @param {number} lat 纬度
   */
  static transformlat(lng, lat) {
    try {
      lat = +lat;
      lng = +lng;
      let ret =
        -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng));
      ret +=
        ((20.0 * Math.sin(6.0 * lng * this.state.PI) +
          20.0 * Math.sin(2.0 * lng * this.state.PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lat * this.state.PI) +
          40.0 * Math.sin((lat / 3.0) * this.state.PI)) *
          2.0) /
        3.0;
      ret +=
        ((160.0 * Math.sin((lat / 12.0) * this.state.PI) +
          320 * Math.sin((lat * this.state.PI) / 30.0)) *
          2.0) /
        3.0;
      return ret;
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * 经度转换
   * @param {number} lng 经度
   * @param {number} lat 纬度
   */
  static transformlng(lng, lat) {
    try {
      lat = +lat;
      lng = +lng;
      let ret =
        300.0 +
        lng +
        2.0 * lat +
        0.1 * lng * lng +
        0.1 * lng * lat +
        0.1 * Math.sqrt(Math.abs(lng));
      ret +=
        ((20.0 * Math.sin(6.0 * lng * this.state.PI) +
          20.0 * Math.sin(2.0 * lng * this.state.PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lng * this.state.PI) +
          40.0 * Math.sin((lng / 3.0) * this.state.PI)) *
          2.0) /
        3.0;
      ret +=
        ((150.0 * Math.sin((lng / 12.0) * this.state.PI) +
          300.0 * Math.sin((lng / 30.0) * this.state.PI)) *
          2.0) /
        3.0;
      return ret;
    } catch (error) {
      console.error(console.error());
    }
  }
  /**
   * 判断是否在国内，不在国内则不做偏移
   * @param {number} lng 经度
   * @param {number} lat 纬度
   */
  static out_of_china(lng, lat) {
    return (
      lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
    );
  }
  /**
   * wgs8与gcj02互转
   * @param {number} lng 经度
   * @param {number} lat 纬度
   */
  static delta(lng, lat) {
    var dlat = UtilComm.transformlat(lng - 105.0, lat - 35.0);
    var dlng = UtilComm.transformlng(lng - 105.0, lat - 35.0);
    var radlat = (lat / 180.0) * UtilComm.state.PI;
    var magic = Math.sin(radlat);
    magic = 1 - UtilComm.state.ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat =
      (dlat * 180.0) /
      (((UtilComm.state.a * (1 - UtilComm.state.ee)) / (magic * sqrtmagic)) *
        UtilComm.state.PI);
    dlng =
      (dlng * 180.0) /
      ((UtilComm.state.a / sqrtmagic) * Math.cos(radlat) * UtilComm.state.PI);
    return { dlng, dlat };
  }
}
/**
 * 格式化时间戳(lsy)
 * @param {string} format 例：YYYY-MM-DD HH:mm:ss;YYYY年MM月DD日 HH:mm:ss
 * 时间戳指定
 *  年为YYYY
 *  月为MM
 *  日为DD
 *  小时为HH
 *  分钟为mm
 *  秒为ss
 * @param {string} time 时间戳
 * @param {boolean} isZero 是否补充0（即当位数为个数是时在前面补充0）
 *
 */
export function FormatTimestamp(
  format = "YYYY-MM-DD HH:mm:ss",
  time = new Date().getTime(),
  isZero = true
) {
  // 判断时间戳位数,如果是10位则默认补充到13位
  if (String(time).length == 10) {
    time = time * 1000;
  }
  // 获取年月日时分秒
  let date = new Date(time);
  let year = date.getFullYear();
  let month = addZero(date.getMonth() + 1);
  let day = addZero(date.getDate());
  let hh = addZero(date.getHours());
  let mm = addZero(date.getMinutes());
  let ss = addZero(date.getSeconds());
  // 根据isZero与num的值双重判断是否添加0
  function addZero(num) {
    // 当isZero为true并且值小于10的时候才补充0
    return isZero && num < 10 ? "0" + num : num;
  }
  // 替换对应的值
  format = format.replace("YYYY", String(year));
  format = format.replace("MM", String(month));
  format = format.replace("DD", String(day));
  format = format.replace("HH", String(hh));
  format = format.replace("mm", String(mm));
  format = format.replace("ss", String(ss));
  // 返回对应的值
  return format;
}
/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param {number} bd_lon 经度
 * @param {number} bd_lat 纬度
 */
export function Bd09togcj02(bd_lon, bd_lat) {
  let x = bd_lon - 0.0065;
  let y = bd_lat - 0.006;
  let z =
    Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * UtilComm.state.x_PI);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * UtilComm.state.x_PI);
  let gg_lng = z * Math.cos(theta);
  let gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat];
}
/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param {number} lng 经度
 * @param {number} lat 纬度
 */
export function Gcj02tobd09(lng, lat) {
  var z =
    Math.sqrt(lng * lng + lat * lat) +
    0.00002 * Math.sin(lat * UtilComm.state.x_PI);
  var theta =
    Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * UtilComm.state.x_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lng, bd_lat];
}
/**
 * WGS84转GCj02
 * @param {number} lng 经度
 * @param {number} lat 纬度
 */
export function Wgs84togcj02(lng, lat) {
  if (UtilComm.out_of_china(lng, lat)) {
    return [lng, lat];
  } else {
    const { dlng, dlat } = UtilComm.delta(lng, lat);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [mglng, mglat];
  }
}
/**
 * GCJ02 转换为 WGS84
 * @param {number} lng 经度
 * @param {number} lat 纬度
 */
export function Gcj02towgs84(lng, lat) {
  if (UtilComm.out_of_china(lng, lat)) {
    return [lng, lat];
  } else {
    const { dlng, dlat } = UtilComm.delta(lng, lat);
    let mglat = lat + dlat;
    let mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat];
  }
}
/**
 * 防抖的目的是在短时间内连续触发的事件中，只执行一次回调函数。
 * 当事件被触发后，等待一定的延迟时间（例如300毫秒），
 * 如果在这个延迟时间内没有再次触发该事件，则执行回调函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行(立即执行即点击就执行一次，之后指定时间内的不执行)
 * @return null
 */
export function Debounce(func, wait = 500, immediate = false) {
  let timeout = null;
  return (...args) => {
    // 清除定时器
    if (timeout !== null) clearTimeout(timeout);
    // 立即执行，此类情况一般用不到
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) typeof func === "function" && func.apply(this, args);
    } else {
      // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
      timeout = setTimeout(() => {
        typeof func === "function" && func.apply(this, args);
      }, wait);
    }
  };
}
/**
 * 节流的目的是在连续触发的事件中，按照一定的时间间隔执行回调函数。
 * 当事件被触发后，会设置一个固定的时间间隔（例如300毫秒），
 * 在这个时间间隔内，无论事件触发多少次，只执行一次回调函数。
 * 然后等待下一个时间间隔开始时再执行。
 * @param {video} func
 * @param {number} wait
 */
export function Throttle(func, wait = 500) {
  let time = 0;
  return (...args) => {
    // 获取当前时间戳
    let currentTime = Date.now();
    if (time == 0 || currentTime - time > wait) {
      func.apply(this, args);
      time = currentTime;
    }
  };
}

/**
 * 防抖节流结合函数
 * @param {video} func 要执行的回调函数
 * @param {number} delay 防抖延迟的时间
 * @param {number} throttleInterval 节流时间间隔
 * @returns
 */
export function DebounceAndThrottle(func, delay, throttleInterval) {
  let timeoutId;
  let lastExecutedTime = Date.now() - throttleInterval;

  return function (...args) {
    const currentTimestamp = Date.now();

    clearTimeout(timeoutId);

    if (currentTimestamp - lastExecutedTime >= throttleInterval) {
      // 超过节流时间间隔，直接执行
      func.apply(this, args);
      lastExecutedTime = currentTimestamp;
    } else {
      // 在节流时间间隔内，进行防抖处理
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecutedTime = currentTimestamp;
      }, delay);
    }
  };
}

/**
 * 批量转换坐标
 * @param {Array} data 要批量转换的数据，要求内部数据对象必须包含经度（lng）、纬度（lat）
 * @param {"BD09"|"GCJ02"|"WGS84"} source 转换之前的坐标系
 * @param {"BD09"|"GCJ02"|"WGS84"} target 目标坐标系
 */
export function BatchCoordinateTransformation(data, source, target) {
  // 如果初始数是百度坐标系，那么需要现将其转为GCJ02，然后才能转成别的类型
  if (source === "BD09") {
    data.forEach((item) => {
      let coordinate = Bd09togcj02(Number(item.lon), Number(item.lat));
      item.lon = coordinate[0];
      item.lat = coordinate[1];
    });
  }
  switch (target) {
    case "GCJ02":
      if (source === "WGS84") {
        data.forEach((item) => {
          let coordinate = Wgs84togcj02(Number(item.lon), Number(item.lat));
          item.lon = coordinate[0];
          item.lat = coordinate[1];
        });
      }
      return data;
    case "WGS84":
      if (source === "GCJ02" || source === "BD09") {
        data.forEach((item) => {
          let coordinate = Gcj02towgs84(Number(item.lon), Number(item.lat));
          item.lon = coordinate[0];
          item.lat = coordinate[1];
        });
      }
      return data;

    default:
      return [];
  }
}

// 将倒叙方法挂载到大对象中
// 时间戳转时间
UtilComm.FormatTimestamp = FormatTimestamp;
// 坐标转换
UtilComm.Bd09togcj02 = Bd09togcj02;
UtilComm.Gcj02tobd09 = Gcj02tobd09;
UtilComm.Wgs84togcj02 = Wgs84togcj02;
UtilComm.Gcj02towgs84 = Gcj02towgs84;
// 防抖函数
UtilComm.Debounce = Debounce;
// 节流函数
UtilComm.Throttle = Throttle;
// 防抖节流配合
UtilComm.DebounceAndThrottle = DebounceAndThrottle;
// 批量转换坐标
UtilComm.BatchCoordinateTransformation = BatchCoordinateTransformation;
// 默认暴露大对象
export default UtilComm;
