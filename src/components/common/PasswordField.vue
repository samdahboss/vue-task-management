<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :rules="rules"
    :label="label"
    prepend-inner-icon="mdi-lock"
    :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
    :type="visible ? 'text' : 'password'"
    @click:append-inner="$emit('toggle-visibility')"
    variant="outlined"
    required
    :class="cssClass"
  />
</template>

<script>
export default {
  name: "PasswordField",
  props: {
    modelValue: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: "Password"
    },
    visible: {
      type: Boolean,
      default: false
    },
    cssClass: {
      type: String,
      default: "mb-3"
    }
  },
  emits: ["update:modelValue", "toggle-visibility"]
};
</script>