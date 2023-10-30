/**
 * 插件来源：https://github.com/SheetJS/sheetjs
 */
import "../util/xlsx/xlsx.full.min";
import { obj_json } from "../util/obj_json";
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
    /**
     * rgb/rgba颜色转换
     * @param rgba
     * @returns
     */
    static rgbaToHex(rgba) {
        // 从RGBA字符串中提取出四个值：红、绿、蓝和透明度
        let values = rgba
            .substring(rgba.indexOf("(") + 1, rgba.lastIndexOf(")"))
            .split(",");

        // 将每个值转换为十六进制，并使用padStart方法在不足两位的情况下前面补0
        let red = parseInt(values[0]).toString(16).padStart(2, "0");
        let green = parseInt(values[1]).toString(16).padStart(2, "0");
        let blue = parseInt(values[2]).toString(16).padStart(2, "0");
        if (values.length == 3) {
            // 返回合并后的十六进制颜色值
            return "#" + red + green + blue;
        } else if (values.length == 4) {
            let hexAlpha = Math.round(Number(values[3]) * 255)
                .toString(16)
                .padStart(2, "0");
            // 返回合并后的十六进制颜色值
            return "#" + red + green + blue + hexAlpha;
        }
    }
    /**
     * 十六进制颜色转换
     * @param hex
     * @returns
     */
    static hexToRgba(hex) {
        // 如果十六进制颜色值以#开头，则去除#
        if (hex.startsWith("#")) {
            hex = hex.substring(1);
        }

        // 提取红、绿、蓝三个通道的值
        let red = parseInt(hex.substring(0, 2), 16);
        let green = parseInt(hex.substring(2, 4), 16);
        let blue = parseInt(hex.substring(4, 6), 16);
        if (hex.length === 6) {
            // 返回RGBA字符串
            return `rgb(${red}, ${green}, ${blue})`;
        } else if (hex.length === 8) {
        }
        let alpha = parseInt(hex.substring(6, 8), 16) / 255;
        // 返回RGBA字符串
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
    /**
     * 计算当前元素的旋转角度
     * @param x1 原点x轴
     * @param y1 原点y轴
     * @param x2 上一个停留点x轴
     * @param y2 上一个停留点y轴
     * @param x3 当前停留点x轴
     * @param y3 当前停留点y轴
     * @param angle 当前旋转的角度
     */
    static getAngle(x1 = 0, y1 = 0, x2, y2, x3, y3, angle = 0) {
        let radian = Math.acos(
            ((x2 - x1) * (x3 - x1) + (y2 - y1) * (y3 - y1)) /
            (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) *
                Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2)))
        );

        let newAngle = (radian * 180) / Math.PI || 0;

        let includedAngle1 = (180 / Math.PI) * Math.atan2(x2, y2);

        let includedAngle2 = (180 / Math.PI) * Math.atan2(x3, y3);

        if (includedAngle1 < includedAngle2) {
            angle = angle - newAngle;
        } else {
            angle = angle + newAngle;
        }
        if (typeof angle == "number") {
            return angle;
        }
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

/**
 * 0.0.5
 * 文本复制
 * @param {string} text
 */
export function AdhesiveBoard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            alert("文本已成功复制到剪贴板");
        })
        .catch((error) => {
            alert("复制文本失败");
            console.error("复制文本失败:", error);
        });
}
/**
 * 0.0.5
 * rgb/rgba与十六进制颜色互转
 * @param {string} color
 * @returns string
 */
export function ColorConversion(color) {
    if (color.slice(0, 1) === "#") {
        // 传入的十六进制颜色，转为rgb或者rgba
        return UtilComm.hexToRgba(color);
    } else {
        return UtilComm.rgbaToHex(color);
    }
}
/**
 * 0.0.5
 * 数据转存文件（Firefox、Chrome内核）
 * @param {string} data 数据
 * @param {string} name 文件名称（包括后缀名，如果没有默认.txt）
 */
