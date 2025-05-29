<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="4" class="text-center" v-for="{ label, value, unit } in stats" :key="label">
        <div class="text-h2 font-weight-bold text-green text--darken-1">
          {{ value }}{{ unit }}
        </div>
        <div class="text-h6 text-grey text--darken-1">{{ label }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "StatsSection",
  props: {
    stats: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(stat =>
          typeof stat === 'object' &&
          'label' in stat &&
          'value' in stat &&
          'unit' in stat
        );
      }
    }
  },
};
</script>
