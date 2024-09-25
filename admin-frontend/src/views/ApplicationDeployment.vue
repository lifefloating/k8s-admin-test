<template>
    <div>
      <h1>Application Deployment View</h1>
      <ApplicationDeployment />
    </div>
  </template>
  
  <script>
  import ApplicationDeployment from '../components/ApplicationDeployment.vue';
  
  export default {
    name: 'ApplicationDeploymentView',
    components: {
      ApplicationDeployment,
    },
  };
  </script>
  
  <style scoped>
  /* 添加一些样式 */
  </style>