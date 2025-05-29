<template>
    <v-container class="py-12">
        <SectionTitle title="How It Works" subtitle="Simple steps to get started"/>

        <v-row align="center">
            <v-col cols="12" md="6">
                <v-img src="https://cdn.pixabay.com/photo/2017/07/31/11/44/laptop-2557576_1280.jpg" max-height="400"
                    contain class="rounded-lg"></v-img>
            </v-col>
            <v-col cols="12" md="6">
                <v-timeline align-top dense>
                    <v-timeline-item v-for="(step, i) in steps" :key="i" :color="'green darken-' + (i % 3 + 1)" small>
                        <div>
                            <h3 class="text-h6 font-weight-bold mb-2">
                                {{ step.title }}
                            </h3>
                            <p class="text-body-1 text-grey text--darken-1">
                                {{ step.description }}
                            </p>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SectionTitle from '@/components/landing/SectionTitle.vue'
export default {
    name: 'HowItWorksSection',
    components: {
        SectionTitle
    },
    props: {
        steps: {
            type: Array,
            required: true
        }
    }
}
</script>
