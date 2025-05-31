import { defineStore } from "pinia";
import userService from "@/services/userService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    async login(userData) {
      try {
        const users = await userService.getUsers();
        const user = users.find(
          (u) => u.email === userData.email && u.password === userData.password
        );
        if (!user) {
          throw new Error("Invalid email or password");
        }

        this.isAuthenticated = true;
        this.user = user;
        // Store the user in localStorage for session persistence
        localStorage.setItem("auth-token", JSON.stringify(user.email));

        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async register(userData) {
      try {
        const newUser = await userService.createUser(userData);
        this.isAuthenticated = true;
        this.user = newUser;

        // Store the user in localStorage for session persistence
        localStorage.setItem("auth-token", JSON.stringify(newUser.email));

        return newUser;
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    },
    async restoreSession() {
      try {
        const token = localStorage.getItem("auth-token");
        if (!token) {
          this.isAuthenticated = false;
          this.user = null;
          return;
        }

        const userEmail = JSON.parse(token);
        const users = await userService.getUsers();
        const user = users.find((u) => u.email === userEmail);

        if (user) {
          this.isAuthenticated = true;
          this.user = user;
        } else {
          this.isAuthenticated = false;
          this.user = null;
          localStorage.removeItem("auth-token");
        }
      } catch (error) {
        console.error("Error restoring session:", error);
        this.isAuthenticated = false;
        this.user = null;
        localStorage.removeItem("auth-token");
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
});
