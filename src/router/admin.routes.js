export default {
  component: () => import("@/layouts/AdminLayout.vue"),
  redirect: { name: "dashboard.index" },
  path: "/",
  children: [
    {
      path: "dashboard",
      name: "dashboard.index",
      component: () => import("@/pages/admin/dashboard/Dashboard.vue"),
      meta: { title: "Dashboard" },
    },

    {
      path: "roles",
      name: "roles.index",
      component: () => import("@/pages/admin/roles/RolesIndex.vue"),
      meta: { permission: "roles.index", title: "Papéis" },
    },

    {
      path: "users",
      name: "users.index",
      component: () => import("@/pages/admin/users/UsersIndex.vue"),
      meta: { permission: "users.index", title: "Usuários" },
    },

    {
      path: "profile",
      name: "profile",
      component: () => import("@/pages/admin/profile/Profile.vue"),
      meta: { title: "Minha Conta" },
    },
  ],
  meta: { auth: true },
};
