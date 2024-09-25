<template>
  <v-container class="d-flex justify-center align-center register-container">
    <v-card class="pa-5" max-width="400" elevation="10">
      <v-card-title class="text-h5">Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="username"
            label="Username"
            required
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            outlined
            dense
          ></v-text-field>
          <v-btn type="submit" color="primary" class="mt-4" block>Register</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="goToLogin">Already have an account? Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['register']),
    async register() {
      await this.register({
        username: this.username,
        email: this.email,
        password: this.password,
      });
      this.$router.push('/cluster-management');
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register-container {
  height: 100vh;
  /* background: url('/path/to/your/background.jpg') no-repeat center center; */
  background-size: cover;
}

.v-card {
  border-radius: 10px;
}

.v-btn {
  font-weight: bold;
}

.v-text-field {
  margin-bottom: 20px;
}
</style>