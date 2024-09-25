<template>
  <div>
    <h1>Login</h1>
    <p>Please login to continue.</p>
    <UserLogin />
  </div>
</template>

<script>
import UserLogin from '../components/UserLogin.vue';

export default {
  name: 'UserLogin',
  components: {
    UserLogin,
  },
};
</script>

<style scoped>
/* 添加一些样式 */
</style>