<template>
    <div>
      <h1>Node Management View</h1>
      <!-- 使用导入的 NodeManagement 组件 -->
      <NodeManagement />
    </div>
  </template>
  
  <script>
  // 导入 components 目录下的 NodeManagement 组件
  import NodeManagement from '../components/NodeManagement.vue';
  
  export default {
    name: 'NodeManagementView',
    components: {
      NodeManagement,
    },
  };
  </script>
  
  <style scoped>
  /* 添加一些样式 */
  </style>