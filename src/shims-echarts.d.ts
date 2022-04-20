import * as echarts from "echarts";

declare module 'vue/types/vue' {
    interface Vue {
        $echarts: echarts;
    }
}
