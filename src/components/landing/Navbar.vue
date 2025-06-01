<template>
  <v-app-bar
    color="white"
    flat
    :elevation="scrolled ? 4 : 0"
    class="px-4 transition-smooth"
    :class="{ 'navbar-scrolled': scrolled }"
  >
    <div class="d-flex align-center">
      <router-link to="/" class="text-decoration-none d-flex align-center">
        <v-icon color="green-darken-1" size="32" class="mr-2">mdi-check-circle</v-icon>
        <span class="text-h5 font-weight-bold text-green-darken-1">Taskr</span>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <!-- Desktop Navigation -->
    <div class="d-none d-md-flex">
      <v-btn
        v-for="(item, index) in navItems"
        :key="index"
        variant="text"
        class="text-body-1 font-weight-medium mx-2"
        @click="scrollToSection(item.target)"
      >
        {{ item.title }}
      </v-btn>
    </div>

    <v-spacer class="d-none d-md-block"></v-spacer>

    <!-- Authentication Buttons (when NOT logged in) -->
    <div v-if="!isLoggedIn" class="d-none d-md-flex align-center">
      <v-btn color="grey-darken-1" variant="text" class="mr-2" @click="$emit('login')">
        Sign In
      </v-btn>
      <v-btn color="green-darken-1" class="text-white" @click="$emit('signup')">
        Sign Up
      </v-btn>
    </div>

    <!-- User Menu (when logged in) -->
    <div v-else class="d-none d-md-flex">
      <v-btn
        color="green-darken-1"
        variant="text"
        prepend-icon="mdi-view-dashboard-outline"
        @click="navigateToDashboard"
      >
        Dashboard
      </v-btn>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="ml-2">
            <v-avatar size="36" color="green-lighten-4">
              <v-icon color="green-darken-2">mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item>
            <v-list-item-title class="text-subtitle-2">
              {{ userName || "User" }}
            </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            @click="navigateToDashboard"
            prepend-icon="mdi-view-dashboard-outline"
          >
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('logout')" prepend-icon="mdi-logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- Mobile Menu Button -->
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="end" width="280">
      <v-list>
        <v-list-item v-if="isLoggedIn" class="text-center pa-4">
          <template v-slot:prepend>
            <v-avatar color="green-lighten-4">
              <v-icon color="green-darken-2">mdi-account</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title class="text-h6">{{ userName || "User" }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-else class="text-center pa-4">
          <v-list-item-title class="text-h6">Menu</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          @click="
            scrollToSection(item.target);
            drawer = false;
          "
          :title="item.title"
          class="my-1"
        ></v-list-item>

        <v-divider class="my-2"></v-divider>

        <!-- Mobile Auth Options -->
        <template v-if="!isLoggedIn">
          <v-list-item
            @click="
              $emit('login');
              drawer = false;
            "
          >
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-btn
              block
              color="green-darken-1"
              class="text-white"
              @click="
                $emit('signup');
                drawer = false;
              "
            >
              Sign Up
            </v-btn>
          </v-list-item>
        </template>

        <!-- Mobile Dashboard & Logout Options -->
        <template v-else>
          <v-list-item
            @click="
              navigateToDashboard;
              drawer = false;
            "
            prepend-icon="mdi-view-dashboard-outline"
          >
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click="
              $emit('logout');
              drawer = false;
            "
            prepend-icon="mdi-logout"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";

export default {
  name: "Navbar",
  emits: ["login", "signup", "logout"],
  data() {
    return {
      drawer: false,
      scrolled: false,
      navItems: [
        { title: "Features", target: "features" },
        { title: "How It Works", target: "how-it-works" },
        { title: "Testimonials", target: "testimonials" },
      ],
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    isLoggedIn() {
      return this.authStore.isAuthenticated;
    },
    userName() {
      return this.authStore.user?.name;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },
    scrollToSection(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    navigateToDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.transition-smooth {
  transition: all 0.3s ease;
}

.navbar-scrolled {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9) !important;
}
</style>
