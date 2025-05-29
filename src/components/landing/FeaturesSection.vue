<template>
  <div id="features" class="green lighten-5 py-12">
    <v-container>
      <SectionTitle
        title="Powerful Features"
        subtitle="Everything you need to manage your projects efficiently"
      />

      <v-row>
        <v-col
          v-for="(feature, index) in features"
          :key="index"
          cols="12"
          md="4"
          class="mb-6"
        >
          <v-card class="pa-4 h-100 d-flex flex-column" height="100%">
            <div class="d-flex justify-center mb-4">
              <v-icon :icon="feature.icon" size="64" color="green-darken-1"></v-icon>
            </div>
            <h3 class="text-h5 font-weight-bold text-center mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-body-1 text-grey text--darken-1 text-center mb-4">
              {{ feature.description }}
            </p>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="green darken-1"
              class="text-capitalize align-self-center mt-auto"
            >
              Learn More
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SectionTitle from "@/components/landing/SectionTitle.vue";

export default {
  name: "FeaturesSection",
  components: {
    SectionTitle,
  },
  props: {
    features: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: transform 0.3s;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>
