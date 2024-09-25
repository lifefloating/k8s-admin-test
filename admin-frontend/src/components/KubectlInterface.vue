<template>
    <div>
      <h2>Kubectl Interface</h2>
      <form @submit.prevent="executeCommand">
        <input v-model="command" placeholder="Kubectl Command" required />
        <button type="submit" :disabled="loading">Execute</button>
      </form>
      <div v-if="loading">Executing command...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <pre>{{ output }}</pre>
      <h3>Command History</h3>
      <ul>
        <li v-for="(cmd, index) in commandHistory" :key="index">{{ cmd }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        command: '',
        output: '',
        loading: false,
        error: null,
        commandHistory: [],
      };
    },
    methods: {
      ...mapActions(['executeKubectlCommand']),
      async executeCommand() {
        if (!this.validateCommand(this.command)) {
          this.error = 'Invalid kubectl command';
          return;
        }
  
        this.loading = true;
        this.error = null;
        try {
          const response = await this.executeKubectlCommand({ command: this.command });
          this.output = response.data.output;
          this.commandHistory.push(this.command);
          this.command = '';
        } catch (err) {
          this.error = 'Failed to execute command';
        } finally {
          this.loading = false;
        }
      },
      validateCommand(command) {
        // 简单的验证逻辑，可以根据需要进行扩展
        return command.startsWith('kubectl');
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>