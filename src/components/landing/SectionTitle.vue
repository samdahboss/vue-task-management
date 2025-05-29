<template>
    <v-row justify="center" class="mb-10">
        <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold text-green text--darken-2 mb-3">
                {{ title }}
            </h2>
            <p class="text-subtitle-1 text-grey text--darken-2">
                {{ subtitle }}
            </p>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "section title",
    props: {
        title: String,
        subtitle: String
    }
}
</script>

<style lang="scss" scoped></style>