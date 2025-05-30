import { defineStore } from "pinia";
import userService from "@/services/userService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  
  actions: {
    async login(userData) {
      try {
        const users = await userService.getUsers();
        const user = users.find(
          (u) => u.email === userData.email && u.password === userData.password
        );
        if (!user) {
          throw new Error("Login failed");
        }
        
        this.isAuthenticated = true;
        this.user = user;
        
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
        
        return newUser;
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    },
    
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    }
  },
});