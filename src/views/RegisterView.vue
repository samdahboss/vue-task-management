<template>
  <AuthCard title="Create Account">
    <v-form @submit.prevent="register" ref="form" v-model="isFormValid">
      <FormErrorMessage :message="error" @clear="error = ''" />

      <v-text-field
        v-model="user.name"
        :rules="nameRules"
        label="Full Name"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        required
        class="mb-3"
      />

      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="Email"
        prepend-inner-icon="mdi-email"
        variant="outlined"
        required
        class="mb-3"
      />

      <PasswordField
        v-model="user.password"
        :rules="passwordRules"
        label="Password"
        :visible="showPassword"
        @toggle-visibility="showPassword = !showPassword"
      />

      <PasswordField
        v-model="confirmPassword"
        :rules="confirmPasswordRules"
        label="Confirm Password"
        :visible="showConfirmPassword"
        @toggle-visibility="showConfirmPassword = !showConfirmPassword"
        css-class="mb-6"
      />

      <v-btn
        type="submit"
        block
        color="green-darken-1"
        size="large"
        :loading="loading"
        :disabled="!isFormValid"
        class="text-white mb-4"
      >
        Create Account
      </v-btn>
    </v-form>

    <div class="text-center">
      <p class="text-body-1 mb-2">Already have an account?</p>
      <v-btn variant="text" color="green-darken-1" @click="navigateToLogin">
        Sign In
      </v-btn>
    </div>
  </AuthCard>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import AuthCard from "@/components/auth/AuthCard.vue";
import FormErrorMessage from "@/components/common/FormErrorMessage.vue";
import PasswordField from "@/components/common/PasswordField.vue";

export default {
  name: "RegisterView",
  components: {
    AuthCard,
    FormErrorMessage,
    PasswordField,
  },

  data() {
    return {
      isFormValid: false,
      loading: false,
      error: "",
      showPassword: false,
      showConfirmPassword: false,
      user: {
        name: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length >= 3 || "Name must be at least 3 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) =>
          /(?=.*[A-Z])/.test(v) || "Password must contain at least one uppercase letter",
        (v) => /(?=.*\d)/.test(v) || "Password must contain at least one number",
      ],
    };
  },

  computed: {
    confirmPasswordRules() {
      return [
        (v) => !!v || "Please confirm your password",
        (v) => v === this.user.password || "Passwords do not match",
      ];
    },
  },

  methods: {
    async register() {
      if (!this.$refs.form.validate()) return;

      // Create new user
      const newUser = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password, // In a real app, I'd hash this password
      };

      try {
        // Register the user in the auth store
        const authStore = useAuthStore();
        const user = await authStore.register(newUser);
        this.loading = true;

        if (user) {
          this.$router.push("/dashboard");
        }
      } catch (error) {
        this.error = error.message || "Registration failed. Please try again.";
        console.error("Registration error:", error.message);
      } finally {
        this.loading = false;
      }
    },

    navigateToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
