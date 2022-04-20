import Vue from 'vue';

import Welcome from './components/welcome.vue';

export const registry = {

    install(vue: typeof Vue): void {
        vue.component('welcome', Welcome);
    },

};
