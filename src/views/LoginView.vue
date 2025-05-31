<template>
  <AuthCard title="Login">
    <FormErrorMessage v-if="error" :message="error"></FormErrorMessage>
    <v-form v-model="isFormValid" ref="form" @submit.prevent="login">
      <v-text-field
        v-model="user.email"
        label="Email"
        :rules="emailRules"
        required
        outlined
      ></v-text-field>

      <PasswordField
        v-model="user.password"
        :visible="showPassword"
        :rules="passwordRules"
        @toggle-visibility="showPassword = !showPassword"
        required
      ></PasswordField>

      <v-btn
        type="submit"
        block
        color="green-darken-1"
        size="large"
        :loading="loading"
        :disabled="!isFormValid"
        class="text-white mb-4"
      >
        Login
      </v-btn>
    </v-form>

    <div class="text-center">
      <p class="text-body-1 mb-2">Don't have an account?</p>
      <router-link to="/register"
        ><v-btn variant="text" color="green-darken-1"> Sign Up </v-btn></router-link
      >
    </div>
  </AuthCard>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import AuthCard from "@/components/auth/AuthCard.vue";
import FormErrorMessage from "@/components/common/FormErrorMessage.vue";
import PasswordField from "@/components/common/PasswordField.vue";

export default {
  components: {
    AuthCard,
    FormErrorMessage,
    PasswordField,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      isFormValid: false,
      loading: false,
      error: "",
      showPassword: false,
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  computed: {
    emailRules() {
      return [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ];
    },
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      try {
        const authStore = useAuthStore();
        const user = await authStore.login(this.user);
        console.log("User logged in:", user);
        // if (user) {
        //   this.$router.push("/dashboard");
        // }
      } catch (error) {
        this.error = error.message || "Login failed. Please try again.";
        console.error("Login error:", error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
