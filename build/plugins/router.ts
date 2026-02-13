import type { RouteMeta } from 'vue-router';
import ElegantVueRouter from '@elegant-router/vue/vite';
import type { RouteKey } from '@elegant-router/types';

export function setupElegantRouter() {
  return ElegantVueRouter({
    layouts: {
      base: 'src/layouts/base-layout/index.vue',
      blank: 'src/layouts/blank-layout/index.vue'
    },
    routePathTransformer(routeName, routePath) {
      const key = routeName as RouteKey;

      if (key === 'login') {
        const modules: UnionKey.LoginModule[] = ['pwd-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'];

        const moduleReg = modules.join('|');

        return `/login/:module(${moduleReg})?`;
      }

      return routePath;
    },
    onRouteMetaGen(routeName) {
      const key = routeName as RouteKey;

      const constantRoutes: RouteKey[] = ['login', '403', '404', '500'];

      const meta: Partial<RouteMeta> = {
        title: key,
        i18nKey: `route.${key}` as App.I18n.I18nKey
      };

      if (key === 'management') {
        meta.icon = 'mdi:settings';
        meta.order = 10;
        meta.constant = true;
      }

      if (key === 'management_user') {
        meta.icon = 'mdi:account-group';
        meta.order = 1;
        meta.constant = true;
      }

      if (key === 'management_user-operate') {
        meta.hideInMenu = true;
        meta.constant = true;
        meta.activeMenu = 'management_user';
      }

      if (key === 'sms') {
        meta.icon = 'material-symbols:sms-outline';
        meta.order = 9;
      }

      if (key === 'sms_config') {
        meta.icon = 'material-symbols:settings-outline';
        meta.order = 1;
      }

      if (key === 'home') {
        meta.constant = true;
      }

      if (constantRoutes.includes(key)) {
        meta.constant = true;
      }

      return meta;
    }
  });
}
