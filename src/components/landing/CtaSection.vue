<template>
    <div id="signup" class="bg-green darken-1 py-12">
        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="12" md="7" class="text-center text-md-left">
                    <h2 class="text-h3 font-weight-bold text-white mb-3">
                        Ready to get started?
                    </h2>
                    <p class="text-h6 text-white mb-0">
                        Join thousands of teams already using our platform
                    </p>
                </v-col>
                <v-col cols="12" md="5" class="text-center text-md-right">
                    <v-btn x-large color="white" class="text-capitalize text-green text--darken-1" elevation="2"
                        @click="$emit('signup')">
                        Start Your Free Trial
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'CtaSection',
    emits: ['signup'],
}
</script>
