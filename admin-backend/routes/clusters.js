const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const Cluster = require('../models/Cluster');
const Node = require('../models/Node');
const router = new Router();

// Create a cluster
router.post('/clusters', async (ctx) => {
  const { clusterName, userId } = ctx.request.body;
  const command = `sudo docker exec -it kubeasz /bin/bash -c "kubectl create cluster ${clusterName}"`;
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      ctx.status = 500;
      ctx.body = { error: stderr };
      return;
    }
    // Save the result to the database
    const newCluster = new Cluster({ clusterName, userId, status: 'Created' });
    await newCluster.save();
    ctx.status = 201;
    ctx.body = { message: stdout, cluster: newCluster };
  });
});

// Get all clusters
router.get('/clusters', async (ctx) => {
  const clusters = await Cluster.find();
  ctx.body = { clusters };
});

// Get cluster details
router.get('/clusters/:id', async (ctx) => {
  const { id } = ctx.params;
  const cluster = await Cluster.findById(id);
  if (!cluster) {
    ctx.status = 404;
    ctx.body = { error: 'Cluster not found' };
    return;
  }
  ctx.body = { cluster };
});

// Add a node
router.post('/clusters/:id/nodes', async (ctx) => {
  const { id } = ctx.params;
  const { nodeName } = ctx.request.body;
  const command = `sudo docker exec -it kubeasz /bin/bash -c "kubectl create node ${nodeName} --cluster=${id}"`;
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      ctx.status = 500;
      ctx.body = { error: stderr };
      return;
    }
    // Save the result to the database
    const newNode = new Node({ nodeName, clusterId: id, status: 'Created' });
    await newNode.save();
    ctx.status = 201;
    ctx.body = { message: stdout, node: newNode };
  });
});

// Delete a node
router.delete('/clusters/:id/nodes/:node_id', async (ctx) => {
  const { id, node_id } = ctx.params;
  const command = `sudo docker exec -it kubeasz /bin/bash -c "kubectl delete node ${node_id} --cluster=${id}"`;
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      ctx.status = 500;
      ctx.body = { error: stderr };
      return;
    }
    // Save the result to the database
    await Node.findByIdAndDelete(node_id);
    ctx.status = 200;
    ctx.body = { message: stdout };
  });
});

// Check node status
router.get('/clusters/:id/nodes', async (ctx) => {
  const { id } = ctx.params;
  const command = `sudo docker exec -it kubeasz /bin/bash -c "kubectl get nodes --cluster=${id}"`;
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      ctx.status = 500;
      ctx.body = { error: stderr };
      return;
    }
    // Save the result to the database
    const nodes = stdout.split('\n').map(line => {
      const [name, status] = line.split(/\s+/);
      return { name, status };
    });
    await Node.deleteMany({ clusterId: id });
    for (const node of nodes) {
      const newNode = new Node({ nodeName: node.name, clusterId: id, status: node.status });
      await newNode.save();
    }
    ctx.status = 200;
    ctx.body = { nodes };
  });
});

module.exports = router;