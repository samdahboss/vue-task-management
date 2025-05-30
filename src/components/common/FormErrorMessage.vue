<template>
  <p v-if="message" class="text-red text-center text-body-2 mb-4">
    {{ message }}
    <v-icon small class="ml-1 cursor-pointer" @click="$emit('clear')">
      mdi-close-circle
    </v-icon>
  </p>
</template>

<script>
export default {
  name: "FormErrorMessage",
  props: {
    message: {
      type: String,
      default: ""
    }
  },
  emits: ["clear"]
};
</script>