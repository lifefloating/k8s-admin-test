<template>
  <div class="login-container">
    <v-container class="d-flex justify-center align-center">
      <v-card class="pa-5" max-width="400" elevation="10">
        <v-card-title class="text-h5">Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleLogin">
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
            <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
          </v-form>
          <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="goToRegister">Don't have an account? Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
        this.$router.push('/cluster-management');
      } catch (error) {
        this.error = error;
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: url('https://demo.kuboard.cn/sso/static/kuboard-img/logo.png') no-repeat center center;
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