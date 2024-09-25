<template>
    <div>
      <h2>Application Deployment</h2>
      <form @submit.prevent="handleDeployApplication">
        <input v-model="appName" placeholder="Application Name" required />
        <input v-model="nodeId" placeholder="Node ID" required />
        <button type="submit" :disabled="loading">Deploy Application</button>
      </form>
      <div v-if="loading">Deploying application...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul>
        <li v-for="app in applications" :key="app.id">
          {{ app.name }} (Node: {{ app.nodeId }})
          <button @click="handleDeleteApplication(app.id)" :disabled="loading">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        appName: '',
        nodeId: '',
        loading: false,
        error: null,
      };
    },
    computed: {
      ...mapState(['applications']),
    },
    methods: {
      ...mapActions(['fetchApplications', 'deployApplication', 'deleteApplication']),
      async handleDeployApplication() {
        if (!this.validateInputs()) {
          this.error = 'Invalid input';
          return;
        }
  
        this.loading = true;
        this.error = null;
        try {
          await this.deployApplication({ name: this.appName, nodeId: this.nodeId });
          this.appName = '';
          this.nodeId = '';
          await this.fetchApplications();
        } catch (err) {
          this.error = 'Failed to deploy application';
        } finally {
          this.loading = false;
        }
      },
      async handleDeleteApplication(appId) {
        this.loading = true;
        this.error = null;
        try {
          await this.deleteApplication(appId);
          await this.fetchApplications();
        } catch (err) {
          this.error = 'Failed to delete application';
        } finally {
          this.loading = false;
        }
      },
      validateInputs() {
        return this.appName.trim() !== '' && this.nodeId.trim() !== '';
      },
    },
    created() {
      this.fetchApplications();
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>