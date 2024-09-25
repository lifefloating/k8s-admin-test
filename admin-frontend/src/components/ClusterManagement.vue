<template>
    <div>
      <h2>Cluster Management</h2>
      <form @submit.prevent="createCluster">
        <input v-model="clusterName" placeholder="Cluster Name" required />
        <button type="submit">Create Cluster</button>
      </form>
      <ul>
        <li v-for="cluster in clusters" :key="cluster.id">
          {{ cluster.name }}
          <button @click="deleteCluster(cluster.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        clusterName: '',
      };
    },
    computed: {
      ...mapState(['clusters']),
    },
    methods: {
      ...mapActions(['fetchClusters', 'createCluster', 'deleteCluster']),
      async createCluster() {
        await this.createCluster({ name: this.clusterName });
        this.clusterName = '';
        this.fetchClusters();
      },
      async deleteCluster(clusterId) {
        await this.deleteCluster(clusterId);
        this.fetchClusters();
      },
    },
    created() {
      this.fetchClusters();
    },
  };
  </script>