export function DataConversionFile(data, name) {
    //
    let nameArr = name.split(".");
    let length = nameArr.length;
    if (length == 1) {
        name = name + ".txt";
    } else if (length > 1 && nameArr[length - 1] == "") {
        name = name + "txt";
    }
    const blob = new Blob([data], {
        type: "application/text",
    }); // 构造一个blob对象来处理数据

    // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
    // IE10以上支持blob但是依然不支持download
    if ("download" in document.createElement("a")) {
        // 支持a标签download的浏览器
        const link = document.createElement("a"); // 创建a标签
        link.download = name; // a标签添加属性
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click(); // 执行下载
        URL.revokeObjectURL(link.href); // 释放url
        document.body.removeChild(link); // 释放标签
    } else {
        // 其他浏览器
        navigator.msSaveBlob(blob, name);
    }
}
/**
 * 0.0.5
 * 鼠标控制元素旋转
 * @param {Element} element 要控制的元素节点
 * @param {number} angle 初始默认旋转角度
 */
export function ElementRotation(element, angle, back) {
    if (!(element instanceof HTMLElement)) {
        throw new Error("请传入正确的HTMLElement元素");
    }
    if (typeof angle != "number") {
        throw new Error("angle的类型应该是Number");
    }
    angle = angle;
    // 初始化旋转角度
    element.style.transform = `rotate(${angle}deg)`;
    // 对元素节点进行处理，以便于获取元素相对于浏览器可是窗口位置
    let rect = element.getBoundingClientRect();
    // 获取元素中心点位置（用于计算鼠标位置相对于元素中心点的位置）
    let origin = [
        element.clientWidth / 2 + rect.left,
        element.clientHeight / 2 + rect.top,
    ];
    // 定义变量获取鼠标进入元素后第一次点击的位置
    let clickPosition = [];
    // 定义变量储存鼠标每次移动的位置
    let poi = [];
    // 定义变量判断鼠标是否按下不放
    let isMouseDown = false;

    // 给目标元素添加鼠标按下事件
    element.addEventListener("mousedown", (event) => {
        isMouseDown = true;
        // 获取鼠标点击的位置
        clickPosition = [event.clientX - origin[0], event.clientY - origin[1]];
        // 每次鼠标按下将上次记录的位置置空
        poi = [];
    });
    // 给元素添加移动事件
    element.addEventListener("mousemove", (event2) => {
        if (!isMouseDown) return;
        // 判断并记录上一次鼠标移动位置
        if (poi.length == 2) {
            clickPosition = [poi[0], poi[1]];
        }
        poi = [event2.clientX - origin[0], event2.clientY - origin[1]];

        angle = UtilComm.getAngle(
            0,
            0,
            clickPosition[0],
            clickPosition[1],
            poi[0],
            poi[1],
            angle
        );
        element.style.transform = `rotate(${angle}deg)`;
        if (back) {
            back(angle);
        }
    });
    // 给元素添加鼠标松开事件
    element.addEventListener("mouseup", () => {
        isMouseDown = false;
    });
    // 给元素添加鼠标移出事件
    element.addEventListener("mouseout", () => {
        isMouseDown = false;
    });
}
/**
 * 0.0.5
 * 文件下载（.json、.js、图片等会被浏览器直接打开）
 * @param {string} fileUrl 文件地址
 * @param {string} fileName 下载下来的文件名
 */
export function DownloadFile(fileUrl, fileName) {
    if (!fileUrl) {
    }
    // 创建一个a标签
    let dom = document.createElement("a");
    // 设置a标签的href属性值为文件的url地址
    dom.href = fileUrl;
    // 设置a标签的下载属性为文件名称
    dom.download = fileName;
    // 设置隐藏a标签
    dom.style.display = "none";
    // 设置 a 标签的 target属性为 _blank
    dom.target = "_blank";
    // 将a标签添加到DOM中
    document.body.appendChild(dom);
    // 触发a标签点击事件
    dom.click();
    // 移除a标签
    document.body.removeChild(dom);
}
/**
 * DOM元素拖拽
 * @param {HTML} targetDom 要被拖拽的目标元素
 * @param {HTML} parentDom 目标元素允许拖拽的范围，如果不传入那么默认全局（body）
 */
