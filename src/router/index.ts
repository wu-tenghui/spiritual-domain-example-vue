import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    VueRoute,
    routeBuilder
} from './route-builder';

Vue.use(VueRouter);

const vueRouter: VueRouter = new VueRouter({mode: 'history', base: process.env.BASE_URL});
export default vueRouter;

let routes: VueRoute[];

vueRouter.beforeEach(async (to, from, next) => {
    if (!routes) {
        if ('/' === to.path || 'root' === to.name) {
            routes = await routeBuilder.routes();
            window.localStorage.setItem('ActiveRouteListString', JSON.stringify(routes));
        } else {
            const activeRouteListString = window.localStorage.getItem('ActiveRouteListString');
            if (activeRouteListString) {
                routes = JSON.parse(activeRouteListString);
            } else {
                routes = await routeBuilder.routes();
                window.localStorage.setItem('ActiveRouteListString', JSON.stringify(routes));
            }
        }
        vueRouter.addRoutes(routeBuilder.build(routes));
        const location: any = {...to, replace: true};
        next(location);
    } else {
        next();
    }
});

vueRouter.afterEach(() => {
    window.scrollTo(0, 0);
});
