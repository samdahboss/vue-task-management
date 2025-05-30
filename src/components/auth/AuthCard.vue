<template>
  <v-container fluid class="fill-height bg-grey-lighten-3">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6 elevation-10">
          <v-card-title class="text-h4 text-center mb-4">{{ title }}</v-card-title>
          <slot></slot>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AuthCard",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.v-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>