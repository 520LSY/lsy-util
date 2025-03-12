import { defineComponent, PropType } from "vue";

export const lsyButtonProps = {
  // 按钮文字
  text: {
    type: String,
    default: "按钮",
  },
  // 文本颜色
  textColor: {
    type: String,
    default: "#ffffff",
  },
};

// 按钮回调集合
export const lsyButtonEmits = {
  // 点击回调
  click: (e: MouseEvent) => e,
};

export default defineComponent({
  name: "lsy-button",
  props: lsyButtonProps,
  emits: lsyButtonEmits,
  setup(props, { slots, emit }) {
    return () => (
      <div
        class="lsy-button"
        style={{ color: props.textColor }}
        onClick={(e: MouseEvent) => emit("click", e)}
      >
        {slots.default ? slots.default() : props.text}
      </div>
    );
  },
});
