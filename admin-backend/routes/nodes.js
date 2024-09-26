// routes/nodes.js
const Router = require('koa-router');
const Node = require('../models/Node');

const router = new Router();

router.post('/clusters/:id/nodes', async (ctx) => {
  const { nodeName } = ctx.request.body;
  const node = new Node({ nodeName, clusterId: ctx.params.id });
  await node.save();
  ctx.body = { node };
});

router.get('/clusters/:id/nodes', async (ctx) => {
  const nodes = await Node.find({ clusterId: ctx.params.id });
  ctx.body = { nodes };
});

router.delete('/clusters/:id/nodes/:nodeId', async (ctx) => {
  await Node.findByIdAndDelete(ctx.params.nodeId);
  ctx.status = 204;
});

module.exports = router;