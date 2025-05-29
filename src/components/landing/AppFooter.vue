<template>
    <v-footer class="white">
        <v-container>
            <v-row>
                <v-col cols="12" md="4" class="mb-6 mb-md-0">
                    <h3 class="text-h6 font-weight-bold mb-4">Company Name</h3>
                    <p class="text-body-2 grey--text text--darken-1 mb-4">
                        We're on a mission to help teams work more efficiently and achieve their goals.
                    </p>
                    <div class="d-flex">
                        <v-btn icon class="mr-2" color="green darken-1">
                            <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn icon class="mr-2" color="green darken-1">
                            <v-icon>mdi-twitter</v-icon>
                        </v-btn>
                        <v-btn icon class="mr-2" color="green darken-1">
                            <v-icon>mdi-linkedin</v-icon>
                        </v-btn>
                        <v-btn icon color="green darken-1">
                            <v-icon>mdi-instagram</v-icon>
                        </v-btn>
                    </div>
                </v-col>

                <v-col cols="6" md="2">
                    <h3 class="text-subtitle-1 font-weight-bold mb-4">Product</h3>
                    <v-list dense nav class="pa-0 transparent">
                        <v-list-item v-for="(link, i) in footerLinks.product" :key="i" link class="px-0">
                            <v-list-item-content>
                                <v-list-item-title class="text-body-2 grey--text text--darken-1">
                                    {{ link }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="6" md="2">
                    <h3 class="text-subtitle-1 font-weight-bold mb-4">Company</h3>
                    <v-list dense nav class="pa-0 transparent">
                        <v-list-item v-for="(link, i) in footerLinks.company" :key="i" link class="px-0">
                            <v-list-item-content>
                                <v-list-item-title class="text-body-2 grey--text text--darken-1">
                                    {{ link }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="6" md="2">
                    <h3 class="text-subtitle-1 font-weight-bold mb-4">Resources</h3>
                    <v-list dense nav class="pa-0 transparent">
                        <v-list-item v-for="(link, i) in footerLinks.resources" :key="i" link class="px-0">
                            <v-list-item-content>
                                <v-list-item-title class="text-body-2 grey--text text--darken-1">
                                    {{ link }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="6" md="2">
                    <h3 class="text-subtitle-1 font-weight-bold mb-4">Legal</h3>
                    <v-list dense nav class="pa-0 transparent">
                        <v-list-item v-for="(link, i) in footerLinks.legal" :key="i" link class="px-0">
                            <v-list-item-content>
                                <v-list-item-title class="text-body-2 grey--text text--darken-1">
                                    {{ link }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <div class="text-center text-body-2 grey--text text--darken-1">
                &copy; {{ new Date().getFullYear() }} Company Name. All rights reserved.
            </div>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: 'AppFooter',
    props: {
        footerLinks: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.transparent {
    background-color: transparent !important;
}
</style>
