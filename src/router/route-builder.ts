import {RouteConfig} from 'vue-router';
import {routeDefault} from './route-default';
import {components} from './components';

export interface VueRoute {
    routeName: string;
    routePath: string;
    redirect?: string;
    componentName?: string;
    children?: VueRoute[];
}

export const routeBuilder = {

    async routes(): Promise<VueRoute[]> {
        return await Promise.resolve(routeDefault);
    },

    build(routes: VueRoute[]): RouteConfig[] {
        const routeConfigList = [];
        for (const route of routes) {
            const routeConfig: RouteConfig = {
                name: route.routeName,
                path: route.routePath,
            };
            if (route.redirect) {
                routeConfig.redirect = route.redirect;
            } else if (route.componentName) {
                routeConfig.component = components[route.componentName];
            } else {
                throw new Error('路由构建失败。redirect和componentName必须存在一个！');
            }
            if (route.children) {
                routeConfig.children = routeBuilder.build(route.children);
            }
            routeConfigList.push(routeConfig);
        }
        return routeConfigList;
    },

};