export function DomDragAndDrag(targetDom, parentDom = null, back) {
    // 判断目标元素是否是DOM元素
    if (!(targetDom instanceof HTMLElement)) {
        throw new Error("请确定传入的要拖拽的变量是DOM元素");
    }
    switch (window.getComputedStyle(targetDom).position) {
        case "fixed":
            // 如果元素是固定定位，那么就不需要父元素DOM，这里为了防止用户传入直接置空，进行容错处理
            parentDom = null;
            break;
        case "absolute":
            // 如果目标元素是绝对定位，那么要求必须有父元素DOM，并且父元素DOM必须是'relative'定位
            if (!(parentDom instanceof HTMLElement)) {
                throw new Error("请确定传入父元素变量是DOM元素");
            } else {
                if (window.getComputedStyle(parentDom).position != "relative") {
                    throw new Error("请确定传入父元素设置了相对定位（relative）");
                }
            }
            break;
        case "relative":
        case "static":
            throw new Error("目标元素必须是fixed定位或者absolute定位");
    }
    // 定义变量用于判断鼠标是否移动
    let state = false;
    // 定义变量存储鼠标第一次按下的鼠标位置
    let oneClient = {
        left: 0,
        top: 0,
    };
    // 获取鼠标
    let rect = parentDom
        ? parentDom.getBoundingClientRect()
        : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    // 给元素添加鼠标按下事件
    targetDom.addEventListener("mousedown", (evt) => {
        state = true;
        // 记录鼠标第一次按下的位置
        oneClient.left = evt.clientX;
        oneClient.top = evt.clientY;
    });
    // 给元素添加鼠标松开事件
    targetDom.addEventListener("mouseup", (evt) => {
        state = false;
    });
    // 给元素添加鼠标移出事件
    targetDom.addEventListener("mouseout", (evt) => {
        state = false;
    });
    // 给元素添加移动事件
    targetDom.addEventListener("mousemove", (evt) => {
        if (state) {
            let { left, top, width, height } = targetDom.getBoundingClientRect();
            // 获取鼠标的位置
            let { clientX, clientY } = evt;
            // 获取目标元素相对于waibuhe
            left = left - rect.left;
            top = top - rect.top;
            // 计算获取当前鼠标移动的坐标变化值
            clientX = clientX - oneClient.left;
            clientY = clientY - oneClient.top;
            // 记录这次鼠标的位置，用于下一次计算
            oneClient.left = evt.clientX;
            oneClient.top = evt.clientY;
            // 获取当前元素应该在的位置坐标
            let newLeft = left + clientX;
            let newTop = top + clientY;
            // 对目标元素的偏移量进行判断
            if (newLeft <= 0) {
                // 如果目标元素距离左侧小于等于0，那么就不应该继续往左侧偏移
                newLeft = 0;
            } else if (newLeft >= rect.width - width) {
                // 如果目标元素距离左侧的值大于，父元素减掉目标元素宽度，那么元素不应该继续往右侧偏移
                newLeft = rect.width - width;
            }
            if (newTop <= 0) {
                // 如果目标元素距离顶部小于等于0，那么就不应该继续往顶部偏移
                newTop = 0;
            } else if (newTop >= rect.height - height) {
                // 如果目标元素距离顶部的值大于，父元素减掉目标元素高度，那么元素不应该继续往顶部偏移
                newTop = rect.height - height;
            }
            // 将当前偏移量赋值给目标元素
            targetDom.style.left = newLeft + "px";
            targetDom.style.top = newTop + "px";
            if (back) {
                back({ left: newLeft, top: newTop })
            }
        }
    });
}
/**
 * excel转json
 * @param {*} id 
 */
