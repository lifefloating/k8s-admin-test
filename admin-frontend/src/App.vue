<template>
  <div id="app">
    <router-view></router-view>
    <!-- <UserRegister />
    <ApplicationDeployment />
    <ClusterManagement />
    <KubectlInterface />
    <NodeManagement /> -->
    <UserLogin />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserLogin from './components/UserLogin.vue';
// import UserRegister from './components/UserRegister.vue';
// import ApplicationDeployment from './components/ApplicationDeployment.vue';
// import ClusterManagement from './components/ClusterManagement.vue';
// import KubectlInterface from './components/KubectlInterface.vue';
// import NodeManagement from './components/NodeManagement.vue';

export default defineComponent({
  name: 'App',
  components: {
    UserLogin,
    // UserRegister,
    // ApplicationDeployment,
    // ClusterManagement,
    // KubectlInterface,
    // NodeManagement,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>