<template>
    <v-parallax src="https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_1280.jpg" height="600">
        <v-container class="fill-height">
            <v-row align="center" justify="center">
                <v-col cols="12" md="8" class="text-center">
                    <h1 class="text-h2 font-weight-bold text-white mb-4">
                        Transform Your Workflow
                    </h1>
                    <p class="text-h5 text-white mb-8">
                        The all-in-one platform for teams to manage tasks, projects, and goals
                    </p>
                    <v-btn x-large color="green darken-1" class="text-uppercase text-white mr-4" elevation="2"
                        @click="$emit('scroll-to-features')">
                        Explore Features
                    </v-btn>
                    <v-btn x-large outlined class="text-uppercase" @click="$emit('signup')">
                        Get Started
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-parallax>
</template>

<script>
export default {
    name: 'HeroSection',
    emits: ['scroll-to-features', 'signup']
}
</script>
