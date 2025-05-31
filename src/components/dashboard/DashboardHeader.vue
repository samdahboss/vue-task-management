<template>
  <v-row class="mb-6">
    <v-col cols="12" md="8">
      <h1 class="text-h4 font-weight-bold">Dashboard</h1>
      <p class="text-subtitle-1 text-grey">
        Welcome back, {{ userName?.split(" ")[0] || "User" }}
      </p>
    </v-col>
    <v-col cols="12" md="4" class="d-flex justify-end align-center">
      <v-btn
        color="green-darken-1"
        prepend-icon="mdi-plus"
        @click="$emit('new-task')"
        class="text-white"
      >
        New Task
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DashboardHeader',
  props: {
    userName: {
      type: String,
      default: null
    }
  },
  emits: ['new-task']
}
</script>
