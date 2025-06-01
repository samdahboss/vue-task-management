<template>
  <v-layout>
    <navbar @login="navigateToLogin" @signup="navigateToRegister" />

    <v-main>
      <hero-section @scroll-to-features="scrollToFeatures" @signup="navigateToRegister" />

      <stats-section :stats="landingData.stats" />

      <features-section id="features" :features="landingData.features" />

      <how-it-works-section id="how-it-works" :steps="landingData.steps" />

      <testimonials-section
        id="testimonials"
        :testimonial-slides="landingData.testimonialSlides"
      />

      <cta-section @signup="navigateToRegister" />

      <app-footer :footer-links="landingData.footerLinks" />
    </v-main>
  </v-layout>
</template>

<script>
import HeroSection from "@/components/landing/HeroSection.vue";
import StatsSection from "@/components/landing/StatsSection.vue";
import FeaturesSection from "@/components/landing/FeaturesSection.vue";
import HowItWorksSection from "@/components/landing/HowItWorksSection.vue";
import TestimonialsSection from "@/components/landing/TestimonialsSection.vue";
import CtaSection from "@/components/landing/CtaSection.vue";
import AppFooter from "@/components/landing/AppFooter.vue";
import landingData from "@/assets/data/landingData";
import Navbar from "@/components/landing/Navbar.vue";

export default {
  name: "LandingPage",
  components: {
    HeroSection,
    StatsSection,
    FeaturesSection,
    HowItWorksSection,
    TestimonialsSection,
    CtaSection,
    AppFooter,
    Navbar,
  },

  data() {
    return {
      landingData,
    };
  },

  methods: {
    scrollToFeatures() {
      const element = document.getElementById("features");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },

    navigateToRegister() {
      this.$router.push("/register");
    },

    navigateToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