export function ExcelJson(id = "inputId") {
    //
    //   let inputDom = document.createElement(id='fileId');
    let inputDom = document.getElementById(id);
    if (inputDom) {
        inputDom.id = id;
        inputDom.type = "file";
        inputDom.name = id;
        inputDom.accept = ".xls, .xlsx";
        inputDom.addEventListener("change", (evt) => {
            // 获取目标文件
            var selectedFile = evt.target.files[0];
            // 获取选中的文件的名称
            let fileName = selectedFile.name.split(".");
            // 强制判断文件类型，防止使用者手动修改可选择的文件类型
            if (
                fileName[fileName.length - 1] != "xls" &&
                fileName[fileName.length - 1] != "xlsx"
            ) {
                throw new Error("请选择正确格式的文件");
            }
            // 实例化FileReader对象
            var reader = new FileReader();

            reader.onload = function (event) {
                /*
                 * 以下部分代码基于js-xlsx第三方库，遵循Apache开源协议
                 * Copyright (C) 2012-present   SheetJS LLC
                 *
                 * 你可以在以下网址获取到Apache许可证的副本
                 * http://www.apache.org/licenses/LICENSE-2.0
                 */
                var data = event.target.result;
                // 使用xlsx将Excel中的数据提取出来
                var workbook = XLSX.read(data, {
                    type: "binary",
                });
                console.log("workbook.Sheets[sheetName]", workbook);

                workbook.SheetNames.forEach(function (sheetName) {
                    //   obj_json(workbook.Sheets[sheetName]);
                    //   return;
                    // 将数据转为JSON
                    var xlData = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheetName]
                    );
                    if (xlData.length > 0) {
                        // 定义一个变量存储上一次的完整值
                        // （因为如果有合并项的话会有空值）
                        let previousData = {};
                        // 定义变量存储新数据
                        let returnData = [];
                        // 循环判断，补全空字段
                        xlData.forEach((item, i) => {
                            // 将数据进行存储便于之后操作
                            let newItem = { ...item };
                            // 判断是否是第一次，如果是直接存储即可
                            if (i == 0) {
                                previousData = newItem;
                            } else {
                                // 如果不是第一次就需要判断对象中的字段，将缺失的字段补全
                                for (let key in previousData) {
                                    if (!newItem[key]) {
                                        newItem[key] = previousData[key];
                                    }
                                }
                                previousData = newItem;
                            }
                            // 将数据push到数组中
                            returnData.push(newItem);
                        });
                        // 将数据转为json文件供下载
                        UtilComm.DataConversionFile(
                            JSON.stringify(returnData),
                            `${fileName[0]}_${new Date().getTime()}.json`
                        );
                    }
                });
            };
            reader.onerror = function (event) {
                throw new Error(`无法读取文件代码:${event.target.error.code}`);
            };
            // 读取上传文件为二进制
            reader.readAsBinaryString(selectedFile);
        });
    }
}
/**
 * base6图片
 * @param {*} base64Img base64图片地址
 * @returns 
 */
export function CoverBase64ToImg(dataurl, filename = 'file') {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const suffix = mime.split('/')[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
    })
}
//图片下载
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
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
// 文本复制
UtilComm.AdhesiveBoard = AdhesiveBoard;
// 数据转存文件
UtilComm.DataConversionFile = DataConversionFile;
// 文件下载
// UtilComm.DownloadFile = DownloadFile;
// 元素旋转
UtilComm.ElementRotation = ElementRotation;
// 颜色转换
UtilComm.ColorConversion = ColorConversion;
// 元素拖拽
UtilComm.DomDragAndDrag = DomDragAndDrag;
// excel转json
UtilComm.ExcelJson = ExcelJson;
// base64转png
UtilComm.CoverBase64ToImg = CoverBase64ToImg;
// base64转png
UtilComm.downloadBlob = downloadBlob;
// 默认暴露大对象
export default UtilComm;
