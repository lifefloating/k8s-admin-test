<template>
  <div id="app">
    <router-view></router-view>
    <UserRegister />
    <ApplicationDeployment />
    <ClusterManagement />
    <KubectlInterface />
    <NodeManagement />
    <UserLogin />
  </div>
</template>

<script>
import UserRegister from './components/UserRegister.vue'
import ApplicationDeployment from './components/ApplicationDeployment.vue'
import ClusterManagement from './components/ClusterManagement.vue'
import KubectlInterface from './components/KubectlInterface.vue'
import UserLogin from './components/UserLogin.vue'
import NodeManagement from './components/NodeManagement.vue'

export default {
  name: 'App',
  components: {
    UserRegister,
    UserLogin,
    ApplicationDeployment,
    ClusterManagement,
    KubectlInterface,
    NodeManagement,
  }
}
</script>

<style>
/* 添加一些基本样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
