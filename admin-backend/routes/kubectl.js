const Router = require('koa-router');
const { exec } = require('child_process');
const CommandLog = require('../models/CommandLog');

const router = new Router();

// Execute kubectl command
router.post('/kubectl', async (ctx) => {
  const { command } = ctx.request.body;
  const userId = ctx.state.user.id;
  const clusterId = ctx.request.body.clusterId;

  const dockerCommand = `sudo docker exec -it kubeasz /bin/bash -c "${command}"`;

  exec(dockerCommand, async (error, stdout, stderr) => {
    const output = stdout || stderr;
    const status = error ? 'failed' : 'success';
    const commandLog = new CommandLog({ userId, clusterId, command, output, status });
    await commandLog.save();
    ctx.body = { output };
  });
});

// Get command logs
router.get('/kubectl/logs', async (ctx) => {
  const logs = await CommandLog.find({ userId: ctx.state.user.id });
  ctx.body = { logs };
});

module.exports = router;