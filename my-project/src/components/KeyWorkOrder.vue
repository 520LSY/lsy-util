<!-- 重点工单 -->
<template>
  <div class="suddenContainer">
    <div class="eventTitle">
      <div class="titleText">
        <i class="icon"></i>
        <span class="title">{{ data.questionTitle }}</span>
        <span class="state">{{ data.state }}</span>
      </div>
      <!-- <div class="command" @click="eventFlowPath">事件流程图</div> -->
      <div class="command" @click="goRhzh">一键指挥</div>
    </div>
    <!-- 等级/时间 -->
    <div class="max-row">
      <div class="row-name row">
        <i class="icon leve-icon"></i>
        <span class="row-key">事件等级：</span>
        <!-- <span class="row-value">{{ data.level }}</span> -->
        <span
          :class="{
            blue: data.urgency == '待定',
            yellow: data.urgency == '较重大',
            green: data.urgency == '一般',
            red: data.urgency == '重大',
            level: true,
          }"
          >{{ data.urgency }}</span
        >
      </div>
      <div class="row-time row">
        <i class="icon time-icon"></i>
        <span class="row-key">事发时间：</span>
        <span class="row-value">{{ data.reportDate }}</span>
      </div>
    </div>
    <!-- 类型/地点 -->
    <div class="max-row">
      <div class="row-name row">
        <i class="icon type-icon"></i>
        <span class="row-key">事件类型：</span>
        <span class="row-value">{{ data.class1 }}</span>
      </div>
      <div class="row-time row">
        <i class="icon address-icon"></i>
        <span class="row-key">事发地点：</span>
        <span class="row-value">{{ data.hadress }}</span>
      </div>
    </div>
    <!-- 事件详情 -->
    <div class="row-content row">
      <div class="flex">
        <i class="icon content-icon"></i>
        <span class="row-key">事件详情：</span>
      </div>
      <div class="row-value">{{ data.desc || "暂无" }}</div>
    </div>

    <!-- 处置进度 -->
    <div class="row-progress row">
      <div class="flex">
        <div class="flexText">
          <i class="icon content-icon"></i>
          <span class="row-key">事件追踪：</span>
        </div>
        <div class="command" @click="fullScreen.showDom(true)">全屏</div>
      </div>
      <div class="listBox">
        <template v-if="data.progressTime.length > 0">
          <div class="list-header">
            <div class="head-column">时间轴</div>
            <div
              v-for="(value, key) in data.progressContent"
              :key="key"
              class="head-column"
            >
              <n-tooltip trigger="hover">
                <template #trigger
                  ><div>
                    {{ key }}
                  </div> </template
                >{{ key }}</n-tooltip
              >
            </div>
          </div>
          <div class="contentMain">
            <div
              v-for="(time, index) in data.progressTime"
              :key="index"
              class="row"
            >
              <div class="row-column time-column">
                <i class="icon"></i>
                <div class="time">
                  <div>{{ getTime(time)[0] }}</div>
                  <div>{{ getTime(time)[1] }}</div>
                </div>
              </div>
              <template v-for="(value, key) in data.progressContent" :key="key">
                <div class="row-column text-column">
                  <n-tooltip trigger="hover">
                    <template #trigger
                      ><div class="content">
                        {{ getProgressText(value[index]).content }}
                      </div> </template
                    >{{ getProgressText(value[index]).content }}</n-tooltip
                  >
                  <n-tooltip trigger="hover">
                    <template #trigger
                      ><div class="stae">
                        {{ getProgressText(value[index]).state }}
                      </div> </template
                    >{{ getProgressText(value[index]).state }}</n-tooltip
                  >
                  <span
                    class="clickFile"
                    @click="showFilePop(value[index])"
                    v-if="isFile(value[index])"
                    >查看附件</span
                  >
                </div>
              </template>
            </div>
          </div>
        </template>
        <div v-else class="noData">暂无</div>
      </div>
    </div>
  </div>

  <!-- <HomeLeftPop ref="eventFlow" title="事件流程图">
        <EventFlow></EventFlow>
    </HomeLeftPop> -->
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, computed, watch } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: "20221015090202833",
  },
});
const leftPop = ref();
// 普通、多跨（突发）
const fullScreen = ref();
const isShow = ref<boolean>(false);
const fileList: Array<{
  fileId: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  kindType: string;
  logId: string;
}> = reactive([]);
// 定义详情变量
const data = reactive({
  // 状态
  state: "",
  // 标题
  questionTitle: "",
  // 事件等级
  urgency: "",
  // 事件时间
  reportDate: "",
  // 事件类型
  class1: "",
  // 事发地点
  hadress: "",
  // 事件详情
  desc: "",
  // 处置结果
  finishRemark: "",
  // 纬度
  lat: "",
  // 经度
  lng: "",
  // 事件追踪内容列表
  progressContent: {},
  // 事件追踪时间列表
  progressTime: [],
});

