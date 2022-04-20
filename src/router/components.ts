import {Component} from 'vue-router/types/router';

export const components: { [componentName: string]: Component } = {
    main: () => import('@/views/main.vue'),
};
