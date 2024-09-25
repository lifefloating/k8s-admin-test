<template>
  <div>
    <h1>Cluster Management View</h1>
    <ClusterManagement />
  </div>
</template>

<script>
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