<template>
    <div>
        <hero-section @scroll-to-features="scrollToFeatures" @signup="navigateToRegister" />

        <stats-section :stats="landingData.stats" />

        <features-section :features="landingData.features" />

        <how-it-works-section :steps="landingData.steps" />

        <testimonials-section :testimonial-slides="landingData.testimonialSlides" />

        <cta-section @signup="navigateToRegister" />

        <app-footer :footer-links="landingData.footerLinks" />
    </div>
</template>

<script>
import HeroSection from '@/components/landing/HeroSection.vue'
import StatsSection from '@/components/landing/StatsSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import HowItWorksSection from '@/components/landing/HowItWorksSection.vue'
import TestimonialsSection from '@/components/landing/TestimonialsSection.vue'
import CtaSection from '@/components/landing/CtaSection.vue'
import AppFooter from '@/components/landing/AppFooter.vue'
import landingData from '@/assets/data/landingData'

export default {
    name: 'LandingPage',
    components: {
        HeroSection,
        StatsSection,
        FeaturesSection,
        HowItWorksSection,
        TestimonialsSection,
        CtaSection,
        AppFooter
    },

    data() {
        return {
            landingData
        }
    },

    methods: {
        scrollToFeatures() {
            const element = document.getElementById('features');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },

        navigateToRegister() {
            this.$router.push('/register');
        }
    }
}
</script>