// 详情获取
function getData() {
  fetch("./file/data.json")
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      // 标题
      data.questionTitle =
        resData.data.data.mainFlow["questionTitle"].dataName || "暂无";
      // 状态 $flow_status$

      data.state =
        resData.data.data.mainFlow["$flow_status$"].dataName || "暂无";
      // 等级
      data.urgency = resData.data.data.mainFlow["$urgency$"].dataName || "待定";
      // 时间
      data.reportDate =
        resData.data.data.mainFlow["reportDate"].dataName || "暂无";
      // 类型
      data.class1 = resData.data.data.mainFlow["$class_1$"].dataName || "暂无";
      // 地点
      data.hadress =
        JSON.parse(resData.data.data.mainFlow["hadress"].dataName).address ||
        "暂无";
      data.lat =
        JSON.parse(resData.data.data.mainFlow["hadress"].dataName).lat || null;
      data.lng =
        JSON.parse(resData.data.data.mainFlow["hadress"].dataName).lng || null;
      // 详情
      data.desc = resData.data.data.mainFlow["desc"].dataName || "暂无";
    });
  fetch("./file/data2.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // 转存数据
      let progressTime: any = [...res.data.time];

      let newContent: { [name: string]: any } = {};
      res.data.title.forEach((item: any) => {
        newContent[item] = res.data.data[item];
      });
      data.progressContent = res.data.data;
      data.progressTime = progressTime;
    });
}
// 计算属性处理时间
const getTime = computed(() => {
  return (time: string) => {
    return time.split(" ");
  };
});
// 计算属性判断是否有附件
const isFile = computed(() => {
  return (item: any) => {
    if (item && item.fileList && item.fileList.length > 0) {
      return true;
    } else {
      return false;
    }
  };
});
// 点击查看附件
function showFilePop(item: any) {
  leftPop.value.init();
  fileList.length = 0;
  item.fileList.forEach(
    (item: {
      fileId: string;
      fileName: string;
      fileType: string;
      fileUrl: string;
      kindType: string;
      logId: string;
    }) => {
      fileList.push(item);
    }
  );
}
// 计算属性处理事件追踪内容
const getProgressText = computed(() => {
  return (item: any) => {
    // if (item && item.operationContent) {
    //     return item.operationContent;
    // } else {
    //     return '';
    // }

    if (item) {
      return {
        // 状态
        state: `处置状态:${item.nowNodeName || "无"}`,
        // 内容
        content: `${item.groupUser}:${item.operationContent || "无"}`,
      };
    } else {
      return {
        state: "",
        content: "",
      };
    }
  };
});
watch(
  () => props,
  () => {
    getData();
  },
  {
    deep: true,
  }
);
onMounted(() => {
  getData();
});

//融合指挥跳转
const goRhzh = () => {};
</script>
<style lang="postcss" scoped>
@import "./comm.postcss";
.blue {
  border: solid 1px #21a0ff;
  color: #21a0ff;
}
.yellow {
  border: solid 1px #ffd972;
  color: #ffd972;
}
.green {
  border: solid 1px #46f594;
  color: #46f594;
}
.red {
  border: solid 1px #f54646;
  color: #f54646;
}
.suddenContainer {
  font-weight: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0px;
  color: #ffffff;
  pointer-events: all;
  font-size: 16px;
  background-color: #0b2d6c;
  .icon {
    display: inline-block;
  }
  .command {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 92px;
    height: 32px;
    background: center url(@/assets/images/event/11.png) no-repeat;
    cursor: pointer;
  }

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 28px;
    font-family: PingFangRegular;
    line-height: 1;

    .icon {
      display: inline-block;
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
    .leve-icon {
      background: center url("@/assets/images/event/2.png") no-repeat;
    }
    .time-icon {
      background: center url("@/assets/images/event/6.png") no-repeat;
    }
    .address-icon {
      background: center url("@/assets/images/event/7.png") no-repeat;
    }
    .content-icon {
      background: center url("@/assets/images/event/4.png") no-repeat;
    }
    .type-icon {
      background: center url("@/assets/images/event/3.png") no-repeat;
    }
    .finish-icon {
      background: center url("@/assets/images/event/5.png") no-repeat;
    }

    .row-key {
      font-size: 16px;
      color: #c8eaff;
      margin-right: 7px;
    }
    .row-value {
      font-size: 16px;
      color: #ffffff;
    }
    .level {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 51px;
      height: 24px;
      font-family: PingFangBold;
      font-size: 16px;
      letter-spacing: 0px;
      border-radius: 1px;
      box-shadow: 1px 1px 0px 0px #0b2d6c;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .max-row {
    display: flex;
    align-items: center;
    margin-bottom: 34px;
    .row {
      margin-bottom: 0;
      width: 417px;

      &:last-of-type {
        flex: 1;
      }
      .row-key,
      .icon {
        flex-shrink: 0;
      }
    }
    .row-value {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .row-time:nth-of-type(1) {
      margin-right: 105px;
    }
  }
  .row-content {
    display: block;
    .flex {
      display: flex;
      align-items: flex-end;
      margin-bottom: 20px;
    }
    .row-value {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      border: solid 1px #21a0ff;
      padding: 18px;
      font-size: 16px;
      line-height: 26px;
      letter-spacing: 0px;
      color: #ffffff;
      overflow-y: auto;
    }
  }
  .row-progress {
    display: block;
    box-sizing: border-box;
    .noData {
      padding: 18px;
    }
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .flexText {
        display: flex;
        align-items: flex-end;
        margin-bottom: 0;
      }
    }
    .listBox {
      box-sizing: border-box;
      width: 100%;
      height: 450px;
      border: solid 1px #21a0ff99;
      overflow-x: auto;
      /* overflow-y: hidden; */
      padding-bottom: 3px;
    }
    .list-header {
      display: flex;
      align-items: center;
      width: auto;
      margin-bottom: 4px;
      position: sticky;
      top: 0;
      z-index: 2;
      .head-column {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 260px;
        flex: 1;
        height: 60px;
        flex-shrink: 0;
        background: rgba(21, 59, 102, 1);
        margin-left: 5px;
        padding: 5px;
        box-sizing: border-box;

        > div {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
        }
        &:first-of-type {
          width: 200px;
          margin-left: 0;
        }
      }
    }
    .contentMain {
      .row {
        margin-bottom: 4px;
      }
    }
  }
}
</style>
