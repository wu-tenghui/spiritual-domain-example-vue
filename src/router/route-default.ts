import {VueRoute} from './route-builder';

export const routeDefault: VueRoute[] = [
    {
        routeName: 'root',
        routePath: '/',
        redirect: '/main',
    },
    {
        routeName: 'main',
        routePath: '/main',
        componentName: 'main',
    },
];
