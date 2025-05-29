import { createRouter, createWebHistory } from "vue-router";
import AuthView from "@/views/AuthView.vue";
import DashboardView from "@/views/DashboardView.vue"; // Import the dashboard component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
  ],
});

export default router;
