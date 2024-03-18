import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: () => import("../pages/AntiShakingThrottling/index.vue"),
  },
  {
    path: "/textCopy",
    component: () => import("../pages/TextCopy/index.vue"),
  },
  {
    path: "/colorConversion",
    component: () => import("../pages/ColorConversion/index.vue"),
  },
  {
    path: "/timeFormat",
    component: () => import("../pages/TimeFormat/index.vue"),
  },
  {
    path: "/file",
    component: () => import("../pages/Files/index.vue"),
  },
  {
    path: "/rotation",
    component: () => import("../pages/Rotation/index.vue"),
  },
  {
    path: "/test",
    component: () => import("../pages/Test/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
/**
 * 路由守卫
 */
router.beforeEach((to, from) => {
  // 返回 false 以取消导航
  return true;
});

export default router;
