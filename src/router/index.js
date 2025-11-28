import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./admin.routes";
import authRoutes from "./auth.routes";
import { handleRouteGuard } from "./router.guard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    authRoutes,
    adminRoutes,
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/pages/errors/PageNotFound.vue"),
    },
  ],
});

router.beforeEach(handleRouteGuard);

export default router;
