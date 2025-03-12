import { defineComponent, ref } from "vue";

export default defineComponent({ // 传入组件配置
    props: ['name'],
    setup(props) {
        const render = () => {
            return (<p>{props.name}</p>)

        }
        return render
    }
})
