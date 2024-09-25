<template>
    <div>
      <h1>Node Management</h1>
      <button @click="addNode">Add Node</button>
      <table>
        <thead>
          <tr>
            <th>Node Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="node in nodes" :key="node.id">
            <td>{{ node.name }}</td>
            <td>{{ node.status }}</td>
            <td>
              <button @click="viewNode(node.id)">View</button>
              <button @click="removeNode(node.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NodeManagement',
    data() {
      return {
        nodes: [
          // 示例数据
          { id: 1, name: 'Node 1', status: 'Running' },
          { id: 2, name: 'Node 2', status: 'Stopped' },
        ],
      };
    },
    methods: {
      addNode() {
        // 添加节点的逻辑
        console.log('Adding new node');
      },
      viewNode(id) {
        // 查看节点详情的逻辑
        console.log(`Viewing node ${id}`);
      },
      removeNode(id) {
        // 移除节点的逻辑
        console.log(`Removing node ${id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* 添加一些样式 */
  </style>