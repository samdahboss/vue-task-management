<template>
  <div class="green lighten-5 py-12">
    <v-container>
      <SectionTitle
        title="What Our Customers Say"
        subtitle="Trusted by thousands of teams worldwide"
      />

      <v-row>
        <v-col cols="12">
          <v-carousel hide-delimiters :show-arrows="false" height="auto" interval="8000">
            <v-carousel-item v-for="(slide, i) in testimonialSlides" :key="i">
              <v-row>
                <v-col v-for="(testimonial, j) in slide" :key="j" cols="12" md="4">
                  <v-card class="mx-2 pa-6" height="100%" elevation="2">
                    <div class="d-flex mb-4">
                      <v-rating
                        :value="testimonial.rating"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="18"
                      ></v-rating>
                    </div>
                    <p class="text-body-1 font-italic mb-4">"{{ testimonial.text }}"</p>
                    <div class="d-flex align-center">
                      <v-avatar size="48" class="mr-4">
                        <v-img :src="testimonial.avatar"></v-img>
                      </v-avatar>
                      <div>
                        <div class="font-weight-bold">{{ testimonial.name }}</div>
                        <div class="text-caption grey--text">
                          {{ testimonial.position }}
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SectionTitle from "./SectionTitle.vue";
export default {
  name: "TestimonialsSection",
  components: {
    SectionTitle,
  },
  props: {
    testimonialSlides: {
      type: Array,
      required: true,
    },
  },
};
</script>
