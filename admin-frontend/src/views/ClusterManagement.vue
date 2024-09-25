<template>
    <div>
      <h1>Cluster Management View</h1>
      <!-- 使用导入的 ClusterManagement 组件 -->
      <ClusterManagement />
    </div>
  </template>
  
  <script>
  // 导入 components 目录下的 ClusterManagement 组件
  import ClusterManagement from '../components/ClusterManagement.vue';
  
  export default {
    name: 'ClusterManagementView',
    components: {
      ClusterManagement,
    },
  };
  </script>
  
  <style scoped>
  /* 添加一些样式 */
  </style>