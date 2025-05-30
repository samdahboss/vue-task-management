import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
  ],
});

// Navigation guard

//I need to authenticate before showing the dashboard route to any user
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Check localStorage first, then update store if needed
  const token = localStorage.getItem('auth-token');
  const isAuthenticated = token ? true : authStore.isAuthenticated;
  
  // If token exists but store isn't authenticated, restore the session
  if (token && !authStore.isAuthenticated) {
    authStore.restoreSession();
  }

  // Check the route meta for authentication requirements
  if (to.meta.requiresGuest && isAuthenticated) {
    next("/dashboard");
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
