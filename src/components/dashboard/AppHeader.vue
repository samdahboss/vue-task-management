<template>
  <v-app-bar color="green-darken-1" dark app>
    <router-link to="/" class="d-flex align-center text-decoration-none text-white pa-6">
      <v-icon class="mr-2">mdi-check-circle</v-icon>
      <v-toolbar-title>Taskr</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-avatar size="40" class="mr-3">
      <v-img :src="'https://randomuser.me/api/portraits/men/83.jpg'" alt="Avatar"></v-img>
    </v-avatar>
    <div class="d-none d-sm-flex align-center mr-4">
      <div class="text-body-1">{{ userName || "User" }}</div>
    </div>
    <v-btn icon @click="$emit('logout')">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    userName: {
      type: String,
      default: null,
    },
  },
  emits: ["logout"],
};
</script>
