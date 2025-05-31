<template>
  <v-row class="mb-6">
    <v-col cols="12" sm="6" md="3">
      <v-card class="mx-auto" elevation="2">
        <v-card-text class="d-flex flex-column align-center">
          <v-icon size="48" color="green-darken-1" class="mb-2">mdi-format-list-checks</v-icon>
          <span class="text-h4 font-weight-bold">{{ stats.total }}</span>
          <span class="text-subtitle-1 text-grey">Total Tasks</span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card class="mx-auto" elevation="2">
        <v-card-text class="d-flex flex-column align-center">
          <v-icon size="48" color="amber-darken-2" class="mb-2">mdi-progress-clock</v-icon>
          <span class="text-h4 font-weight-bold">{{ stats.inProgress }}</span>
          <span class="text-subtitle-1 text-grey">In Progress</span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card class="mx-auto" elevation="2">
        <v-card-text class="d-flex flex-column align-center">
          <v-icon size="48" color="green" class="mb-2">mdi-check-circle</v-icon>
          <span class="text-h4 font-weight-bold">{{ stats.completed }}</span>
          <span class="text-subtitle-1 text-grey">Completed</span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card class="mx-auto" elevation="2">
        <v-card-text class="d-flex flex-column align-center">
          <v-icon size="48" color="red-darken-1" class="mb-2">mdi-clock-alert</v-icon>
          <span class="text-h4 font-weight-bold">{{ stats.overdue }}</span>
          <span class="text-subtitle-1 text-grey">Overdue</span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'StatCards',
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>
