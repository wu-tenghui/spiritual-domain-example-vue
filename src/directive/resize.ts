import Vue, {PluginObject} from 'vue';
import {DirectiveBinding} from "vue/types/options";

import elementResizeDetectorMaker from 'element-resize-detector';

export class ElementResizeDetectorDirective implements PluginObject<{}> {

    public elementResizeDetectorMaker: elementResizeDetectorMaker.Erd = elementResizeDetectorMaker();

    install(): void {
        const elementResizeDetectorMaker = this.elementResizeDetectorMaker;
        Vue.directive('resize', {
            bind(element: HTMLElement, binding: DirectiveBinding) {
                elementResizeDetectorMaker.listenTo(element, binding.value);
            },
            unbind(element: HTMLElement) {
                elementResizeDetectorMaker.uninstall(element);
            }
        });
    }

}

export default new ElementResizeDetectorDirective();
