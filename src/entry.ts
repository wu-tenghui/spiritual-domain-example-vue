import Vue from 'vue'
import App from './app'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

/**
 * echarts
 */
import echarts from 'echarts';

Vue.prototype.$echarts = echarts;

/**
 * 全局引入相关组件
 */
import {registry} from "./registry";

Vue.use(registry);

/**
 * 添加 Ant Design of Vue 组件
 */
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import './theme.less';

Vue.use(Antd);

/**
 * 定制 Ant Design of Vue 语言
 */
import language from 'ant-design-vue/lib/locale-provider/zh_CN';

import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

/**
 * 监听元素大小改变事件
 */
import resize from "@/directive/resize";

Vue.use(resize);

Vue.prototype.$elementResizeDetectorMaker = resize.elementResizeDetectorMaker;

/**
 * 创建 Vue 实例
 */
export const vueApp: Vue = new Vue({
    router,
    store,
    data: {
        language,
    },
    components: {App},
    template: '<a-config-provider :locale="language"><App/></a-config-provider>',
});
vueApp.$mount('#app');
