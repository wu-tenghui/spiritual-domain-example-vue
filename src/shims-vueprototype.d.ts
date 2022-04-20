import {Erd} from "element-resize-detector";

declare module 'vue/types/vue' {
    interface Vue {
        $elementResizeDetectorMaker: Erd;
    }
}
